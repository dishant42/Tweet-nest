import express from 'express';
import {connect} from './config/database.js';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRoutes);


app.listen(3000, async () => {

    console.log(`server started at PORT 3000`);
    await connect();
    console.log("connected to mongodb");

})