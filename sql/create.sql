drop table if exists rooms
$$
create table rooms(id int not null AUTO_INCREMENT, room_name varchar(200), room_id varchar(128), create_time datetime, primary key(id)) engine innodb
$$
create index idx_room_roomid on rooms(room_id)
$$
drop procedure if exists createRoom
$$
create procedure createRoom(rname varchar(200), rid varchar(128))
BEGIN
	insert into rooms(room_name, room_id,create_time) values(rname,rid,now());
    select last_insert_id() as 'id';
END
$$
drop table if exists numbers
$$
create table numbers(room_id int, seq int, num int) ENGINE INNODB
$$
create index idx_room_numers on numbers(room_id)
$$
drop procedure if exists insertNumber
$$
create procedure insertNumber(roomid varchar(128), s int, n int)
BEGIN
    declare rid int;
    select id into rid from rooms where room_id=roomid;
    insert into numbers(room_id, seq, num) values(rid, s, n);
END
$$
drop procedure if exists selectNumbers
$$
create procedure selectNumbers(roomid varchar(128), s int)
BEGIN
    declare rid int;
    select id into rid from rooms where room_id=roomid;
    select seq, num from numbers where room_id = rid and seq > s order by seq asc;
END
$$
drop procedure if exists doCleanUp
$$
create procedure doCleanUp()
begin
    delete from rooms where hour(timediff(now(),create_time))>5;
    delete from numbers where room_id not in (select id from rooms);
    delete from messages where room_id not in (select id from rooms);
end
$$
drop table if exists messages
$$
create table messages(id int not null auto_increment, room_id int, sender_name varchar(30), message_text varchar(255), primary key(id)) engine innodb
$$
create index idx_message_roomid on messages(room_id)
$$
drop procedure if exists sendMessage
$$
create procedure sendMessage(rname varchar(128), sender varchar(30), msg varchar(255))
begin
    declare rid int;
    select id into rid from rooms where room_id = rname;
    insert into messages(room_id, sender_name,message_text) values(rid,sender,msg);
end
$$
drop procedure if exists getMessages
$$
create procedure getMessages(rname varchar(128), seq int)
begin
    declare rid int;
    select id into rid from rooms where room_id=rname;
    select id, sender_name as 'sdr', message_text as 'msg' from messages where room_id=rid and id > seq order by id asc;
end
$$