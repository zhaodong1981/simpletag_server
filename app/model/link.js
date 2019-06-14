/**
 * Link Entity (ES6 Class)
 */

class Link {
    constructor(id, title, url, description,createdate, modifydate, tags) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.user_id = 1;
        this.createdate = createdate;
        this.modifydate = modifydate;
        this.tags = tags;
    }
}

module.exports = Link;