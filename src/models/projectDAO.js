import slugify from "slugify";
import shortid from "shortid";


const TABLE_KEY = "ProjectTableKey";


class Project {
    constructor(title, description, createdByUserSlug, userSlugsArray, wordDocURL, pictureURLArray, videoURLArray ) {
        this.title = title;
        this.description = description;
        this.createdByUserSlug = createdByUserSlug;
        this.userSlugsArray = userSlugsArray;
        this.wordDocURL = wordDocURL;
        this.pictureURLArray = pictureURLArray;
        this.videoURLArray = videoURLArray;
    }

}


export default class ProjectDAO {
    constructor() {
        const projectJSON = localStorage.getItem(TABLE_KEY);
        const projectArr = JSON.parse(projectJSON);

        if (projectArr === undefined || projectArr === null || projectArr === "") {
            localStorage.setItem(TABLE_KEY, JSON.stringify([]));
        }
    }

    getList() {
        return [] //TODO: finish
    }
}
