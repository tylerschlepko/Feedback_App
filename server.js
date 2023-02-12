const express = require('express')
const postgres = require('postgres')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 5001
const DATABASE_URL = process.env.DATABASE_URL

const sql = postgres(DATABASE_URL)


//Get all from database
app.get('/feedback', async(req, res)=>{
    
    try {
        const data = await sql`
        SELECT * FROM feedback
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
        await sql`
        INSERT INTO feedback (rating, text)
        VALUES (${rating}, ${text})
        `

        res.status(201)
    } catch (error) {
        console.log(error);
    }
})

//Updating feedback
app.put('/feedback/:id', async (req,res) =>{
    const id = req.params.id
    const {rating, text} = req.body
    try {
        sql`
        UPDATE feedback 
        SET text = ${text}, rating = ${rating}
        WHERE id = ${id}
        `
        res.status(200)
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