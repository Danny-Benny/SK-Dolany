create table users
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

alter table users
    owner to postgres;

create table news
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

alter table news
    owner to postgres;

create table roster
(
    id               integer default nextval('roster_player_id_seq'::regclass) not null
        primary key,
    player_name      varchar(255)                                              not null,
    player_position  varchar(255),
    jersey_number    integer,
    player_photo_url text
);

alter table roster
    owner to postgres;

create table season_links
(
    id          serial
        primary key,
    season_name varchar(255) not null,
    link_url    text
);

alter table season_links
    owner to postgres;

create table sponsors
(
    id               serial
        primary key,
    company_logo_url text
);

alter table sponsors
    owner to postgres;

create table photos
(
    id          serial
        primary key,
    name        varchar(255),
    image_url   text,
    description text,
    author_id   integer
        references users
);

alter table photos
    owner to postgres;

create table groups
(
    group_id   serial
        primary key,
    group_name varchar(255) not null
);

alter table groups
    owner to postgres;

create table discussions
(
    discussion_id serial
        primary key,
    group_id      integer      not null
        references groups
            on delete cascade,
    author_id     integer      not null,
    topic         varchar(255) not null
);

alter table discussions
    owner to postgres;

create table discussion_posts
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

alter table discussion_posts
    owner to postgres;

