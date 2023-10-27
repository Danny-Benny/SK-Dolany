-- we don't know how to generate root <with-no-name> (class Root) :(
comment on database postgres is 'default administrative connection database';

create sequence news_news_id_seq as integer;

alter sequence news_news_id_seq owner to postgres;

create sequence roster_player_id_seq as integer;

alter sequence roster_player_id_seq owner to postgres;

create table users (
    id serial primary key,
    username varchar(255) not null unique,
    password text not null,
    name varchar(255),
    surname varchar(255),
    email varchar(255),
    role varchar(255)
);

alter table
    users owner to postgres;

create table news (
    id integer default nextval('news_news_id_seq' :: regclass) not null primary key,
    title varchar(255) not null,
    content text not null,
    created_at timestamp default now(),
    author_id integer constraint fk_author references users
);

alter table
    news owner to postgres;

alter sequence news_news_id_seq owned by news.id;

create table roster (
    id integer default nextval('roster_player_id_seq' :: regclass) not null primary key,
    player_name varchar(255) not null,
    player_position varchar(255),
    jersey_number integer,
    player_photo_url text
);

alter table
    roster owner to postgres;

alter sequence roster_player_id_seq owned by roster.id;

create table discussion (
    id serial primary key,
    discussion_title varchar(255) not null,
    created_date timestamp default now(),
    author_id integer references users
);

alter table
    discussion owner to postgres;

create table discussion_posts (
    id serial primary key,
    post_text text not null,
    created_date timestamp,
    author_id integer not null references users,
    discussion_id integer not null references discussion
);

alter table
    discussion_posts owner to postgres;

create table season_links (
    id serial primary key,
    season_name varchar(255) not null,
    link_url text
);

alter table
    season_links owner to postgres;

create table sponsors (
    id serial primary key,
    company_logo_url text
);

alter table
    sponsors owner to postgres;

create table photos (
    id serial primary key,
    name varchar(255),
    image_url text,
    description text,
    author_id integer references users
);

alter table
    photos owner to postgres;