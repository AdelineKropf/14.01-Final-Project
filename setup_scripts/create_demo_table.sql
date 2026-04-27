-- CREATE DATABASE IF NOT EXISTS cs208demo;

-- USE cs208demo;

-- CREATE TABLE IF NOT EXISTS comments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     comment VARCHAR(255) NOT NULL,
--     completed BOOLEAN DEFAULT FALSE
-- );

-- ALTER TABLE comments
-- ADD COLUMN created_at DATETIME NOT NULL DEFAULT NOW();

-- ALTER TABLE comments
-- DROP COLUMN completed;

-- -- Maybe delete later
-- DELETE FROM comments;
-- ALTER TABLE comments AUTO_INCREMENT = 1;

CREATE DATABASE IF NOT EXISTS cs208demo;

USE cs208demo;

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

-- Add created_at only if it does NOT already exist
ALTER TABLE comments
ADD COLUMN IF NOT EXISTS created_at DATETIME NOT NULL DEFAULT NOW();

-- Drop completed only if it exists
ALTER TABLE comments
DROP COLUMN IF EXISTS completed;

-- Optional: clear all comments
DELETE FROM comments;

-- Optional: reset auto-increment counter
ALTER TABLE comments AUTO_INCREMENT = 1;
