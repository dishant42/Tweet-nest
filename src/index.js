import express from 'express';
import {connect} from './config/database.js';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js';

import {UserRespository,TweetRepository} from './Repository/index.js'
import LikeService from './services/like-service.js'


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRoutes);


app.listen(3000, async () => {

    console.log(`server started at PORT 3000`);
    await connect();
    console.log("connected to mongodb");

    let UserRepo = new UserRespository();
    let TweetRepo = new TweetRepository();
    const tweet = await TweetRepo.getAll();
    const user = await UserRepo.getAll()

    // const user = await UserRepo.create({
    //     email:"dgarg112@gmail.com",
    //     password:12345,
    //     name:"dg45"
    // })

    const likeService = new LikeService();
    likeService.toggleLike(tweet[0].id,"tweet",user[1].id);

    

})