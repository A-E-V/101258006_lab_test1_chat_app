//Adrian Vargas - 101258006
import express from 'express';
const user = require('../models/userModel');
const app = express();

let returnUserRoutes = function(io) {
    io.on('leave', (room) => {
        socket.leave(room)
        socket.emit('Closed')
        console.log("Closing " + room + ".")
    })
      
    app.post('/signin', async (req, res) => {  
        const socket = req.app.get("socket")
        const username = req.body.username
        const password = req.body.password 
        const located_user = await user.findUser({username : username});
        
        if (!located_user) {
            return socket.emit('loginFail', "Incorrect username or password.");
        }
    
        const isPasswordValid = await located_user.validatePassword(password);
    
        if (!isPasswordValid) {
            return socket.emit('loginFail', "Incorrect username or password.");
        }
    
        socket.emit('loginAccepted', located_user.getFullName());
    })

    app.post('/users', async (req, res) => {
        let new_user = new user(req.body);
        try {
            await new_user.save((err) => {
              if(err){
                    res.send(err)
                }else{
                    res.send(new_user);
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.get('/users', async (req, res) => {
        const users = await user.find({})
        try {
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send(err);
        }
    });
    

    return app
}

module.exports = returnUserRoutes