"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use("/dist", express_1.default.static('./dist/'));
app.use(express_1.default.static(path.join(__dirname, '../public')));
app.use(express_1.default.static(path.join(__dirname, '../public/css')));
app.use(express_1.default.static(path.join(__dirname, '../public/img')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.get('', (req, res) => {
    res.render('index.ejs', { text: 'This' });
});
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
