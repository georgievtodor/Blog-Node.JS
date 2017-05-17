/* globals module require */
'use strict';

const locutus = require('locutus/php/strings/nl2br');

module.exports = ({ models }) => {
    const BlogPost = models.blogPost;

    return {
        createBlogPost(blogPost) {
            const date = new Date();
            const formatedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

            const newBlogPost = new BlogPost({
                title: blogPost.title,
                subTitle: blogPost.subTitle,
                description: blogPost.description,
                date,
                formatedDate,
                image: blogPost.image,
                answers: []
            });

            return new Promise((resolve, reject) => {
                newBlogPost.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newBlogPost);
                });
            });
        },
        getBlogPosts({ page, pageSize }) {
            const skip = (page - 1) * pageSize,
                limit = pageSize;

            return new Promise((resolve, reject) => {
                BlogPost.find({}, {}, {
                    sort: { 'date': -1 },
                    skip,
                    limit
                }, (err, blogPosts) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(blogPosts);
                });
            });
        },
        getBlogPostsCount() {
            return new Promise((resolve, reject) => {
                BlogPost.count({}, (err, count) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(count);
                });
            });
        },
        getBlogPostById(id) {
            return new Promise((resolve, reject) => {
                BlogPost.findOne({ '_id': id }, (err, blogPost) => {
                    if (err) {
                        return reject(err);
                    }
                    blogPost.description = locutus(blogPost.description);
                    return resolve(blogPost);
                });
            });
        },
        addAnswerToBlogPost(blogPostId, answer) {
            return new Promise((resolve, reject) => {
                const date = new Date();
                const formatedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

                answer.date = date;
                answer.formatedDate = formatedDate;

                BlogPost.findByIdAndUpdate({ '_id': blogPostId }, { $push: { 'answers': answer } },
                    (err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        }
    }
}