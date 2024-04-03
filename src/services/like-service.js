import { LikeRespository, TweetRepository } from "../Repository/index.js";


class LikeService {
    constructor() {
        this.likeRepository = new LikeRespository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        if(modelType == 'tweet') {
            var likeable = await this.tweetRepository.get(modelId) /*likeable is fetching that particular tweet*/
        } else if(modelType == 'comment') {
            // TODO
        } else {
            throw new Error('unknown model type');
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        console.log("this is exists",exists)
        if(exists) {
            likeable.likes.pull(exists.id);
            await likeable.save();
            await this.likeRepository.destroy(exists.id);
            var isAdded = false;

        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isAdded = true;
        }
        return isAdded;
    }   
}

export default LikeService;