create schema 'db-photobucket';
use `db-photobucket`;
create table user
(
    username   varchar(30)                        not null
        primary key,
    password   varchar(32)                        not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at datetime                           null
);

create table album
(
    album_id   int auto_increment
        primary key,
    name       varchar(50)                        not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at datetime                           null,
    username   varchar(30)                        not null,
    constraint album_user_username_fk
        foreign key (username) references user (username)
);

create table picture
(
    picture_id int auto_increment
        primary key,
    url        varchar(2048)                      not null,
    album_id   int                                not null,
    created_at datetime default CURRENT_TIMESTAMP not null,
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at datetime                           null,
    constraint picture_album_album_id_fk
        foreign key (album_id) references album (album_id)
);