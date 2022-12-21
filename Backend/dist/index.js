"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
const cors = require("cors");
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    port: 6033,
    user: 'db_user',
    password: 'db_user_pass',
    database: 'app_db'
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(cors());
app.get('/', (req, res) => {
    connection.query("SELECT id, title, status FROM tickets", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.get('/:id', (req, res) => {
    req.body.id = Number(req.params.id);
    connection.query("SELECT id, title, status FROM tickets WHERE id = ?", [req.body.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.post('/:id', (req, res) => {
    req.body.id = Number(req.params.id);
    const status = Number(req.body.status);
    const lastStatus = status - 1;
    const nextStatus = status + 1;
    connection.query("UPDATE tickets SET status = ? WHERE id = ? AND (status = ? OR status = ?)", [status, req.body.id, lastStatus, nextStatus], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        if (result.affectedRows === 0) {
            res.status(403).end();
            return;
        }
        res.status(200).json(req.body).end();
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
