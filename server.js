const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const fs = require('fs')
const {normalize, denormalize, schema} = require('normalizr')
const util = require('util');

const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer)

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))


//arreglo donde se guardan los mensajes del chat//
const chats = []
//arreglo donde se guardan los productos//
const messages = [
    {
      title: "Campera Gore Tex",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/gore.png",
      price:25000,
    },
    {
      title: "Puffy Shirt",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/puffy.png",
      price: 60000,
    },
    {
      title: "Bolígrafo anti gravedad",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/boligrafo.png",
      price: 1500,
    },
    {
      title: "Jimmy's Shoes",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/shoes.png",
      price: 13000,
    },
    {
      title: "Fusilli Jerry",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/fusilli.png",
      price: 1200,
    },
    {
      title: "The coffee table booky",
      thumbnail: "https://pavlopkin.github.io/Art-Vandelay/assets/bookof.png",
      price: 3500,
    },
];

app.get('/', (req, res)=>{
  res.render('desafio/index', { messages })
})


io.on('connection', (socket) => {
    console.log('user conetado, id: ' +  socket.id)
    socket.emit('messages', messages); 

    socket.on('new-message', (newMessage) => {
        console.log({newMessage});
        messages.push(newMessage);
        io.sockets.emit('messages', messages)
        })

    socket.emit('chats', chats);
   
    socket.on('new-chat', (newChats) => {  
        chats.push(newChats);
        io.sockets.emit('chats', chats)

        function print(obj) {
          console.log(util.inspect(obj, true, 12, true));
        }
        const authorSchema = new schema.Entity('author')
        const commentSchema = new schema.Entity('text')
        const postSchema = new schema.Entity('posts',{
          author: authorSchema,
          messages: [commentSchema]
        })  
        
        const dataNormalized = normalize(chats, postSchema)
        print(dataNormalized)   

    })
});


        



httpServer.listen(3000, ()=> console.log('server running...'))

