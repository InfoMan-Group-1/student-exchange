#!/usr/bin/env python3
"""Compare student_languages between Records.xlsx, seed SQL, and optional user list."""

import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def col_to_idx(col: str) -> int:
    n = 0
    for c in col:
        n = n * 26 + (ord(c) - 64)
    return n - 1


def load_shared_strings(z: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    return ["".join(t.itertext()) for t in root.findall(".//m:si", NS)]


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
            if t == "s" and val:
                val = strings[int(val)]
            cells[idx] = str(val).strip()
        if cells:
            max_i = max(cells)
            rows.append([cells.get(i, "") for i in range(max_i + 1)])
    return rows


def parse_seed_languages(sql: str) -> set[tuple[str, str, str]]:
    part = sql.split("SEED: student_languages", 1)[-1]
    out = set()
    for m in re.finditer(r"\('([^']+)',\s*'([^']+)',\s*'([^']+)'\)", part):
        out.add(m.groups())
    return out


def parse_seed_students(sql: str) -> set[str]:
    part = sql.split("SEED: applications", 1)[0]
    part = part.split("SEED: students", 1)[-1]
    return {m.group(1) for m in re.finditer(r"\('(\d{4}-[^']+)'", part)}


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    xlsx_path = root / "Records.xlsx"
    seed_path = root / "db" / "seeds" / "001_seed_data.sql"

    with zipfile.ZipFile(xlsx_path) as z:
        strings = load_shared_strings(z)
        sheets = load_workbook_sheets(z)
        raw = parse_sheet(z, sheets["student_languages"], strings)

    xlsx_rows = set()
    for r in raw[1:]:
        if len(r) >= 3 and r[0]:
            xlsx_rows.add((r[0], r[1], r[2]))

    sql = seed_path.read_text(encoding="utf-8")
    seed_rows = parse_seed_languages(sql)
    seed_students = parse_seed_students(sql)

    missing = sorted(xlsx_rows - seed_rows)
    extra = sorted(seed_rows - xlsx_rows)

    print(f"Excel rows: {len(xlsx_rows)}")
    print(f"Seed rows:  {len(seed_rows)}")
    print(f"Missing from seed ({len(missing)}):")
    for sn, lang, prof in missing:
        print(f"  {sn}\t{lang}\t{prof}\t(student in seed: {sn in seed_students})")

    if extra:
        print(f"\nIn seed but not Excel ({len(extra)}):")
        for row in extra:
            print(f"  {row[0]}\t{row[1]}\t{row[2]}")

    students_with_langs_seed = {r[0] for r in seed_rows}
    students_with_langs_xlsx = {r[0] for r in xlsx_rows}
    students_no_langs = sorted(seed_students - students_with_langs_seed)
    if students_no_langs:
        print(f"\nStudents in seed with NO language rows ({len(students_no_langs)}):")
        for sn in students_no_langs:
            print(f"  {sn}")


if __name__ == "__main__":
    main()
