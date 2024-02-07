//Adrian Vargas - 101258006
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

let app = express();
let http = require('http').Server(app);
const io = require('socket.io')(http);

const messageRouter = require('./routes/messageRoutes')(io);
const userRouter = require('./routes/userRoutes')(io);

app.use(express.json());
app.use(express.static(__dirname + "/pages"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(userRouter);
app.use(messageRouter)

io.on('connection', (socket) => {
  console.log('User connected.');

  let allRooms = Array.from(socket.rooms)
  console.log(allRooms)
  socket.emit('Rooms', allRooms)
  socket.on('Leave', (room) => {
    socket.leave(room)
    socket.emit('Closed', allRooms)
    console.log("Closing " + room + ".")
  })
  app.set("socket", socket)
})

const uri = "mongodb+srv://admin:password@labtest1.yxidet8.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('MongoDB connected.',err);
    }else{
        console.log('MongoDB connected successfully.');
    }
})

let server = http.listen(3000, () => {
  console.log('Server is running on port', server.address().port);
});