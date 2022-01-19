import express from "express";
import { routes } from "./routes.js";
import bodyParser from "body-parser";
import cors from 'cors';


const PORT = 3000;
const HOSTNAME = 'localhost';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
routes(app);


app.listen(PORT, HOSTNAME, () => {
    console.log('movies api server online in http://' + HOSTNAME + ':' + PORT);
})
