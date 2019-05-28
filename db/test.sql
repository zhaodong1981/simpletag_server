
insert into users(username,password,firstname,lastname ) values ('dzhao','mypass','Dong', 'Zhao');
insert into links (user_id, title,url, createdate, modifydate) values (1, 'gmail','https://mail.google.com',julianday('now'),julianday('now'));
insert into tag_link(tag,link_id) values ('mail',1);
insert into tag_link(tag,link_id) values ('web',1);
select * from users;
select * from links;
select * from tag_link;
select title, url, datetime(createdate,'localtime'),datetime(modifydate,'localtime') from links;
