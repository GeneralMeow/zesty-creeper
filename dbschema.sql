DROP DATABASE IF EXISTS todolist;
CREATE DATABASE todolist;

\c todolist;

CREATE TABLE "lists" (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE "tasks" (
  id SERIAL PRIMARY KEY,
  list_id SERIAL REFERENCES lists,
  description VARCHAR,
  completed VARCHAR,
  complete_date date
);

INSERT INTO "lists" (name)
  VALUES ('tuesday to do');

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE "tasks" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");
