import 'express-async-errors'
import { AppDataSource } from "./data-source"
import express from 'express'
import routes from './routes'
import  cors  from 'cors';


AppDataSource.initialize().then(async () => {
    const app = express()

    app.use(cors());
    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT, () => console.log(`server is rununig in localhost${process.env.PORT}`))

}).catch(error => console.log(error))
