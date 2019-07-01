var parser = require('xml2json');

const Link = require('../app/model/link');

var fs = require('fs');

const database = require('../app/config/dbconfig');

database.init();

const daoCommon = require('../app/dao/commons/daoCommon');

var xmlfile = 'db/bookmarks.xml';
//console.log("input -> %s", xml)

const schema = 'dzhao_';
var file = fs.readFileSync(xmlfile, "utf8");

common = new daoCommon();

// xml to json
var json = parser.toJson(file, {object: true});
//console.log(JSON.stringify(json));

var bookmarks = json.bookmarks.bookmark;
//console.log(JSON.stringify(bookmarks));
var i=0;
for (const bookmark of bookmarks){
    var link = new Link();
    link.title = bookmark.title;
    link.url = bookmark.url;
    link.description = "Imported from google bookmarks";
    link.modifydate = bookmark.timestamp;
    var tags = [];
    if(typeof bookmark.labels === 'undefined'){
        //no tags
      //  console.log(JSON.stringify(bookmark));
      //  console.log("number of tags= " + tags.length + ",tags = " +tags);
    }else if(typeof bookmark.labels.label !== 'undefined' && bookmark.labels.label.constructor === Array){
       //multiple tags
       tags = bookmark.labels.label;
      // console.log("number of tags= " + tags.length + ",tags = " +tags);
    } else{
        //one label
        var tags = bookmark.labels.label.split(" ");
      //  console.log("number of tags= " + tags.length + ",tags = " +tags);
    }
    createLinkTags(link,tags);
    console.log("Create %s bookmark ", ++i);
}

function createLinkTags(link, tags){
        
        if (typeof tags !== 'undefined' && tags.constructor === Array && tags.length >0){
            return create(link).then(
                createTags(tags,link.url));
        } else {
            return create(link);
        }
}
function create(link) {
    let sqlRequest = "INSERT into " + schema + "links (title, url, description, createdate, modifydate) " +
        "VALUES ($title, $url, $description, datetime('now'), datetime($modifydate, 'unixepoch'))";
    let sqlParams = {
        $title: link.title,
        $url: link.url,
        $description: link.description,
        $modifydate: link.modifydate/1000000
    };
    return common.run(sqlRequest, sqlParams);
};

function createTags(tags,url) {
    let sqlRequest1 = "select id as link_id from "  + schema + "links WHERE url ='" + url +"' ORDER BY modifydate DESC LIMIT 1";
     return this.common.findOne(sqlRequest1).then((row) => {
          let sqlRequest2 = "INSERT into "  + schema + "tag_link (tag,link_id) VALUES ";
          for (const tag of tags){
              sqlRequest2 += "('" + tag + "'," + row.link_id + "),"
          }
          sqlRequest2 = sqlRequest2.slice(0, -1);
          return common.runNoArg(sqlRequest2);
      });
      
     //     INSERT into tag_link (tag,link_id) values('test123',(select id as link_id from links WHERE url ='https://www.163.com' ORDER BY modifydate DESC LIMIT 1))
  };