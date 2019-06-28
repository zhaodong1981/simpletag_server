/* Load Tag_link Data Access Object */
const Tag_linkDao = require('../dao/tag_linkDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Tag_link entity */
const Tag_link = require('../model/tag_link');

/**
 * Tag_link Controller
 */
class Tag_linkController {

    constructor() {
        this.tag_linkDao = new Tag_linkDao();
        this.common = new ControllerCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(req, res) {
        this.tag_linkDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(req, res) {

        this.tag_linkDao.countAll(req)
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let tag_link = new Tag_link();

        tag_link.link_id = req.body.link_id;
        tag_link.tag = req.body.tag;

        return this.tag_linkDao.create(tag_link)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteByLinkId(req, res) {
        let link_id = req.params.link_id;

        this.tag_linkDao.deleteByLinkId(link_id, req)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

      /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteTag(req, res) {
        
        let link_id = req.params.link_id;
        let tag = req.params.tag;
        console.log("link_id="+link_id+",tag="+tag);

        this.tag_linkDao.deleteTag(tag,link_id, req)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };
    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let link_id = req.params.link_id;
        let tag = req.params.tag;

        this.tag_linkDao.exists(link_id,tag, req)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = Tag_linkController;