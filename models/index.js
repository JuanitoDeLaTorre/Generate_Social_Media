require("../Config/connection")

module.exports = {
    Likes: require('./likes'),
    Post: require('./post'),
    Comments: require('./comments'),
    User: require('./user')
}