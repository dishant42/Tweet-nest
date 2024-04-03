import { TweetRepository, HashtagRepository } from "../Repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
        const content = data.content;
        const tags = content
        .match(/#[a-zA-Z0-9_]+/g) // this regex extracts hashtags
        .map((tag) => tag.substring(1).toLowerCase())
        

        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresenttags = alreadyPresentTags.map((tags) => tags.title);

        let newTags = tags.filter((tag) => !titleOfPresenttags.includes(tag));
        newTags = newTags.map((tag) => {
        return { title: tag, tweets: [tweet.id] };
        });

        await this.hashtagRepository.bulkCreate(newTags);/*creation of new tags in db */

        alreadyPresentTags.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
        });
        return tweet;
  }

      async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}
export default TweetService;
