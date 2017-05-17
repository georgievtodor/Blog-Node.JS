/* globals module */
'use strict';

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 3;

module.exports = ({ data }) => {
    return {
        getHome(req, res) {
            res.render('whole');
        },
        loadBlogPosts(req, res) {
            const page = Number(req.query.page || DEFAULT_PAGE);

            Promise.all([data.getBlogPosts({ page, pageSize: PAGE_SIZE }), data.getBlogPostsCount()])
                .then(([blogPosts, blogPostsCount]) => {
                    const pages = Math.ceil(blogPostsCount / PAGE_SIZE);

                    return res.status(200).render('home-page', {
                        result: { blogPosts, params: { page, pages } }
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        loadBlogPostById(req, res) {
            const id = req.params.id;
            data.getBlogPostById(id)
                .then(blogPost => {
                    res.render('post', { result: { blogPost } });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        addCommentToBlogPost(req, res) {
            const body = req.body,
                id = req.params.id;

            data.addAnswerToBlogPost(id, {
                content: body.comment,
                author: body.author || "Anonymous"
            })
                .then(() => {
                    res.redirect('/posts/' + id);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}