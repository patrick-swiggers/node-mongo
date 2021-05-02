/* REST API project with Node.js, Express and MongoDB on AWS Cloud */
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
/* Replace below line with your connection string and password */
const uri = "mongodb+srv://pswigge:<password>@cluster0.tuc6d.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send("I hear ya");
});

app.get('/api/projects', (req,res) => {

    client.connect(err => {
        const collection = client.db("test").collection("projects");
        collection.find().toArray((error,documents)=>{
            if(error){
                throw error;
            }
            res.send(documents);
        });
    });
});

app.post('/api/projects', (req,res) => {
    client.connect(err => {
        const collection = client.db("test").collection("projects");
        collection.insertOne(req.body, (error,result) => {
            if(error){
                throw error;
            }
            res.send(result.insertedId);
        });
    });
});

app.listen(3000, () => {
    console.log("started!");
});
