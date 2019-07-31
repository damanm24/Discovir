export default class User {
  constructor(userObj) {
    this.id = userObj.id;
    if (userObj.display_name) {
      this.name = userObj.display_name;
    } else {
      this.name = userObj.name;
    }
    // this.images = userObj.images;
  }
}
