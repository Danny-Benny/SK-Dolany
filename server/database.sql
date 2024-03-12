create sequence news_news_id_seq
    as integer;

create sequence roster_player_id_seq
    as integer;

create table if not exists users
(
    id          serial
        primary key,
    username    varchar(255) not null
        unique,
    password    text         not null,
    name        varchar(255),
    surname     varchar(255),
    email       varchar(255),
    role        varchar(255),
    reset_token varchar(255)
);

create table if not exists news
(
    id         integer   default nextval('news_news_id_seq'::regclass) not null
        primary key,
    title      varchar(255)                                            not null,
    content    text                                                    not null,
    created_at timestamp default now(),
    author_id  integer
        constraint fk_author
            references users
);

alter sequence news_news_id_seq owned by news.id;

create table if not exists roster
(
    id               integer default nextval('roster_player_id_seq'::regclass) not null
        primary key,
    player_name      varchar(255)                                              not null,
    player_position  varchar(255),
    jersey_number    integer,
    player_photo_url text
);

alter sequence roster_player_id_seq owned by roster.id;

create table if not exists season_links
(
    id          serial
        primary key,
    season_name varchar(255) not null,
    link_url    text
);

create table if not exists sponsors
(
    id               serial
        primary key,
    company_logo_url text
);

create table if not exists photos
(
    id          serial
        primary key,
    name        varchar(255),
    image_url   text,
    description text,
    author_id   integer
        references users
);

create table if not exists groups
(
    group_id   serial
        primary key,
    group_name varchar(255) not null
);

create table if not exists discussions
(
    discussion_id serial
        primary key,
    author_id     integer      not null,
    topic         varchar(255) not null,
    role          varchar
);

create table if not exists discussion_posts
(
    post_id       serial
        primary key,
    discussion_id integer not null
        references discussions
            on delete cascade,
    author_id     integer not null,
    content       text    not null,
    post_date     timestamp default CURRENT_TIMESTAMP
);

