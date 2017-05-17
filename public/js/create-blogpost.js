'use strict';

var app = app || {};

$('#create').on('click', (ev) => {
    const title = $('#title').val();
    const subTitle = $('#subTitle').val();
    const description = $('#description').val();
    const image = $('#tb-blog')[0].files[0];

    let formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('blogImage', image);

    app.requester.postWithFile('/admin/create', formData)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log('error');
            console.log(err);
        })
})