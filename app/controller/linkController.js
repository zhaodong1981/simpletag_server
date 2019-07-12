/* Load Link Data Access Object */
const LinkDao = require('../dao/linkDao');

const Tag_linkDao = require('../dao/tag_linkDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Link entity */
const Link = require('../model/link');

/**
 * Link Controller
 */
class LinkController {

    constructor() {
        this.linkDao = new LinkDao();
        this.common = new ControllerCommon();
        this.taglinkDao = new Tag_linkDao();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findByPageSize(req,res) {

        let pagesize = req.query.page_size;
        let page = req.query.page;
        if (typeof pagesize === 'undefined'){
            pagesize =-1;
            page =1;
        }
 //       console.log("findByPageSize " + pagesize);
        this.linkDao.findByPageSize(pagesize,page,req)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findLastModified(req,res){
        let limit = req.query.limit;
        if (typeof limit === 'undefined'){
            limit = -1;
        }
        this.linkDao.findLinks(limit,req).then(this.common.findSuccess(res))
        .catch(this.common.findError(res));
    }
    findByKeywords(req,res) {
        let keywords = req.query.q;
        let tag = req.query.tag;
        let url = req.query.url;
        if(typeof url != 'undefined' && url !=null && url != ''){
            this.linkDao.findByURL(url,req)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
        } else if (typeof tag != 'undefined' && tag !=null && tag != '') {
            this.linkDao.findByTag(tag,req)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
        } else {
            this.linkDao.findByKeywords(keywords,req)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
        }
       
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(req,res) {
        this.linkDao.countAll(req)
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let link = new Link();
        link.id = req.params.id;
        link.title = req.body.title;
        link.description = req.body.description;
        link.url = req.body.url;

        let tags = req.body.tags;
        if (typeof tags === 'undefined' || tags.constructor !== Array && tags.length === 0){
            tags = [];
        }
 //       console.log("link_id="+link.id+",new tags: " + tags);
        return this.linkDao.update(link, req).then(
            this.taglinkDao.updateTagsforLink(link.id, tags, req))
          .then(this.common.editSuccess(res))
          .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let link = new Link();

        link.title = req.body.title;
        link.description = req.body.description;
        link.url = req.body.url;
        link.user_id = 1;
       
        let tags = req.body.tags;
        if (typeof tags !== 'undefined' && tags.constructor === Array && tags.length >0){
            return this.linkDao.create(link, req).then(
              this.taglinkDao.createStr(tags,link.url,req))
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        } else {
            return this.linkDao.create(link, req)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        }
    
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.linkDao.deleteById(id,req)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.linkDao.exists(id, req)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = LinkController;