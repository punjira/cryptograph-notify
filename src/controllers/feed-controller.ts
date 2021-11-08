import { FeedModel, Feed } from '../models/feed-model';

export function createFeed(params: Feed): Promise<any> {
     return new Promise((resolve, reject) => {
          FeedModel.create(params, function (err, result) {
               if (err) {
                    return reject(err);
               }
               resolve(result);
          });
     });
}

export function getPaginatedFeeds(req, res, next) {}

export function getAdminFeeds(req, res, next) {}
