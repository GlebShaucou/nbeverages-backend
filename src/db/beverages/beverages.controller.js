const beverageModel = require('./beverages.model');

module.exports = {
    create: function (req, res, next) {
        const { body } = req;

        beverageModel
            .create({ ...body }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 'success',
                    message: 'Movie added successfully!',
                    data: result,
                });
            }
        });
    },
    getAll: function (req, res, next) {
        beverageModel.find({}, function (err, beverages) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status:'success',
                    message: 'Movies list found!',
                    data: {
                        beverages,
                    }
                });
            }
        });
    },
};
