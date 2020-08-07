const express = require('express');
const router = express.Router();
const RecordModel = require('../models/Record');

router.post('/records', (req, res, next) => {
    try {
        const { startDate, endDate, minCount, maxCount } = req.body;

        RecordModel.aggregate([
            {
                '$match': {
                    'createdAt': {
                        '$gte': new Date(startDate),
                        '$lte': new Date(endDate)
                    }
                }
            }, {
                '$group': {
                    '_id': {
                        'key': '$key',
                        'createdAt': '$createdAt',
                        'counts': '$counts'
                    }
                }
            }, {
                '$project': {
                    'totalCount': {
                        '$sum': '$_id.counts'
                    }
                }
            }, {
                '$match': {
                    'totalCount': {
                        '$gte': parseInt(minCount),
                        '$lte': parseInt(maxCount)
                    }
                }
            }
        ]).exec((err, records) => {
            if (!err)
                res.send({ code: "0", msg: "Success", records: records });
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;