CREATE DATABASE skdolany;

CREATE TABLE news(
    news_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);