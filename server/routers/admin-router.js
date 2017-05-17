/* globals module */
'use strict';

module.exports = ({ app, controllers, uploadBlogImage }) => {
    const controller = controllers.admin

    app.get('/admin/create', controller.getCreateBlogPostPage)
    app.post('/admin/create', uploadBlogImage.single('blogImage'), controller.createBlogPost)
}