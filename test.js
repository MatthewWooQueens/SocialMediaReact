import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://rutyreal:' + configuration.MONGO_PASSWORD + '@users.mlxgpdm.mongodb.net/?retryWrites=true&w=majority&appName=Users';
const client = new MongoClient(uri)

(async () => {
    try {
      await client.connect();
      
      const db = client.db('commentdb');
      const users = db.collection('users');
      
      const user = await users.findOne({ email: email });
      if (!user) return callback(null, null);

      if(!bcrypt.compare(password, user.password)) return callback(null, null);

      
      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    } catch(e) {
      return callback(e);
    } finally {
      await client.close();
    }
  })();

    function create(user, callback) {
        const bcrypt = require('bcrypt');
        const MongoClient = require('mongodb@5.1.0').MongoClient;
        const client = new MongoClient('mongodb+srv://rutyreal:' + configuration.MONGO_PASSWORD + '@users.mlxgpdm.mongodb.net/?retryWrites=true&w=majority&appName=Users');
        (async () => {
            try{ 
            await client.connect();
            if (err) return callback(err);
        
            const db = client.db('db-name');
            const users = db.collection('users');
        
            const user = await users.findOne({ email: user.email });
            if (!user) return callback(null, null);
        
            const hash =  bcrypt.hash(user.password, 10);
            if (!h) return callback(null,null);
                    
            user.password = hash;
            users.insert(user);
    
        }catch {
            return callback(e);
        } finally {
            await client.close();
        }
        
        if (err) return callback(err);
        callback(null);
        });       
    }
  
