create database loyiha;

\c loyiha;

drop table if exists users cascade;
create table users (
    user_id serial primary key,
    full_name character varying(20),
    user_name character varying(20),
    add_date timestamptz default current_timestamp,
    password character varying(15)
);

drop table if exists user_sorting cascade;
create table user_sorting (
    user_id smallint not null references users(user_id),
    active boolean default false,
    selected boolean default false
);

drop table if exists user_about cascade;
create table user_about (
    user_id smallint not null references users(user_id),
    email character varying(30),
    bio character varying
);


insert into users (full_name, user_name, password) values 
('Ali Zoirov', 'ali', 'ali4833'),
('Abror Alisherov', 'abror', 'abror2490'),
('Ilhom Abdulazizov', 'Ilhom', 'ilhom32844'),
('Jamshid Savirov', 'jam', 'jam3598'),
('Hikmat Jabborov', 'hikmat', 'hikmat3875'),
('Jabbor Boynazarov', 'jabbor', 'jab4923'),
('Mardon Tursunov', 'mardon', 'mard2413');

insert into user_sorting values 
(1,true, false),
(2,false, false),
(3,false, false),
(4,true, false),
(5,false, false),
(6,true, false),
(7,false, false);

insert into user_about values 
(1,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(2,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(3,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(4,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(5,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(6,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe'),
(7,'aligrei@gmail.com', 'iashfreuigoehrg rejioehnieout et hgeitohg etgihte gethigoetgioethg teget8hgi et et et8hgioe');


select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u 
inner join user_sorting us on u.user_id = us.user_id;



insert into users (full_name, user_name, password) values 
('Ali Zoirov', 'ali', 'ali4833') returning user_id;


select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    ua.email,
    ua.bio
from users u
inner join user_about ua on u.user_id = ua.user_id;
