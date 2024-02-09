CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "email" varchar,
  "img" varchar,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "status" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "messages" (
  "id" bigserial PRIMARY KEY,
  "send_from" varchar NOT NULL,
  "send_to" varchar NOT NULL,
  "message" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);