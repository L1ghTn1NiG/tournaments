const ResponseFormat = require('../helpers/response-format');

// router.get('/', function(req, res, next) { ... }, ProductController.getList);

const validator = (schema) => {
    return function (req, res, next) {
        const result = schema.validate({
            body: req.body,
            params: req.params,
        });
        if (!result.error) {
            req.body = result.value.body;
            req.params = result.value.params;
            next();
        } else {
            //throw BadRequestException(Request format error)
            res.status(400).json(
                ResponseFormat.error(
                    400,
                    'Request format error',
                    result.error.details[0].message,
                ),
            );
        }
    };
};

module.exports = validator;
