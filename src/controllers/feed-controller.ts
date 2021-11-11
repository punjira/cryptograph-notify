import { FeedModel, Feed } from '../models/feed-model';

export function createFeed(params: Feed): Promise<Feed> {
     return new Promise((resolve, reject) => {
          FeedModel.create(params, function (err, result) {
               if (err) {
                    return reject(err);
               }
               resolve(result);
          });
     });
}

export function getPaginatedFeeds(req, res, next) {
     FeedModel.find({})
          .sort({ date: -1 })
          .limit(20)
          .exec(function (err, result) {
               if (err) {
                    return res.status(500).json({
                         data: err,
                         message: 'something went wrong!',
                    });
               }
               return res.status(200).json({
                    data: result,
               });
          });
}

export function getAdminFeeds(req, res, next) {}
