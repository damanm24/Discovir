'use strict'

class User {
    constructor(userObj) {
        this.id = userObj.id;
        this.name = userObj.display_name;
        //this.images = userObj.images;
    }

}

module.exports = User;