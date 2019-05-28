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
        let sqlRequest = "SELECT * FROM links where user_id=" + user_id;
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            for (const row of rows) {
                links.push(new Link(row.id, row.title, row.url, row.description, row.user_id, row.createdate,row.modifydate));
            }
            return links;
        });
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM links";
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            for (const row of rows) {
                links.push(new Link(row.id, row.title, row.url, row.description, row.user_id, row.createdate,row.modifydate));
            }
            return links;
        });
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