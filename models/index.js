require("../Config/connection")

module.exports = {
    Like: require('./likes'),
    Post: require('./post'),
    Comments: require('./comments'),
    User: require('./user')
}