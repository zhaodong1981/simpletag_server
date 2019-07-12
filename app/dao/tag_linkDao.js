/* Load Tag_link entity */
const Tag_link = require('../model/tag_link');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

const util = require('../utils/helpers');
/**
 * Tag_link Data Access Object
 */
class Tag_linkDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(req) {
        //select tag from dzhao_tag_link GROUP BY TAG ORDER BY COUNT(TAG) DESC
        //select tag, COUNT(TAG) num from dzhao_tag_link GROUP BY TAG ORDER BY num DESC;
        let sqlRequest = "SELECT tag, COUNT(tag) num FROM "+ util.processUser(req) + "tag_link GROUP BY tag ORDER BY num DESC";
        return this.common.findAll(sqlRequest).then(rows => {
            let tag_links = [];
            for (const row of rows) {
                tag_links.push({tag: row.tag, count: row.num});
            }
            return tag_links;
        });
    };


    /**
     * Finds all entities.
     * @return all entities
     */
    findAllWithLinks(req) {
        let sqlRequest = "SELECT * FROM "+ util.processUser(req) + "tag_link ORDER BY tag";
        return this.common.findAll(sqlRequest).then(rows => {
            let tag_links = [];
            let current_tag_link = null;
            for (const row of rows) {         
               if ( current_tag_link === null || row.tag !== current_tag_link.tag ){
                    current_tag_link = {"tag": row.tag, "links": []};
                    tag_links.push(current_tag_link);
                }
                current_tag_link.links.push(row.link_id);
                
            }
            return tag_links;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(req) {
        let sqlRequest = "SELECT COUNT(*) AS count FROM "+ util.processUser(req) + "tag_link";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Tag_link
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Tag_link,req) {
        let sqlRequest = "UPDATE "+ util.processUser(req) + "tag_link SET " +
            "tag=$tag, " +
            "link_id=$link_id";

        let sqlParams = {
            $tag: Tag_link.tag,
            $link_id: Tag_link.link_id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Tag_link
     * returns database insertion status
     */
    create(Tag_link,req) {
        let sqlRequest = "INSERT into " + util.processUser(req) + "tag_link (tag,link_id) " +
            "VALUES ($tag, $link_id)";
            let sqlParams = {
                $tag: Tag_link.tag,
                $link_id: Tag_link.link_id
            };
        return this.common.run(sqlRequest, sqlParams);
    };

        /**
     * Creates the given entity in the database
     * @params tags
     * @params url
     * returns database insertion status
     */
    createStr(tags,url,req) {
      let sqlRequest1 = "select id as link_id from " + util.processUser(req) +"links WHERE url ='" + url +"' ORDER BY modifydate DESC LIMIT 1";
       return this.common.findOne(sqlRequest1).then((row) => {
            let sqlRequest2 = "INSERT into " + util.processUser(req) +"tag_link (tag,link_id) VALUES ";
            for (const tag of tags){
                sqlRequest2 += "('" + tag + "'," + row.link_id + "),"
            }
            sqlRequest2 = sqlRequest2.slice(0, -1);
            return this.common.runNoArg(sqlRequest2);
        });
        
       //     INSERT into tag_link (tag,link_id) values('test123',(select id as link_id from links WHERE url ='https://www.163.com' ORDER BY modifydate DESC LIMIT 1))
    };
    updateTagsforLink(link_id, tags, req) {
        let sqlRequest = "DELETE FROM " + util.processUser(req) + "tag_link WHERE link_id=$link_id";
   //     console.log("Updating tags for link " + link_id);
        let sqlParams = {
            $link_id: link_id
        };
        if (tags.length === 0){
            return this.common.run(sqlRequest, sqlParams);
        } else {
            return this.common.run(sqlRequest, sqlParams).then(()=>{
                let sqlRequest2 = "INSERT into " + util.processUser(req) + "tag_link (tag,link_id) VALUES ";
                for (const tag of tags){
                    sqlRequest2 += "('" + tag + "'," + link_id + "),"
                }
                sqlRequest2 = sqlRequest2.slice(0, -1);
    //            console.log("Updating tags for link " + sqlRequest2);
                return this.common.runNoArg(sqlRequest2);
            });
        }
        
    };
    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteByLinkId(link_id, req) {
        let sqlRequest = "DELETE FROM "+ util.processUser(req) + "tag_link WHERE link_id=$link_id";
        let sqlParams = {$link_id: link_id};
        return this.common.run(sqlRequest, sqlParams);
    };

      /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteTag(tag,link_id, req) {
        let sqlRequest = "DELETE FROM "+ util.processUser(req) + "tag_link WHERE link_id=$link_id AND tag=$tag";
        let sqlParams = {
            $link_id: link_id,
            $tag: tag
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = Tag_linkDao;