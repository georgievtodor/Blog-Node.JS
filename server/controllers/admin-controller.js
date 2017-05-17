/* globals module */
'use strict';

module.exports = ({ data }) => {
    return {
        getCreateBlogPostPage(req, res) {
            return res.status(200).render('add-post');
        },
        createBlogPost(req, res) {
            const body = req.body
            console.log(body);

            data.createBlogPost({
                title: body.title,
                subTitle: body.subTitle,
                description: body.description,
                image: req.file ? req.file.filename : 'default.png'
            })
                .then(() => {
                    res.redirect('/home')
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}