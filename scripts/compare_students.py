#!/usr/bin/env python3
"""Compare students between Records.xlsx students sheet, Sheet8, and seed."""

import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
M = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def col_to_idx(col: str) -> int:
    n = 0
    for c in col:
        n = n * 26 + (ord(c) - 64)
    return n - 1


def load_shared_strings(z: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    return ["".join(t.itertext()) for t in root.findall(".//m:si", M)]


def load_workbook_sheets(z: zipfile.ZipFile) -> dict[str, str]:
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    relmap = {r.attrib["Id"]: r.attrib["Target"] for r in rels}
    sheets = {}
    for sh in wb.findall(".//m:sheet", M):
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
    for row in root.findall(".//m:sheetData/m:row", M):
        cells = {}
        for c in row.findall("m:c", M):
            ref = c.attrib.get("r", "")
            m = re.match(r"([A-Z]+)", ref)
            if not m:
                continue
            idx = col_to_idx(m.group(1))
            t = c.attrib.get("t")
            v = c.find("m:v", M)
            val = "" if v is None else (v.text or "")
            if t == "s" and val:
                val = strings[int(val)]
            cells[idx] = str(val).strip()
        if cells:
            max_i = max(cells)
            rows.append([cells.get(i, "") for i in range(max_i + 1)])
    return rows


def parse_seed_students(sql: str) -> list[tuple[str, str, str]]:
    part = sql.split("SEED: applications", 1)[0]
    part = part.split("SEED: students", 1)[-1]
    out = []
    for m in re.finditer(
        r"\('(\d{4}-[^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'", part
    ):
        out.append((m.group(1), m.group(2), m.group(3), m.group(4)))
    return out


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    with zipfile.ZipFile(root / "Records.xlsx") as z:
        strings = load_shared_strings(z)
        sheets = load_workbook_sheets(z)
        main_rows = parse_sheet(z, sheets["students"], strings)
        sheet8_rows = parse_sheet(z, sheets.get("Sheet8", ""), strings) if "Sheet8" in sheets else []

    main_students = [r[0] for r in main_rows[1:] if r and r[0]]
    sheet8_students = []
    for r in sheet8_rows:
        if r and r[0] and re.match(r"\d{4}-", r[0]):
            sheet8_students.append(r[0])

    sql = (root / "db/seeds/001_seed_data.sql").read_text(encoding="utf-8")
    seed_list = parse_seed_students(sql)
    seed_numbers = {s[0] for s in seed_list}

    main_set = set(main_students)
    only_seed = sorted(seed_numbers - main_set)
    only_main = sorted(main_set - seed_numbers)

    print(f"students sheet:     {len(main_students)} rows")
    print(f"Sheet8 (partial):   {len(sheet8_students)} student numbers")
    print(f"seed / database:    {len(seed_numbers)} students")
    print()
    print(f"In DB but NOT on students sheet ({len(only_seed)}):")
    for sn in only_seed:
        row = next((x for x in seed_list if x[0] == sn), None)
        src = "Sheet8" if sn in sheet8_students else "unknown"
        if row:
            print(f"  {sn}  program={row[1]}  guardian={row[2]}  name={row[3]}  [{src}]")
        else:
            print(f"  {sn}  [{src}]")

    if only_main:
        print(f"\nOn students sheet but NOT in seed ({len(only_main)}):")
        for sn in only_main:
            print(f"  {sn}")


if __name__ == "__main__":
    main()
