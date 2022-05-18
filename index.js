const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app=express()
const port=process.env.PORT ||5000

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://todoApp:09hQF2hrBFU9OgXQ@cluster0.gal73.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        console.log('conected');
        const taskCollection = client.db('ToDoList').collection('TaskList')

     
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Running server')
})
app.listen(port,()=>{
    console.log('Listening to port ',port)
})