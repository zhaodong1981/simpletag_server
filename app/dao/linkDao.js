/* Load Link entity */
const Link = require('../model/link');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Link Data Access Object
 */
class LinkDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using user Id
     * @params user_id
     * @return entity
     */
    findByUserId(user_id) {
        let sqlRequest = "SELECT id,title,url,description,user_id,date(createdate) cdate,date(modifydate) mdate,tag FROM (SELECT * FROM links WHERE user_id=" + user_id + ") AS tmp_links LEFT OUTER JOIN tag_link ON tmp_links.id=tag_link.link_id ORDER BY tmp_links.id ASC";
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;

            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.user_id, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
            return links;
        });
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT id,title,url,description,user_id,date(createdate) cdate,date(modifydate) mdate,tag FROM links LEFT OUTER JOIN tag_link ON links.id=tag_link.link_id ORDER BY link_id ASC";
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;

            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.user_id, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
            return links;
        });
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findByPageSize(pagesize,page) {
        let offset=pagesize * (page -1);
        let sqlRequest = "SELECT id,title,url,description,user_id,date(createdate) cdate,date(modifydate) mdate,tag FROM links LEFT OUTER JOIN tag_link ON links.id=tag_link.link_id ORDER BY mdate DESC LIMIT "+pagesize + " OFFSET " + offset;
        let sqlRequest2 = "SELECT COUNT(*) AS count FROM links";
        let links = [];
        return this.common.findAll(sqlRequest).then(rows => {
         
            let current_link = null;
            let count = 0;
            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.user_id, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
           
            return links;
        }).then( link => {this.common.findOne(sqlRequest2)}).then(row => { return {'page' : page, 'total' : row.count, data : links}});
    };
    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM links";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Link
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Link) {
        let sqlRequest = "UPDATE links SET " +
            "title=$title, " +
            "url=$url, " +
            "description=$description, " +
            "user_id=$user_id, " +
            "modifydate=julianday('now') " +
            "WHERE id=$id";

        let sqlParams = {
            $title: Link.title,
            $url: Link.url,
            $description: Link.description,
            $user_id: Link.user_id,
            $id: Link.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Link
     * returns database insertion status
     */
    create(Link) {
        let sqlRequest = "INSERT into links (title, url, description, user_id, createdate, modifydate) " +
            "VALUES ($title, $url, $description, $user_id, julianday('now'), julianday('now'))";
        let sqlParams = {
            $title: Link.title,
            $url: Link.url,
            $description: Link.description,
            $user_id: Link.user_id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM links WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM links WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = LinkDao;