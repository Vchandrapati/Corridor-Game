import express, { Express, Request, Response } from 'express';
const path = require("path");
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/dist", express.static('./dist/'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/css')));
app.use(express.static(path.join(__dirname, '../public/img')));                  

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs')

app.get('', (req: Request, res: Response) => {
  res.render('index.ejs', {text: 'This'});
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));