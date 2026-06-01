#!/usr/bin/env python3
"""Generate db/seeds/001_seed_data.sql from Records.xlsx (stdlib only)."""

import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from pathlib import Path

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

# Sheet name -> worksheet file (resolved from workbook)
SHEET_ORDER = [
    ("programs", None),
    ("guardians", None),
    ("students", None),
    ("applications", None),
    ("university_choices", None),
    ("events", None),
    ("events_attended", None),
    ("student_languages", None),
]

STUDENTS_COLUMNS = [
    "student_number",
    "program_id",
    "guardian_id",
    "full_name",
    "age",
    "nationality",
    "sex",
    "birth_date",
    "school_email",
    "alternate_email",
    "home_address",
    "mobile_number",
    "passport_number",
    "passport_issue_date",
    "passport_expiry_date",
    "year_level",
    "cumulative_gwa",
]

DATE_COLUMNS = {
    "students": {"birth_date", "passport_issue_date", "passport_expiry_date"},
    "events": {"event_date"},
}

BOOLEAN_COLUMNS = {
    "applications": {
        "is_complete",
        "has_application_form",
        "has_cv",
        "has_tcg",
        "has_recommendation_letter",
        "has_essay",
        "has_form_5",
        "has_valid_passport",
        "has_online_application_form",
    }
}

PHONE_COLUMNS = {
    "students": {"mobile_number"},
    "guardians": {"guardian_contact_number"},
}

INT_COLUMNS = {
    "students": {"age"},
    "university_choices": {"university_choice_rank"},
}

DECIMAL_COLUMNS = {
    "students": {"cumulative_gwa"},
}


def col_to_idx(col: str) -> int:
    n = 0
    for c in col:
        n = n * 26 + (ord(c) - 64)
    return n - 1


def excel_serial_to_date(serial: float) -> str:
    base = datetime(1899, 12, 30)
    return (base + timedelta(days=float(serial))).strftime("%Y-%m-%d")


def normalize_phone(value: str) -> str:
    if not value or not str(value).strip():
        return ""
    s = str(value).strip()
    try:
        if "e" in s.lower() or "E" in s:
            num = int(float(s))
            s = str(num)
    except ValueError:
        pass
    digits = re.sub(r"\D", "", s)
    if len(digits) == 10 and digits.startswith("9"):
        return "0" + digits
    if len(digits) == 12 and digits.startswith("63"):
        return "0" + digits[2:]
    return digits or s


def sql_escape(value) -> str:
    if value is None:
        return "NULL"
    s = str(value).strip()
    if s == "":
        return "NULL"
    return "'" + s.replace("\\", "\\\\").replace("'", "''") + "'"


def load_workbook_sheets(z: zipfile.ZipFile) -> dict[str, str]:
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    relmap = {r.attrib["Id"]: r.attrib["Target"] for r in rels}
    sheets = {}
    for sh in wb.findall(".//m:sheet", NS):
        name = sh.attrib["name"]
        rid = sh.attrib[f"{{{REL_NS}}}id"]
        target = relmap[rid].replace("../", "")
        if not target.startswith("xl/"):
            target = "xl/" + target.lstrip("/")
        sheets[name] = target
    return sheets


def load_shared_strings(z: zipfile.ZipFile) -> list[str]:
    try:
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    return ["".join(t.itertext()) for t in root.findall(".//m:si", NS)]


def parse_sheet(z: zipfile.ZipFile, sheet_path: str, strings: list[str]) -> list[list[str]]:
    root = ET.fromstring(z.read(sheet_path))
    rows = []
    for row in root.findall(".//m:sheetData/m:row", NS):
        cells = {}
        for c in row.findall("m:c", NS):
            ref = c.attrib.get("r", "")
            m = re.match(r"([A-Z]+)", ref)
            if not m:
                continue
            idx = col_to_idx(m.group(1))
            t = c.attrib.get("t")
            v = c.find("m:v", NS)
            val = "" if v is None else (v.text or "")
            if t == "s" and val != "":
                val = strings[int(val)]
            cells[idx] = val
        if cells:
            max_i = max(cells)
            rows.append([cells.get(i, "") for i in range(max_i + 1)])
    return rows


def rows_to_dicts(header: list[str], data_rows: list[list[str]]) -> list[dict]:
    result = []
    for row in data_rows:
        if not any(str(x).strip() for x in row):
            continue
        d = {}
        for i, col in enumerate(header):
            if not col:
                continue
            d[col] = row[i] if i < len(row) else ""
        if any(str(v).strip() for v in d.values()):
            result.append(d)
    return result


def transform_value(sheet: str, col: str, value: str) -> str | None:
    if value is None or str(value).strip() == "":
        return None

    s = str(value).strip()

    if col in DATE_COLUMNS.get(sheet, set()):
        try:
            f = float(s)
            if f > 1000:
                return excel_serial_to_date(f)
        except ValueError:
            pass
        return s

    if col in BOOLEAN_COLUMNS.get(sheet, set()):
        try:
            return "TRUE" if float(s) >= 0.5 else "FALSE"
        except ValueError:
            low = s.lower()
            if low in ("true", "yes", "1"):
                return "TRUE"
            if low in ("false", "no", "0"):
                return "FALSE"
        return "FALSE"

    if col in PHONE_COLUMNS.get(sheet, set()):
        p = normalize_phone(s)
        return p if p else None

    if col in INT_COLUMNS.get(sheet, set()):
        try:
            return str(int(float(s)))
        except ValueError:
            return s

    if col in DECIMAL_COLUMNS.get(sheet, set()):
        try:
            return str(round(float(s), 2))
        except ValueError:
            return s

    return s


def build_insert(table: str, columns: list[str], rows: list[dict]) -> str:
    if not rows:
        return ""

    lines = [
        f"-- =====================================================",
        f"-- SEED: {table}",
        f"-- =====================================================",
        "",
        f"INSERT INTO {table} (",
        "    " + ",\n    ".join(columns),
        ") VALUES",
    ]

    value_lines = []
    for row in rows:
        vals = []
        for col in columns:
            raw = row.get(col, "")
            transformed = transform_value(table, col, raw)
            if transformed in (None, ""):
                vals.append("NULL")
            elif col in BOOLEAN_COLUMNS.get(table, set()):
                vals.append(transformed)
            elif col in INT_COLUMNS.get(table, set()) or col in DECIMAL_COLUMNS.get(
                table, set()
            ):
                vals.append(transformed if transformed != "NULL" else "NULL")
            else:
                vals.append(sql_escape(transformed))
        value_lines.append("(" + ", ".join(vals) + ")")

    lines.append(",\n".join(value_lines) + ";")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    xlsx = Path(sys.argv[1] if len(sys.argv) > 1 else "Records.xlsx")
    out = Path(
        sys.argv[2] if len(sys.argv) > 2 else "db/seeds/001_seed_data.sql"
    )

    with zipfile.ZipFile(xlsx) as z:
        strings = load_shared_strings(z)
        sheet_paths = load_workbook_sheets(z)

        def get_rows(name: str) -> tuple[list[str], list[dict]]:
            path = sheet_paths.get(name)
            if not path:
                return [], []
            raw = parse_sheet(z, path, strings)
            if not raw:
                return [], []
            header = [h.strip() for h in raw[0] if h]
            return header, rows_to_dicts(header, raw[1:])

        programs_h, programs = get_rows("programs")
        guardians_h, guardians = get_rows("guardians")
        students_h, students = get_rows("students")
        applications_h, applications = get_rows("applications")
        uc_h, university_choices = get_rows("university_choices")
        events_h, events = get_rows("events")
        ea_h, events_attended = get_rows("events_attended")
        sl_h, student_languages = get_rows("student_languages")

        program_ids = {r["program_id"] for r in programs if r.get("program_id")}
        guardian_ids = {r["guardian_id"] for r in guardians if r.get("guardian_id")}
        student_numbers = {r["student_number"] for r in students if r.get("student_number")}
        event_ids = {r["event_id"] for r in events if r.get("event_id")}

        # Only official workbook tabs (students sheet). Sheet8 is ignored.

        filtered_apps = []
        for row in applications:
            sn = row.get("student_number", "").strip()
            if sn not in student_numbers:
                print(
                    f"Warning: skipping applications orphan student_number={sn} "
                    f"(application_id={row.get('application_id', '')})"
                )
                continue
            filtered_apps.append(row)
        applications = filtered_apps
        application_ids = {
            r["application_id"] for r in applications if r.get("application_id")
        }

        filtered_sl = []
        for row in student_languages:
            sn = row.get("student_number", "").strip()
            if sn not in student_numbers:
                print(f"Warning: skipping student_languages orphan student_number={sn}")
                continue
            filtered_sl.append(row)
        student_languages = filtered_sl

        filtered_ea = []
        for row in events_attended:
            sn = row.get("student_number", "").strip()
            eid = row.get("event_id", "").strip()
            if sn not in student_numbers:
                print(f"Warning: skipping events_attended orphan student_number={sn}")
                continue
            if eid not in event_ids:
                print(f"Warning: skipping events_attended orphan event_id={eid}")
                continue
            filtered_ea.append(row)
        events_attended = filtered_ea

        filtered_uc = []
        for row in university_choices:
            aid = row.get("application_id", "").strip()
            if aid not in application_ids:
                print(f"Warning: skipping university_choices orphan application_id={aid}")
                continue
            filtered_uc.append(row)
        university_choices = filtered_uc

    header_comment = """-- =====================================================
-- FILE: 001_seed_data.sql
-- Generated from Records.xlsx (official sheets only; Sheet8 not imported)
-- Natural keys: PR001, G001, APP001, EV001
-- Regenerate: npm run db:seed:generate
-- =====================================================

"""

    sections = [
        build_insert("programs", programs_h, programs),
        build_insert("guardians", guardians_h, guardians),
        build_insert("students", students_h or STUDENTS_COLUMNS, students),
        build_insert("applications", applications_h, applications),
        build_insert("university_choices", uc_h, university_choices),
        build_insert("events", events_h, events),
        build_insert("events_attended", ea_h, events_attended),
        build_insert("student_languages", sl_h, student_languages),
    ]

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(header_comment + "\n".join(s for s in sections if s), encoding="utf-8")
    print(f"programs: {len(programs)}, guardians: {len(guardians)}, students: {len(students)}")
    print(f"applications: {len(applications)}, university_choices: {len(university_choices)}")
    print(f"events: {len(events)}, events_attended: {len(events_attended)}")
    print(f"student_languages: {len(student_languages)}")


if __name__ == "__main__":
    main()
