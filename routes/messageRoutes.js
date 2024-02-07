//Adrian Vargas - 101258006
import express from 'express';
const app = express();
import { pm } from '../models/messageModel';

let returnMessageRoutes = function(io) {

app.get('/messages/:room', async (req, res) => {
  const room = req.params.room
  const messages = await pm.find({room : room});
  
  try {
    if(messages.length != 0){
      res.send(messages);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found."}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/messages/latest/:room', async (req, res) => {
  const room = req.params.room
  const messages = await pm.find({room : room}).sort({'created': -1});
  console.log(messages[0])

  try {
    if(messages.length != 0){
      res.send(messages[0]);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found."}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/messages', async (req, res) => {
  let message = new pm(req.body);
  try {
      await message.save((err) => {
        if(err){
              res.send(err)
          }else{
            io.to(message.room).emit('message', message)
            res.send(message);
          }
      });
  } catch (err) {
      res.status(500).send(err);
  }
})
return app
}

module.exports = returnMessageRoutes