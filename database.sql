DROP DATABASE IF EXISTS project2;
DROP USER IF EXISTS project2_user@localhost;
CREATE DATABASE project2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER project2_user@localhost IDENTIFIED BY '3edc4rfv#EDC$RFV';
GRANT ALL PRIVILEGES ON project2.* TO project2_user@localhost;
