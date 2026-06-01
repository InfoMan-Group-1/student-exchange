-- =====================================================
-- FILE: 001_seed_data.sql
-- Generated from Records.xlsx (official sheets only; Sheet8 not imported)
-- Natural keys: PR001, G001, APP001, EV001
-- Regenerate: npm run db:seed:generate
-- =====================================================

-- =====================================================
-- SEED: programs
-- =====================================================

INSERT INTO programs (
    program_id,
    program_name,
    college_name
) VALUES
('PR001', 'BS Information Technology', 'College of Computer and Information Sciences'),
('PR002', 'BS Computer Science', 'College of Computer and Information Sciences'),
('PR003', 'BS Mechanical Engineering', 'College of Engineering'),
('PR004', 'BS Civil Engineering', 'College of Engineering'),
('PR005', 'BS Accountancy', 'College of Accountancy and Finance'),
('PR006', 'BS Business Administration', 'College of Business Administration'),
('PR007', 'BS Psychology', 'College of Social Sciences and Development'),
('PR008', 'BS Electrical Engineering', 'College of Engineering'),
('PR009', 'BS Electronics Engineering', 'College of Engineering'),
('PR010', 'BS Hospitality Management', 'College of Business Administration');

-- =====================================================
-- SEED: guardians
-- =====================================================

INSERT INTO guardians (
    guardian_id,
    guardian_name,
    relation_to_student,
    guardian_address,
    guardian_contact_number,
    guardian_email
) VALUES
('G001', 'Maria Dela Cruz', 'Mother', 'Quezon City, Philippines', '09181234567', 'mariadelacruz@gmail.com'),
('G002', 'Maria Santos', 'Mother', 'Pasig City, Philippines', '09192345678', 'mariasantos@gmail.com'),
('G003', 'Chen Wei', 'Father', 'Quezon City, Philippines', '09214567890', 'chenwei@gmail.com'),
('G004', 'David Kim', 'Father', 'Makati City, Philippines', '09225678901', 'davidkim@gmail.com'),
('G005', 'Manuella Luz', 'Mother', 'Sta. Mesa, Manila, Philippines', '09171234567', 'maria.santos@gmail.com'),
('G006', 'Roberto Cruz', 'Father', 'Quezon City, Philippines', '09181234567', 'roberto.cruz@gmail.com'),
('G007', 'Ana Dela Cruz', 'Mother', 'Pasig City, Philippines', '09191234567', 'ana.delacruz@gmail.com'),
('G008', 'Eduardo Reyes', 'Father', 'Rizal, Philippines', '09201234567', 'eduardo.reyes@gmail.com'),
('G009', 'Sofia Garcia', 'Mother', 'Mandaluyong City, Philippines', '09211234567', 'sofia.garcia@gmail.com'),
('G010', 'Miguel Reyes', 'Father', 'Taguig City, Philippines', '09221234567', 'miguel.torres@gmail.com'),
('G011', 'Isabella Cruz', 'Mother', 'Caloocan City, Philippines', '09179876543', 'isabella.flores@gmail.com'),
('G012', 'Luis Mendoza', 'Mother', 'Marikina City, Philippines', '09189876543', 'luis.bautista@gmail.com'),
('G013', 'Carmen Torres', 'Father', 'San Juan City, Philippines', '09199876543', 'carmen.mendoza@gmail.com'),
('G014', 'Antonio Bautista', 'Father', 'Muntinlupa City, Philippines', '09209876543', 'antonio.rivera@gmail.com'),
('G015', 'Elena Santos', 'Mother', 'Parañaque City, Philippines', '09219876543', 'elena.gonzales@gmail.com'),
('G016', 'Rajesh Rahman', 'Father', 'Las Piñas City, Philippines', '09229876543', 'rajesh.rahman@gmail.com'),
('G017', 'Bao Pham Sr.', 'Mother', 'Valenzuela City, Philippines', '09171112222', 'bao.pham.sr..@gmail.com'),
('G018', 'Lingzhe Lin', 'Father', 'Navotas City, Philippines', '09181112222', 'lingzhe.lin@gmail.com'),
('G019', 'Jinwoo Park', 'Mother', 'Malabon City, Philippines', '09191112222', 'jinwoo.park@gmail.com'),
('G020', 'Nasha Patel', 'Father', 'Pasay City, Philippines', '09201112222', 'nasha.patel@gmail.com');

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
('2023-10001-MN-0', 'PR001', 'G001', 'Juan Dela Cruz', 21, 'Filipino', 'Male', '2003-03-15', 'juandelacruz@iskolarngbayan.pup.edu.ph', 'juandelacruz@gmail.com', 'Quezon City, Philippines', '09171234567', 'P1234567', '2021-01-10', '2031-01-10', '3.0', 1.75),
('2023-10002-MN-0', 'PR002', 'G002', 'Ana Santos', 20, 'Filipino', 'Female', '2004-07-22', 'anasantos@iskolarngbayan.pup.edu.ph', 'anasantos@yahoo.com', 'Pasig City, Philippines', '09182345678', 'P2345678', '2022-02-15', '2032-02-15', '2.0', 1.5),
('2023-10003-MN-0', 'PR003', 'G002', 'Mark Santos', 22, 'Filipino', 'Male', '2002-11-05', 'marksantos@iskolarngbayan.pup.edu.ph', 'marksantos@gmail.com', 'Pasig City, Philippines', '09193456789', 'P3456789', '2020-03-20', '2030-03-20', '3.0', 2.0),
('2023-10004-MN-0', 'PR004', 'G003', 'Li Wei', 23, 'Chinese', 'Male', '2001-01-12', 'liwei@iskolarngbayan.pup.edu.ph', 'liwei@hotmail.com', 'Quezon City, Philippines', '09204567890', 'P4567890', '2019-04-05', '2029-04-05', '4.0', 1.5),
('2023-10005-MN-0', 'PR005', 'G004', 'Sara Kim', 21, 'Korean', 'Female', '2003-09-30', 'sarakim@iskolarngbayan.pup.edu.ph', 'sarakim@gmail.com', 'Makati City, Philippines', '09215678901', 'P5678901', '2021-05-18', '2031-05-18', '3.0', 1.75),
('2024-03001-MN-0', 'PR001', 'G005', 'Juan Miguel Luz', 21, 'Filipino', 'Male', '2003-05-12', 'juan.santos@iskolarngbayan.pup.edu.ph', 'juan.alt@gmail.com', 'Manila, Philippines', '09732223846', 'P1234567A', '2023-01-15', '2033-01-15', '4.0', 1.25),
('2023-10230-MN-0', 'PR002', 'G006', 'Angela Mae Cruz', 20, 'Filipino', 'Female', '2004-02-18', 'angela.cruz@iskolarngbayan.pup.edu.ph', 'angela.alt@gmail.com', 'Quezon City, Philippines', '09765603617', 'P7654321B', '2022-11-10', '2032-11-10', '3.0', 1.75),
('2022-02910-MN-0', 'PR006', 'G007', 'Carlo Dela Cruz', 22, 'Filipino', 'Male', '2002-09-25', 'carlo.delacruz@iskolarngbayan.pup.edu.ph', 'carlo.alt@gmail.com', 'Pasig City, Philippines', '09579219939', 'P4567891C', '2021-08-01', '2031-08-01', '4.0', 1.5),
('2021-00420-MN-0', 'PR003', 'G008', 'Sophia Reyes', 21, 'Filipino', 'Female', '2003-12-03', 'sophia.reyes@iskolarngbayan.pup.edu.ph', 'sophia.alt@gmail.com', 'Rizal, Philippines', '09621972040', 'P9988776D', '2022-05-20', '2032-05-20', '4.0', 1.25),
('2024-87018-MN-0', 'PR006', 'G009', 'Liam Garcia', 21, 'Filipino', 'Male', '2005-06-05', 'liam.garcia@iskolarngbayan.pup.edu.ph', 'liam.garcia@gmail.com', 'Quezon City, Philippines', '09575993219', 'P4544682', '2022-09-12', '2032-09-12', '2.0', 2.0),
('2024-28530-MN-0', 'PR008', 'G010', 'Sofia Reyes', 22, 'Filipino', 'Female', '2004-03-27', 'sofia.reyes@iskolarngbayan.pup.edu.ph', 'sofia.reyes@gmail.com', 'Makati City, Philippines', '09615302903', 'P7149363', '2020-10-04', '2030-10-04', '2.0', 1.5),
('2024-76521-MN-0', 'PR005', 'G011', 'Ethan Cruz', 20, 'Filipino', 'Male', '2006-01-01', 'ethan.cruz@iskolarngbayan.pup.edu.ph', 'ethan.cruz@gmail.com', 'Manila, Philippines', '09491103709', 'P5895580', '2019-06-02', '2029-06-02', '4.0', 1.75),
('2024-35641-MN-0', 'PR008', 'G012', 'Chloe Mendoza', 23, 'Filipino', 'Female', '2003-12-17', 'chloe.mendoza@iskolarngbayan.pup.edu.ph', 'chloe.mendoza@gmail.com', 'Pasig City, Philippines', '09278725339', 'P2468574', '2018-01-28', '2028-01-28', '3.0', 1.5),
('2024-99443-MN-0', 'PR001', 'G013', 'Noah Torres', 23, 'Filipino', 'Male', '2003-10-23', 'noah.torres@iskolarngbayan.pup.edu.ph', 'noah.torres@gmail.com', 'Taguig City, Philippines', '09109676400', 'P4035174', '2023-07-27', '2033-07-27', '3.0', 2.0),
('2024-84706-MN-0', 'PR010', 'G014', 'Mia Bautista', 23, 'Filipino', 'Female', '2003-10-11', 'mia.bautista@iskolarngbayan.pup.edu.ph', 'mia.bautista@gmail.com', 'Cebu City, Philippines', '09479765681', 'P1178317', '2021-02-20', '2031-02-20', '3.0', 1.25),
('2024-65272-MN-0', 'PR009', 'G015', 'Lucas Santos', 19, 'Filipino', 'Male', '2007-02-10', 'lucas.santos@iskolarngbayan.pup.edu.ph', 'lucas.santos@gmail.com', 'Davao City, Philippines', '09911344815', 'P3485905', '2022-01-13', '2032-01-13', '2.0', 1.5),
('2024-81156-MN-0', 'PR008', 'G016', 'Aisha Rahman', 20, 'Malaysian', 'Female', '2006-11-27', 'aisha.rahman@iskolarngbayan.pup.edu.ph', 'aisha.rahman@gmail.com', 'Manila City, Philippines', '09336352673', 'P8651200', '2023-12-07', '2033-12-07', '2.0', 1.5),
('2024-34592-MN-0', 'PR006', 'G017', 'Bao Pham', 22, 'Vietnamese', 'Male', '2004-08-06', 'bao.pham@iskolarngbayan.pup.edu.ph', 'bao.pham@gmail.com', 'Pasig City, Philippines', '09155501228', 'P9457764', '2018-05-15', '2028-05-15', '3.0', 1.0),
('2024-91659-MN-0', 'PR001', 'G018', 'Mei Lin', 23, 'Taiwanese', 'Female', '2003-12-25', 'mei.lin@iskolarngbayan.pup.edu.ph', 'mei.lin@gmail.com', 'Taguig City, Philippines', '09955371424', 'P6408169', '2023-12-10', '2033-12-10', '4.0', 2.0),
('2024-12282-MN-0', 'PR002', 'G019', 'Seo-joon Park', 23, 'South Korean', 'Male', '2003-11-24', 'seo-joon.park@iskolarngbayan.pup.edu.ph', 'seo-joon.park@gmail.com', 'Cavite, Philippines', '09480096937', 'P4972564', '2023-07-09', '2033-07-09', '4.0', 1.75);

-- =====================================================
-- SEED: applications
-- =====================================================

INSERT INTO applications (
    application_id,
    student_number,
    semester_preference,
    duration_preference,
    is_complete,
    has_application_form,
    has_cv,
    has_tcg,
    has_recommendation_letter,
    has_essay,
    has_form_5,
    has_valid_passport,
    has_online_application_form,
    program_advisor,
    department_chair,
    college_secretary,
    dean_name
) VALUES
('APP001', '2023-10001-MN-0', 'Spring', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Reyes', 'Dr. Santos', 'Ms. Cruz', 'Dr. Villanueva'),
('APP002', '2023-10002-MN-0', 'Fall', '1 Year', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Engr. Dela Cruz', 'Engr. Ramos', 'Ms. Lopez', 'Dr. Garcia'),
('APP003', '2023-10003-MN-0', 'Fall', '1 Sem', FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Engr. Dela Cruz', 'Engr. Ramos', 'Ms. Lopez', 'Dr. Garcia'),
('APP004', '2023-10004-MN-0', 'Spring', '1 Year', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Lim', 'Dr. Tan', 'Ms. Ong', 'Dr. Sy'),
('APP005', '2023-10005-MN-0', 'Spring', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Flores', 'Dr. Mendoza', 'Ms. Reyes', 'Dr. Bautista'),
('APP006', '2024-03001-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Ramon Garcia', 'Dr. Elena Torres', 'Ms. Patricia Gomez', 'Dr. Antonio Reyes'),
('APP007', '2023-10230-MN-0', 'Spring', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Leo Mendoza', 'Dr. Karen Lim', 'Ms. Angelica Perez', 'Dr. Antonio Reyes'),
('APP008', '2022-02910-MN-0', 'Spring', '1 Year', FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, 'Dr. Miguel Ramos', 'Dr. Jose Velasco', 'Ms. Carla Santos', 'Dr. Benjamin Flores'),
('APP009', '2024-87018-MN-0', 'Fall', '1 Year', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Dr. Ana Santos', 'Dr. Teresa Reyes', 'Ms. Teresa Reyes', 'Dr. Teresa Mendoza'),
('APP010', '2024-28530-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Engr. Maria Santos', 'Engr. Miguel Santos', 'Mr. Miguel Mendoza', 'Dr. Luis Santos'),
('APP011', '2024-76521-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Dr. Luis Cruz', 'Dr. Carmen Garcia', 'Ms. Carlos Torres', 'Dr. Jose Bautista'),
('APP012', '2024-35641-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Engr. Teresa Garcia', 'Engr. Ana Garcia', 'Ms. Jose Garcia', 'Dr. Juan Bautista'),
('APP013', '2024-99443-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Dr. Luis Mendoza', 'Dr. Carlos Garcia', 'Ms. Carmen Torres', 'Dr. Juan Santos'),
('APP014', '2024-84706-MN-0', 'Fall', '1 Year', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Ana Bautista', 'Dr. Juan Bautista', 'Mr. Carmen Garcia', 'Dr. Jose Bautista'),
('APP015', '2024-65272-MN-0', 'Spring', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Engr. Carmen Cruz', 'Engr. Teresa Garcia', 'Mr. Teresa Bautista', 'Dr. Miguel Reyes'),
('APP016', '2024-81156-MN-0', 'Fall', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Engr. Amir Abdullah', 'Engr. Siti Yusof', 'Mr. Aminah Ibrahim', 'Dr. Hassan Abdullah'),
('APP017', '2024-34592-MN-0', 'Spring', '1 Year', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Hung Vu', 'Dr. Duc Pham', 'Mr. Duc Tran', 'Dr. Hoa Hoang'),
('APP018', '2024-91659-MN-0', 'Fall', '1 Year', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, TRUE, 'Dr. Yen Lin', 'Dr. Wei Wu', 'Mr. Wei Lin', 'Dr. Yen Wang'),
('APP019', '2024-12282-MN-0', 'Spring', '1 Sem', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dr. Do-yun Kang', 'Dr. Ha-eun Kang', 'Mr. Ji-ah Lee', 'Dr. Seo-joon Park');

-- =====================================================
-- SEED: university_choices
-- =====================================================

INSERT INTO university_choices (
    application_id,
    university_choice_rank,
    university_name
) VALUES
('APP001', 1, 'Oxford University'),
('APP001', 2, 'Massachusetts Institute of Technology'),
('APP001', 3, 'Nagoya University'),
('APP002', 1, 'Harvard University'),
('APP002', 2, 'Seoul National University'),
('APP002', 3, 'Yonsei University'),
('APP003', 1, 'Seoul National University'),
('APP003', 2, 'Massachusetts Institute of Technology'),
('APP003', 3, 'Oxford University'),
('APP004', 1, 'Harvard University'),
('APP004', 2, 'Tsinghua University'),
('APP004', 3, 'Fudan University'),
('APP005', 1, 'Kyoto University'),
('APP005', 2, 'University of Tokyo'),
('APP005', 3, 'Nagoya University'),
('APP006', 1, 'University of Tokyo'),
('APP006', 2, 'Seoul National University'),
('APP006', 3, 'National Taiwan University'),
('APP007', 1, 'National University of Singapore'),
('APP007', 2, 'Kyoto University'),
('APP007', 3, 'Chulalongkorn University'),
('APP008', 1, 'University of Melbourne'),
('APP008', 2, 'University of Auckland'),
('APP008', 3, 'Mahidol University'),
('APP009', 1, 'Harvard University'),
('APP009', 2, 'Massachusetts Institute of Technology'),
('APP009', 3, 'Oxford University'),
('APP010', 1, 'Seoul National University'),
('APP010', 2, 'Massachusetts Institute of Technology'),
('APP010', 3, 'Harvard University'),
('APP011', 1, 'University of Melbourne'),
('APP011', 2, 'University of Auckland'),
('APP011', 3, 'Seoul National University'),
('APP012', 1, 'Harvard University'),
('APP012', 2, 'University of Melbourne'),
('APP012', 3, 'National Taiwan University'),
('APP013', 1, 'Seoul National University'),
('APP013', 2, 'Yonsei University'),
('APP013', 3, 'Tsinghua University'),
('APP014', 1, 'Harvard University'),
('APP014', 2, 'University of Auckland'),
('APP014', 3, 'University of Melbourne'),
('APP015', 1, 'Harvard University'),
('APP015', 2, 'University of Tokyo'),
('APP015', 3, 'Kyoto University'),
('APP016', 1, 'Harvard University'),
('APP016', 2, 'Seoul National University'),
('APP016', 3, 'Yonsei University'),
('APP017', 1, 'University of Tokyo'),
('APP017', 2, 'Kyoto University'),
('APP017', 3, 'Nagoya University'),
('APP018', 1, 'Harvard University'),
('APP018', 2, 'Massachusetts Institute of Technology'),
('APP018', 3, 'University of Melbourne'),
('APP019', 1, 'Massachusetts Institute of Technology'),
('APP019', 2, 'Harvard University'),
('APP019', 3, 'Tsinghua University');

-- =====================================================
-- SEED: events
-- =====================================================

INSERT INTO events (
    event_id,
    event_name,
    host_country,
    event_date
) VALUES
('EV001', 'Japan Exchange 2024', 'Japan', '2024-03-22'),
('EV002', 'Summer Coding Bootcamp 2023', 'Singapore', '2023-08-16'),
('EV003', 'Robotics Workshop 2022', 'Korea', '2022-04-06'),
('EV004', 'Engineering Leadership Seminar 2022', 'Taiwan', '2022-12-12'),
('EV005', 'China Data Science Workshop 2022', 'China', '2022-04-12'),
('EV006', 'Business Leadership Seminar 2023', 'Spain', '2023-01-25'),
('EV007', 'ASEAN Youth Leadership Summit', 'Thailand', '2025-03-12'),
('EV008', 'International Innovation Conference', 'Japan', '2025-05-20'),
('EV009', 'Global Student Exchange Orientation', 'Philippines', '2025-01-15'),
('EV010', 'AI and Emerging Technologies Forum', 'Singapore', '2025-06-10'),
('EV011', 'Electrical Power Summit', 'Australia', '2025-02-14'),
('EV012', 'Accounting Summit', 'China', '2025-07-18'),
('EV013', 'Hospitality Expo', 'Switzerland', '2025-09-27');

-- =====================================================
-- SEED: events_attended
-- =====================================================

INSERT INTO events_attended (
    student_number,
    event_id
) VALUES
('2023-10001-MN-0', 'EV001'),
('2023-10001-MN-0', 'EV002'),
('2023-10002-MN-0', 'EV003'),
('2023-10002-MN-0', 'EV004'),
('2023-10003-MN-0', 'EV003'),
('2023-10003-MN-0', 'EV004'),
('2023-10004-MN-0', 'EV005'),
('2023-10005-MN-0', 'EV006'),
('2024-03001-MN-0', 'EV007'),
('2024-03001-MN-0', 'EV008'),
('2023-10230-MN-0', 'EV009'),
('2023-10230-MN-0', 'EV010'),
('2022-02910-MN-0', 'EV007'),
('2021-00420-MN-0', 'EV008'),
('2024-87018-MN-0', 'EV006'),
('2024-28530-MN-0', 'EV011'),
('2024-76521-MN-0', 'EV007'),
('2024-76521-MN-0', 'EV012'),
('2024-35641-MN-0', 'EV008'),
('2024-35641-MN-0', 'EV011'),
('2024-99443-MN-0', 'EV008'),
('2024-99443-MN-0', 'EV010'),
('2024-84706-MN-0', 'EV007'),
('2024-84706-MN-0', 'EV009'),
('2024-84706-MN-0', 'EV013'),
('2024-65272-MN-0', 'EV008'),
('2024-65272-MN-0', 'EV009'),
('2024-65272-MN-0', 'EV011'),
('2024-81156-MN-0', 'EV010'),
('2024-81156-MN-0', 'EV011'),
('2024-34592-MN-0', 'EV009'),
('2024-91659-MN-0', 'EV008'),
('2024-91659-MN-0', 'EV009'),
('2024-91659-MN-0', 'EV010'),
('2024-12282-MN-0', 'EV007'),
('2024-12282-MN-0', 'EV008'),
('2024-12282-MN-0', 'EV010');

-- =====================================================
-- SEED: student_languages
-- =====================================================

INSERT INTO student_languages (
    student_number,
    language_name,
    proficiency_level
) VALUES
('2021-00420-MN-0', 'English', 'B2'),
('2021-00420-MN-0', 'Filipino', 'C2'),
('2022-02910-MN-0', 'Filipino', 'C2'),
('2022-02910-MN-0', 'English', 'B2'),
('2023-10001-MN-0', 'Filipino', 'C2'),
('2023-10001-MN-0', 'English', 'C1'),
('2023-10002-MN-0', 'Filipino', 'C2'),
('2023-10002-MN-0', 'English', 'B2'),
('2023-10003-MN-0', 'Filipino', 'C2'),
('2023-10003-MN-0', 'English', 'B1'),
('2023-10003-MN-0', 'Korean', 'A2'),
('2023-10004-MN-0', 'Filipino', 'B2'),
('2023-10004-MN-0', 'Mandarin', 'C1'),
('2023-10004-MN-0', 'English', 'B2'),
('2023-10005-MN-0', 'Filipino', 'C1'),
('2023-10005-MN-0', 'Korean', 'C2'),
('2023-10005-MN-0', 'English', 'B2'),
('2023-10230-MN-0', 'English', 'B2'),
('2023-10230-MN-0', 'Filipino', 'C2'),
('2024-03001-MN-0', 'English', 'B2'),
('2024-03001-MN-0', 'Filipino', 'C2'),
('2024-12282-MN-0', 'Filipino', 'B1'),
('2024-12282-MN-0', 'English', 'B1'),
('2024-12282-MN-0', 'Korean', 'C2'),
('2024-28530-MN-0', 'Filipino', 'C2'),
('2024-28530-MN-0', 'English', 'B2'),
('2024-34592-MN-0', 'Filipino', 'B2'),
('2024-34592-MN-0', 'English', 'B1'),
('2024-34592-MN-0', 'Vietnamese', 'C2'),
('2024-35641-MN-0', 'Filipino', 'C2'),
('2024-35641-MN-0', 'English', 'B2'),
('2024-65272-MN-0', 'Filipino', 'C2'),
('2024-65272-MN-0', 'English', 'B1'),
('2024-76521-MN-0', 'Filipino', 'C2'),
('2024-76521-MN-0', 'English', 'B1'),
('2024-81156-MN-0', 'Filipino', 'C1'),
('2024-81156-MN-0', 'English', 'B2'),
('2024-81156-MN-0', 'Malay', 'C2'),
('2024-84706-MN-0', 'Filipino', 'C2'),
('2024-84706-MN-0', 'English', 'B2'),
('2024-87018-MN-0', 'Filipino', 'C2'),
('2024-87018-MN-0', 'English', 'B1'),
('2024-91659-MN-0', 'Filipino', 'B2'),
('2024-91659-MN-0', 'English', 'B2'),
('2024-91659-MN-0', 'Mandarin', 'C2'),
('2024-99443-MN-0', 'Filipino', 'C2'),
('2024-99443-MN-0', 'English', 'B1');
