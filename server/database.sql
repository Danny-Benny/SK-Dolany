CREATE DATABASE skdolany;

CREATE TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE roster (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    player_position VARCHAR(255),
    jersey_number INT,
    player_photo_URL TEXT
);

CREATE TABLE discussion (
    id SERIAL PRIMARY KEY,
    discussion_title VARCHAR(255) NOT NULL,
    created_date DATE,
    author_id INT REFERENCES users(id)
);

CREATE TABLE discussion_posts (
    id SERIAL PRIMARY KEY,
    post_text TEXT NOT NULL,
    created_date TIMESTAMP,
    author_id INT REFERENCES users(id),
    discussion_id INT REFERENCES discussion(id)
);
