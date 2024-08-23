import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://rutyreal:Robloxian2.0@users.mlxgpdm.mongodb.net/?retryWrites=true&w=majority&appName=Users';

//mongodb+srv://rutyreal:6LqwBMDbebDiDDwV@users.mlxgpdm.mongodb.net/?retryWrites=true&w=majority&appName=Users

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run(){
    try {
        await client.connect();
        await client.db('commentdb').command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);

let db = client.db('commentdb');

export default db;
