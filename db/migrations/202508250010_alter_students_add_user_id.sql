-- migrate:up

ALTER TABLE students
ADD COLUMN user_id INT NULL;

ALTER TABLE students
ADD CONSTRAINT fk_students_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE SET NULL;

CREATE INDEX idx_students_user_id ON students(user_id);

-- migrate:down

ALTER TABLE students DROP FOREIGN KEY fk_students_users;
ALTER TABLE students DROP INDEX idx_students_user_id;
ALTER TABLE students DROP COLUMN user_id;
