-- Setup database only if not created
CREATE DATABASE IF NOT EXISTS cl_database;

-- Select the database if more than one 
USE cl_database;

-- Staffs Table creation 
CREATE TABLE staffs (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(128),
  password varchar(256),
  name varchar(128),
  department varchar(128),
  staff_id_number int,
  is_verified tinyint default 0,
  is_active tinyint default 1,
  updated_at timestamp default null,
  created_at timestamp default now(),

  PRIMARY KEY (id) 
) 
ENGINE = InnoDB;

-- Staff addresses Table creation 
CREATE TABLE staff_addresses (
  id int NOT NULL AUTO_INCREMENT,
  staff_id int,
  line1 varchar(256), 
  line2 varchar(256),
  city varchar(64),
  state varchar(64),
  postal_code varchar(64),
  country varchar(64),

  created_at timestamp default now(),
  updated_at timestamp default null,

  PRIMARY KEY (id),
  FOREIGN KEY (staff_id) REFERENCES staffs(id)
) 
ENGINE = InnoDB;

-- Cl infomrmations table creation 
CREATE TABLE cl_informations (
  id int NOT NULL AUTO_INCREMENT,
  staff_id int,
  staff_address_id int,
  uis varchar(64),
  name varchar(64),
  designation int,
  nature_of_leave tinyint default 0,
  availed_days tinyint default 1,
  period_from timestamp default null,
  period_to timestamp default null,
  no_of_days int default 1,
  phone_number varchar(64),
  country_code varchar(4),
  department_name varchar(64),
  semester_type varchar(16),
  purpose_description varchar(256), 
  is_recomended tinyint default 0,
  updated_at timestamp default null,
  created_at timestamp default now(),

  PRIMARY KEY (id),
  FOREIGN KEY (staff_id) REFERENCES staffs(id),
  FOREIGN KEY (staff_address_id) REFERENCES staff_addresses(id)
) 
ENGINE = InnoDB;

-- Arrangments Table creation 
CREATE TABLE arrangments (
  id int NOT NULL AUTO_INCREMENT,
  cl_id int,
  date_hour datetime, 
  class varchar(256),
  subject varchar(256),
  year int,
  
  created_at timestamp default now(),

  PRIMARY KEY (id),
  FOREIGN KEY (cl_id) REFERENCES cl_informations(id)
) 
ENGINE = InnoDB;


