import express from 'express'
import { NODE_ENV, port } from '../config/config.js'
import { connectDB } from './DB/connection.js'
import { authRouter } from './modules/auth/index.js'
import { userRouter } from './modules/users/index.js'
import { noteRouter } from './modules/notes/index.js'

 async function bootstrap() {
    const app = express()
    //convert buffer data
    app.use(express.json())
    await connectDB()
    //application routing
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/', authRouter)
    app.use('/users', userRouter)
    app.use('/notes', noteRouter)


    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error_message:error.message,
                // status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
            stack: NODE_ENV == "development" ? error.stack : undefined
        })
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap