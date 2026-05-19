-- =====================================================
-- FILE: seed_data.sql
-- DESCRIPTION:
-- Sample seed data for PUP Student Exchange System
-- Polytechnic University of the Philippines (PUP)
-- =====================================================

-- =====================================================
-- SEED: programs
-- =====================================================

INSERT INTO programs (
    program_name,
    college_name
) VALUES
('BS Information Technology', 'College of Computer and Information Sciences'),
('BS Computer Science', 'College of Computer and Information Sciences'),
('BS Business Administration', 'College of Business Administration'),
('BS Accountancy', 'College of Accountancy and Finance'),
('BS Mechanical Engineering', 'College of Engineering'),
('BS Civil Engineering', 'College of Engineering'),
('BS Psychology', 'College of Social Sciences and Development'),
('BA Communication Research', 'College of Communication');

-- =====================================================
-- SEED: guardians
-- =====================================================

INSERT INTO guardians (
    guardian_name,
    relationship_to_student,
    address,
    contact_number,
    email_address
) VALUES
(
    'Maria Santos',
    'Mother',
    'Sta. Mesa, Manila, Philippines',
    '09171234567',
    'maria.santos@gmail.com'
),
(
    'Roberto Cruz',
    'Father',
    'Quezon City, Philippines',
    '09181234567',
    'roberto.cruz@gmail.com'
),
(
    'Ana Dela Cruz',
    'Mother',
    'Pasig City, Philippines',
    '09191234567',
    'ana.delacruz@gmail.com'
),
(
    'Eduardo Reyes',
    'Father',
    'Makati City, Philippines',
    '09201234567',
    'eduardo.reyes@gmail.com'
);

-- =====================================================
-- SEED: students
-- =====================================================

INSERT INTO students (
    student_number,
    program_id,
    guardian_id,
    full_name,
    age,
    nationality,
    sex,
    birth_date,
    school_email,
    alternate_email,
    home_address,
    mobile_number,
    passport_number,
    passport_issue_date,
    passport_expiry_date,
    year_level,
    cumulative_gwa
) VALUES
(
    '2021-00001-MN-0',
    1,
    1,
    'Juan Miguel Santos',
    21,
    'Filipino',
    'Male',
    '2003-05-12',
    'juan.santos@iskolarngbayan.pup.edu.ph',
    'juan.alt@gmail.com',
    'Manila, Philippines',
    '09170000001',
    'P1234567A',
    '2023-01-15',
    '2033-01-15',
    '4th Year',
    1.25
),
(
    '2021-00002-MN-0',
    2,
    2,
    'Angela Mae Cruz',
    20,
    'Filipino',
    'Female',
    '2004-02-18',
    'angela.cruz@iskolarngbayan.pup.edu.ph',
    'angela.alt@gmail.com',
    'Quezon City, Philippines',
    '09170000002',
    'P7654321B',
    '2022-11-10',
    '2032-11-10',
    '3rd Year',
    1.18
),
(
    '2021-00003-MN-0',
    3,
    3,
    'Carlo Dela Cruz',
    22,
    'Filipino',
    'Male',
    '2002-09-25',
    'carlo.delacruz@iskolarngbayan.pup.edu.ph',
    'carlo.alt@gmail.com',
    'Pasig City, Philippines',
    '09170000003',
    'P4567891C',
    '2021-08-01',
    '2031-08-01',
    '4th Year',
    1.40
),
(
    '2021-00004-MN-0',
    5,
    4,
    'Sophia Reyes',
    21,
    'Filipino',
    'Female',
    '2003-12-03',
    'sophia.reyes@iskolarngbayan.pup.edu.ph',
    'sophia.alt@gmail.com',
    'Makati City, Philippines',
    '09170000004',
    'P9988776D',
    '2022-05-20',
    '2032-05-20',
    '4th Year',
    1.30
);

-- =====================================================
-- SEED: applications
-- =====================================================

INSERT INTO applications (
    student_number,
    semester_preference,
    duration_preference,
    has_application_form,
    has_cv,
    has_tor,
    has_recommendation_letter,
    has_essay,
    has_form_5,
    has_valid_passport,
    has_online_application_form,
    is_complete,
    program_advisor,
    department_chair,
    college_secretary,
    dean_name
) VALUES
(
    '2021-00001-MN-0',
    '1st Semester AY 2025-2026',
    '1 Semester',
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    'Dr. Ramon Garcia',
    'Dr. Elena Torres',
    'Ms. Patricia Gomez',
    'Dr. Antonio Reyes'
),
(
    '2021-00002-MN-0',
    '2nd Semester AY 2025-2026',
    '1 Semester',
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    'Dr. Leo Mendoza',
    'Dr. Karen Lim',
    'Ms. Angelica Perez',
    'Dr. Antonio Reyes'
),
(
    '2021-00003-MN-0',
    '1st Semester AY 2025-2026',
    '1 Year',
    TRUE,
    TRUE,
    FALSE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    'Dr. Miguel Ramos',
    'Dr. Jose Velasco',
    'Ms. Carla Santos',
    'Dr. Benjamin Flores'
);

-- =====================================================
-- SEED: university_choices
-- =====================================================

INSERT INTO university_choices (
    application_id,
    choice_rank,
    university_name
) VALUES
(1, 1, 'University of Tokyo'),
(1, 2, 'Seoul National University'),
(1, 3, 'National Taiwan University'),

(2, 1, 'National University of Singapore'),
(2, 2, 'Kyoto University'),
(2, 3, 'Chulalongkorn University'),

(3, 1, 'University of Melbourne'),
(3, 2, 'University of Auckland'),
(3, 3, 'Mahidol University');

-- =====================================================
-- SEED: events
-- =====================================================

INSERT INTO events (
    event_title,
    host_country,
    event_date
) VALUES
(
    'ASEAN Youth Leadership Summit',
    'Thailand',
    '2025-03-12'
),
(
    'International Innovation Conference',
    'Japan',
    '2025-05-20'
),
(
    'Global Student Exchange Orientation',
    'Philippines',
    '2025-01-15'
),
(
    'AI and Emerging Technologies Forum',
    'Singapore',
    '2025-06-10'
);

-- =====================================================
-- SEED: events_attended
-- =====================================================

INSERT INTO events_attended (
    student_number,
    event_id
) VALUES
('2021-00001-MN-0', 1),
('2021-00001-MN-0', 2),
('2021-00002-MN-0', 3),
('2021-00002-MN-0', 4),
('2021-00003-MN-0', 1),
('2021-00004-MN-0', 2);

-- =====================================================
-- SEED: student_languages
-- =====================================================

INSERT INTO student_languages (
    student_number,
    language_name,
    proficiency_level
) VALUES
(
    '2021-00001-MN-0',
    'English',
    'Advanced'
),
(
    '2021-00001-MN-0',
    'Filipino',
    'Native'
),
(
    '2021-00002-MN-0',
    'English',
    'Advanced'
),
(
    '2021-00002-MN-0',
    'Korean',
    'Beginner'
),
(
    '2021-00003-MN-0',
    'Japanese',
    'Intermediate'
),
(
    '2021-00004-MN-0',
    'English',
    'Advanced'
),
(
    '2021-00004-MN-0',
    'Filipino',
    'Native'
);