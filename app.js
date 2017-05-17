'use strict';

const config = require('./server/config'),
    app = require('./server/config/application'),
    data = require('./server/data')({ config }),
    controllers = require('./server/controllers')({ data }),
    multer = require('multer'),
    uploadBlogImage = multer({ dest: './public/images/blog-images/' });

require('./server/routers')({ app, controllers, uploadBlogImage });

app.listen(config.port);

console.log(`Server is running on port: ${config.port}`);