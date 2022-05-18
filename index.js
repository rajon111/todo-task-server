const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config()
const app=express()
const port=process.env.PORT ||5000

app.use(cors())
app.use(express.json())


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gal73.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        console.log('conected');
        const taskCollection = client.db('ToDoList').collection('TaskList')

        app.post('/addtask',async(req,res)=>{
            const task=req.body 
            const name=req.body.name
            const result=await taskCollection.insertOne(task) 
            res.send({result:result,name:name})
        })

        app.get('/alltask',async(req,res)=>{
            const email=req.query.email
            
            const query={email}
            const cursor=taskCollection.find(query)
            const alltasks=await cursor.toArray()
            res.send(alltasks)
        })

        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id
            const updateTasks = req.body
            const query = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    selected: updateTasks.newSelected
                }
            }

            const result = await taskCollection.updateOne(query, updateDoc, options)
            res.send(result)
        })


     
        app.delete('/delete/:id',async(req,res)=>{
            const id=req.params.id 
            const query={_id:ObjectId(id)}
            const result= await taskCollection.deleteOne(query) 
            res.send(result)
        })
     
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