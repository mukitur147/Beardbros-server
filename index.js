const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm5yk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run(){
    try{
        await client.connect()
        const database = client.db('beardbros');
        const productCollection = database.collection('products')
        const blogsCollection = database.collection('blogs')

          // get Products api 
          app.get('/products',async(req,res)=>{
            const cursor= productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });
          // get Blogs api 
          app.get('/blogs',async(req,res)=>{
            const cursor= blogsCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        });
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir)






app.get('/',(req,res)=>{
    res.send('Hello from BeardBros Server')
});

app.listen(port,()=>{
    console.log('server running at', port )
});