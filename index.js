//requiring dependencies.
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.json())
app.use(cors());

const UserRouter = require('./Router/user.router');
const QuestionRouter = require('./Router/question.router');
app.use('/users', UserRouter);
app.use('/questions', QuestionRouter)

if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

const mongoURL="mongodb+srv://Boobalan:boobalan1234@cluster0.ixzoi.mongodb.net/Stockoverflow-clone";
mongoose.connect(mongoURL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
