drop table if exists rooms
$$
create table rooms(id int not null AUTO_INCREMENT, room_name varchar(200), primary key(id)) engine innodb
$$
drop procedure if exists createRoom
$$
create procedure createRoom(rname varchar(200))
BEGIN
	insert into rooms(room_name) values(rname);
    select last_insert_id() as 'id';
END
$$
drop table if exists numbers
$$
create table numbers(room_id int, seq int, num int) ENGINE INNODB
$$
drop procedure if exists insertNumber
$$
create procedure insertNumber(rid int, s int, n int)
BEGIN
	insert into numbers(room_id, seq, num) values(rid, s, n);
END
$$
drop procedure if exists selectNumbers
$$
create procedure selectNumbers(rid int, s int)
BEGIN
	IF s=-1 THEN
    	select seq, num from numbers where room_id = rid order by seq asc;
    ELSE
    	select seq, num from numbers where room_id = rid and seq >= s order by seq asc;
    END IF;
END
$$