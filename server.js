const express = require('express')
const postgres = require('postgres')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'build')))

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

const sql = postgres(DATABASE_URL)

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//Get all from database in id decending order
app.get('/feedback', async(req, res)=>{
    
    try {
        const data = await sql`
        SELECT * FROM feedback
        ORDER BY id DESC
        `
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
    }
    
})

// Posts feedback
app.post('/feedback', async (req, res)=>{
    const {rating, text} = req.body
    try {
        const data = await sql`
        INSERT INTO feedback (rating, text)
        VALUES (${rating}, ${text})


        returning *
        `

        res.status(201).json(data)
    } catch (error) {
        console.log(error);
    }
})

//Updating feedback
app.put('/feedback/:id', async (req,res) =>{
    const id = req.params.id
    const {rating, text} = req.body
    try {
        const data = await sql`
        UPDATE feedback 
        SET text = ${text}, rating = ${rating}
        WHERE id = ${id}
        `
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
})

//deleting feedback
app.delete('/feedback/:id', async(req, res) =>{
    const id = req.params.id
    try {
        await sql`
        DELETE FROM feedback
        WHERE id = ${id}
        `
        res.status(200)
    } catch (error) {
        console.log(error);
    }
})

//Server listening on PORT so it can receive requests
app.listen(PORT, (err)=>{
    if (err){
        console.log(err);
    } 
    console.log(`App listening on port ${PORT}`);
})