DROP DATABASE IF EXISTS todolist;
CREATE DATABASE todolist;

\c todolist;

CREATE TABLE "lists" (
  "ID" SERIAL PRIMARY KEY,
  "name" VARCHAR
);

CREATE TABLE "tasks" (
  "ID" SERIAL PRIMARY KEY,
  "text" VARCHAR,
  "completed" VARCHAR,
  "complete_date" date
);

INSERT INTO "lists" (name)
  VALUES ('tuesday to do');

-- ---
-- Foreign Keys
-- ---

ALTER TABLE "lists" ADD FOREIGN KEY ("ID") REFERENCES "lists" ("ID");
