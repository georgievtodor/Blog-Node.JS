'use strict';

module.exports = ({ app, controllers }) => {
    const controller = controllers.home;

    app.get('/', controller.getHome);
    app.get('/posts', controller.loadBlogPosts);
    app.get('/posts/:id', controller.loadBlogPostById);
    app.post('/posts/:id/comment', controller.addCommentToBlogPost);
}