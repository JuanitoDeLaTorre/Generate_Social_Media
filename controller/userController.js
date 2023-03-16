async function getUserPosts(username) {
    const userPosts = await Post.find({user: username}).populate('user');
    return userPosts
}


module.exports = { getUserPosts };



const { getUserPost } = require()

application.get('/Users/:username', async (req,res, next) => {
    const username = req.params.username;

    try {
        const posts = await getUserPosts(username);
        res.render('profile', { posts:posts });
    } catch (error) {
        console.log(error);
        next();
    }
})