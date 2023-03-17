import 'dotenv/config'
import express from 'express'
import { connectdb } from './database/connectdb.js'
import goalRouter from './router/goals.router.js'
import userRouter from'./router/user.router.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()
connectdb()

const api = "/api/v1"

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(`${api}/goals`, goalRouter)
app.use(`${api}/users`, userRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("http://localhost"+PORT))