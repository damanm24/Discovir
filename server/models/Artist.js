export default class Artist {
    constructor(artistObj) {
        this.id = artistObj.id;
        this.name = artistObj.name;
        this.popularity = artistObj.popularity;
        this.image = artistObj.images[1].url;
        this.genres = artistObj.genres;
    }
}
