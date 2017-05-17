'use strict';

module.exports = ({ mongoose }) => {
    const Schema = mongoose.Schema;

    const blogPostSchema = new Schema({
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        description: {
            type: String,
            required: true,
        },
        image: { type: String },
        date: {
            type: Date,
            required: true
        },
        formatedDate: {
            type: String,
            required: true
        },
        answers: [{
            content: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 1000
            },
            author: {
                type: String,
                required: true,
                minLength: 3,
                maxLength: 15
            },
            date: {
                type: Date,
                required: true
            },
            formatedDate: {
                type: String,
                required: true
            }
        }]
    })

    mongoose.model('BlogPost', blogPostSchema);

    return mongoose.model('BlogPost');
}