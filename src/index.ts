import "reflect-metadata"
import {createConnection} from "typeorm"
import express from 'express'
import cors from "cors"
import Routes from './routes'

const app = express();
createConnection();

app.use(express.json());
app.use(cors())
app.use(Routes);

app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}!!`)
})



