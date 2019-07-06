/* Load Link entity */
const Link = require('../model/link');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

const util = require('../utils/helpers');

/**
 * Link Data Access Object
 */
class LinkDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findByPageSize(pagesize,page,req) {
        let offset=pagesize * (page -1);
        let sqlRequest = "SELECT id,title,url,description,datetime(createdate) cdate,datetime(modifydate) mdate,tag FROM " + util.processUser(req) 
        + "links LEFT OUTER JOIN " + util.processUser(req) + "tag_link ON " + util.processUser(req) + "links.id=" + util.processUser(req) + "tag_link.link_id ORDER BY mdate DESC LIMIT "+pagesize + " OFFSET " + offset;
     //   let sqlRequest2 = "SELECT COUNT(*) AS count FROM links";
        console.log(sqlRequest);
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;
            let count = 0;
            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
           if(pagesize === -1){
            return links;
           }else{
               return {'page' : page, data : links}
           }
           
        });
    };
    findByURL(url,req){
        
        let sqlRequest = "SELECT id,title,url,description,datetime(createdate) cdate,datetime(modifydate) mdate,tag FROM \
        " + util.processUser(req) + "links LEFT OUTER JOIN " + util.processUser(req) + "tag_link ON " + util.processUser(req) + "links.id=" + util.processUser(req) + "tag_link.link_id WHERE url = '" + url +
        "' --case-insensitive ORDER BY mdate DESC";
        console.log(sqlRequest);
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;
            for (const row of rows) {
                if ( current_link === null || row.id !== current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
            return links;
        });

    }

    findLinks(limit,req){
        let sqlRequest1 = "SELECT id,title,url,description,datetime(createdate) cdate,datetime(modifydate) mdate FROM " + util.processUser(req) + "links ORDER BY mdate DESC LIMIT " + limit;
        let links = [];
        return this.common.findAll(sqlRequest1).then((rows) => {
  //          console.log("step 1");
            let current_link = null;
            let ids = [];
            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.cdate, row.mdate, []);
                    links.push(current_link);
                    ids.push(row.id);
                }
            }
   //         console.log("links.length = " + links.length+", " + JSON.stringify(links));
   //         console.log("IDs =" + JSON.stringify(ids));
            return ids;
        }).then((ids) =>{
        //    console.log("step 2");
            let sqlRequest2 = "SELECT link_ID, tag FROM " + util.processUser(req) + "tag_link where link_id in ("+ ids.map(function(){ return '?' }).join(',') + ' )';
            return this.common.findAllArg(sqlRequest2, ids);
        }).then((rows) => {
  //          console.log("step 3");
            for(const row of rows){
                for(const link of links){
                    if(link.id === row.link_id){
                        link.tags.push(row.tag);
                        break;
                    }
                }
               
            }
 //           console.log("links = " + JSON.stringify(links));
            return links;
        });;
    }

    findByKeywords(keywords,req){
        if (typeof keywords != 'undefined'){
          console.log(" converting " + keywords );
          keywords = decodeURIComponent(keywords);
         // let newBuff = Buffer.from(keywords);
         // keywords = newBuff.toString('UTF-8');//encoding into UTF-8 used by sqlite3
        }
        
        let sqlRequest = "SELECT id,title,url,description,datetime(createdate) cdate,datetime(modifydate) mdate,tag FROM \
        " + util.processUser(req) + "links LEFT OUTER JOIN " + util.processUser(req) + "tag_link ON " + util.processUser(req) + "links.id=" + util.processUser(req) + "tag_link.link_id WHERE title LIKE '%" + keywords + "%' or url LIKE '%" + keywords +
        "%' or " + util.processUser(req) + "tag_link.link_id in(select link_id from " + util.processUser(req) + "tag_link where tag LIKE '%" + keywords + "%') --case-insensitive ORDER BY mdate DESC";
        console.log(sqlRequest);
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;
            for (const row of rows) {
                if ( current_link === null || row.id !== current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.cdate, row.mdate, []);
                    links.push(current_link);
                }
                if (row.tag != null) {
                    current_link.tags.push(row.tag);
                }
            }
            return links;
        });

    }

    findByTag(tag,req) {
        tag = decodeURIComponent(tag);
        //let newBuff = Buffer.from(tag);
       // tag = newBuff.toString('UTF-8');//encoding into UTF-8 used by sqlite3
        let sqlRequest = "SELECT id,title,url,description,datetime(createdate) cdate,datetime(modifydate) mdate,tag FROM " + util.processUser(req) + "links LEFT OUTER JOIN " + util.processUser(req) + "tag_link ON " + util.processUser(req) + "links.id=" + util.processUser(req) + "tag_link.link_id where \
        " + util.processUser(req) + "tag_link.link_id in(select link_id from " + util.processUser(req) + "tag_link where tag = '" + tag + "')"  + " ORDER BY link_id ASC";
        console.log(sqlRequest);
        return this.common.findAll(sqlRequest).then(rows => {
            let links = [];
            let current_link = null;

            for (const row of rows) {
                if ( current_link == null || row.id != current_link.id ){
                    current_link = new Link(row.id, row.title, row.url, row.description, row.cdate, row.mdate, []);
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
     * Counts all the records present in the database
     * @return count
     */
    countAll(req) {
        let sqlRequest = "SELECT COUNT(*) AS count FROM " + util.processUser(req) + "links";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Link
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Link,req) {
        let sqlRequest = "UPDATE " + util.processUser(req) + "links SET " +
            "title=$title, " +
            "url=$url, " +
            "description=$description, " +
            "modifydate=datetime('now') " +
            "WHERE id=$id";

        let sqlParams = {
            $title: Link.title,
            $url: Link.url,
            $description: Link.description,
            $id: Link.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Link
     * returns database insertion status
     */
    create(Link,req) {
        let sqlRequest = "INSERT into " + util.processUser(req) + "links (title, url, description, createdate, modifydate) " +
            "VALUES ($title, $url, $description, datetime('now'), datetime('now'))";
        let sqlParams = {
            $title: Link.title,
            $url: Link.url,
            $description: Link.description,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id,req) {
        let sqlRequest = "DELETE FROM " + util.processUser(req) + "links WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id,req) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM " + util.processUser(req) + "links WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = LinkDao;