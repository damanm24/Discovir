'use strict'

class Artist {
    constructor(artistObj) {
        this.id = artistObj.id;
        this.name = artistObj.name;
        this.popularity = artistObj.popularity;
    }
}

module.exports = Artist;