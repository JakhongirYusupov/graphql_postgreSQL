
export const USERS = `
select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u
inner join user_sorting us on u.user_id = us.user_id
WHERE
	CASE
		WHEN $1 > 0 THEN u.user_id = $1
		ELSE TRUE
	END;
`

export const INSERT_USER = `
insert into users (full_name, user_name, password) values
($1, $2, $3)
returning user_id;
`

export const UPDATE_USER = `
update users set 
    full_name = $1, 
    user_name = $2, 
    password = $3
where user_id = $4;
`

export const UPDATE_USER_ABOUT = `
update user_about set 
    email = $1,
    bio = $2
where user_id = $3;
`
export const DELETE_USER = `
    delete user_sorting
    from user_id = $1

    delete user_about
    from user_id = $1

    delete from users
    where user_id = $1
`


export const INSERT_USER_SORTING = `
insert into user_sorting values 
($1, false, false);
`

export const INSERT_USER_ABOUT = `
insert into user_about values
($1, $2, $3)
`

export const ACTIVE_USER = `
select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u
inner join user_sorting us on u.user_id = us.user_id
where us.active = true;
`

export const DISACTIVE_USER = `
select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u
inner join user_sorting us on u.user_id = us.user_id
where us.active = false;
`

export const SELECT_USER = `
select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u
inner join user_sorting us on u.user_id = us.user_id
where us.selected = true;
`

export const DISSELECT_USER = `
select 
    u.user_id,
    u.full_name,
    u.user_name,
    u.add_date,
    us.active,
    us.selected
from users u
inner join user_sorting us on u.user_id = us.user_id
where us.selected = false;
`

export const STATISTICA = `
select 
    count(active) as all,
    count(CASE WHEN active = true THEN 1 END) as actives,
    count(CASE WHEN selected = true THEN 1 END) as selecteds
from user_sorting;
`