CREATE TABLE if not exists users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        firstname TEXT,
        lastname TEXT 
);

CREATE TABLE if not exists links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT, 
	url TEXT,
        description TEXT,
        createdate REAL,
        modifydate REAL,
	CONSTRAINT fk_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE if not exists tag_link (
        tag TEXT,
        link_id INTEGER,
        CONSTRAINT fk_links
        FOREIGN KEY (link_id)
        REFERENCES links(id)
        ON DELETE CASCADE,
        PRIMARY KEY (tag, link_id)
);
