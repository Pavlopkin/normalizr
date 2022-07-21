const { normalize, denormalize, schema} = require('normalizr')
const util = require('util')

const chats = [
            {
                author: {
                    id: "123@gmail.com",
                    name: "Pablo",
                    apellido: "gomez",
                    edad: "38",
                    alias: "pavlopkin",
                    avatar: "url"
                },
                message: {
                    id: 1,
                    text: "buen dia"
                }
            },
            {
                author: {
                    id: "123@gmail.com",
                    name: "Pablo",
                    apellido: "gomez",
                    edad: "38",
                    alias: "pavlopkin",
                    avatar: "url"
                },
                message: {
                    id: 2,
                    text: "chau"
                }
            },
            {
                author: {
                    id: "356@gmail.com",
                    name: "Juan",
                    apellido: "Hernandez",
                    edad: "31",
                    alias: "JH",
                    avatar: "url"
                },
                message: {
                    id: 3,
                    text: "hola"
                }   
            }
        ]
    
    
const authorSchema = new schema.Entity('author')
const commentSchema = new schema.Entity('text')
const postSchema = new schema.Entity('posts', {
    author: authorSchema,
    text: [commentSchema]
})

const normalizedData = normalize(chats, [postSchema])

print(normalizedData)

function print(obj){
    console.log(util.inspect(obj, false, 12, true))
}

const dataDevuelta = denormalize(
    normalizedData.result,
    postSchema,
    normalizedData.entities
)

print(dataDevuelta)
