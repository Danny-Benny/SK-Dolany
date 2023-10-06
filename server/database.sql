CREATE DATABASE skdolany;

CREATE TABLE news(
    news_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE roster (
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    player_position VARCHAR(255),
    jersey_number INT,
    player_photo_URL TEXT
);