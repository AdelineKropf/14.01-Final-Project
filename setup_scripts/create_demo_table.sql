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
