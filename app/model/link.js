/**
 * Link Entity (ES6 Class)
 */

class Link {
    constructor(id, title, url, description, user_id, createdate, modifydate, tags) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.user_id = user_id;
        this.createdate = createdate;
        this.modifydate = modifydate;
        this.tags = tags;
    }
}

module.exports = Link;