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
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByUserId(req, res) {
        let user_id = req.params.user_id;

        this.linkDao.findByUserId(user_id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.linkDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findByPageSize(req,res) {
        let pagesize = req.query.per_page;
        let page = req.query.page;
        if (typeof pagesize === 'undefined'){
            pagesize =-1;
            page =1;
        }
        this.linkDao.findByPageSize(pagesize,page)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByKeywords(req,res) {
        let keywords = req.query.q;
        console.log("keywords = " + keywords);
        this.linkDao.findByKeywords(keywords)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {
        this.linkDao.countAll()
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
        console.log("link_id="+link.id+",new tags: " + tags);
        return this.linkDao.update(link).then(
            this.taglinkDao.updateTagsforLink(link.id, tags))
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
            return this.linkDao.create(link).then(
              this.taglinkDao.createStr(tags,link.url))
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        } else {
            return this.linkDao.create(link)
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

        this.linkDao.deleteById(id)
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

        this.linkDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = LinkController;