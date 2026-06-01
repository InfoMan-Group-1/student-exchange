-- =====================================================
-- Reporting queries (aligned with current schema)
-- Tables: programs, guardians, students, applications,
--         university_choices, student_languages, events, events_attended
-- Natural keys: program_id, guardian_id, application_id, event_id
-- =====================================================

-- 1. Overall applicant count, average age, and highest / lowest GWA.
-- On the PUP scale, lower cumulative_gwa is better (1.0 = excellent).
SELECT
    COUNT(s.student_number) AS total_applicants,
    AVG(s.age) AS average_applicant_age,
    MIN(s.cumulative_gwa) AS highest_academic_gwa,
    MAX(s.cumulative_gwa) AS lowest_academic_gwa
FROM students AS s;

-- 2. Student number, name, and first university choice for CCIS students
--    with GWA at or below 1.50 (better standing on the PUP scale).
SELECT
    s.student_number,
    s.full_name,
    uc.university_name
FROM students AS s
INNER JOIN programs AS p
    ON s.program_id = p.program_id
INNER JOIN applications AS a
    ON s.student_number = a.student_number
INNER JOIN university_choices AS uc
    ON a.application_id = uc.application_id
WHERE uc.university_choice_rank = 1
  AND p.college_name = 'College of Computer and Information Sciences'
  AND s.cumulative_gwa <= 1.50;

-- 3. Student number, name, language, proficiency, and first university choice
--    for students with B1 or higher (CEFR: excludes A1 and A2).
SELECT
    s.student_number,
    s.full_name,
    sl.language_name,
    sl.proficiency_level,
    uc.university_name
FROM students AS s
INNER JOIN student_languages AS sl
    ON s.student_number = sl.student_number
INNER JOIN applications AS a
    ON s.student_number = a.student_number
INNER JOIN university_choices AS uc
    ON a.application_id = uc.application_id
WHERE sl.proficiency_level NOT IN ('A1', 'A2')
  AND uc.university_choice_rank = 1;

-- 4. Student and guardian details where guardian is Mother and name starts with M.
SELECT
    s.student_number,
    s.full_name,
    g.guardian_name,
    g.relation_to_student,
    g.guardian_contact_number
FROM students AS s
INNER JOIN guardians AS g
    ON s.guardian_id = g.guardian_id
WHERE g.relation_to_student = 'Mother'
  AND g.guardian_name LIKE 'M%';

-- 5. Male Filipino students aged 20+ with program, passport, and languages listed.
SELECT
    s.student_number,
    s.full_name,
    s.age,
    s.nationality,
    s.sex,
    p.program_name,
    s.passport_number,
    GROUP_CONCAT(sl.language_name ORDER BY sl.language_name SEPARATOR ', ') AS languages
FROM students AS s
INNER JOIN programs AS p
    ON s.program_id = p.program_id
INNER JOIN student_languages AS sl
    ON s.student_number = sl.student_number
WHERE s.age >= 20
  AND s.nationality = 'Filipino'
  AND s.sex = 'Male'
GROUP BY
    s.student_number,
    s.full_name,
    s.age,
    s.nationality,
    s.sex,
    p.program_name,
    s.passport_number;
