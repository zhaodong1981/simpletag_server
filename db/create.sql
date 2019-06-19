PRAGMA foreign_keys = ON;

CREATE TABLE if not exists users (
        username TEXT PRIMARY KEY,
        password TEXT,
        firstname TEXT,
        lastname TEXT,
        schema TEXT
);

insert into users(username,password,firstname,lastname,schema ) values ('dzhao','mypass','Dong', 'Zhao','dzhao_');

CREATE TABLE if not exists dzhao_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, 
	url TEXT,
        description TEXT,
        createdate REAL,
        modifydate REAL
);

CREATE TABLE if not exists dzhao_tag_link (
        tag TEXT,
        link_id INTEGER,
        CONSTRAINT fk_links
        FOREIGN KEY (link_id)
        REFERENCES dzhao_links(id)
        ON DELETE CASCADE,
        PRIMARY KEY (tag, link_id)
);
