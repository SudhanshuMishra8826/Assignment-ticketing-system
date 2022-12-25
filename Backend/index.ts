import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql, { Connection, MysqlError } from 'mysql';
import { Ticket } from './types/ticket';
const cors = require("cors");
dotenv.config();


const db_config ={
    host     : process.env.DB_HOST || 'localhost',
    port : Number(process.env.DB_PORT)||6033,
    user     : process.env.DB_USER||'db_user',
    password : process.env.DB_PASSWORD||'db_user_pass',
    database : process.env.DB||'app_db'
  }
const connection: Connection = mysql.createConnection(db_config);


const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    connection.query("SELECT id, title, status FROM tickets", (err: MysqlError | null, result: Ticket[]) => {
        if (err) {
          console.error(err)
    
          res.status(500).end()
    
          return
        }
    
        res.status(200).json(result).end()
      });
});

app.get('/:id', (req: Request, res: Response) => {
  req.body.id = Number(req.params.id)
  connection.query("SELECT id, title, status FROM tickets WHERE id = ?",[req.body.id], (err: MysqlError | null, result: Ticket[]) => {
      
    if (err) {
        console.error(err)
        res.status(500).end()
        return
      }
  
      res.status(200).json(result).end()
    });
});

app.post('/:id', (req: Request, res: Response) => {
  req.body.id = Number(req.params.id)
  const status = Number(req.body.status)
  const lastStatus = status-1
  const nextStatus = status+1
  connection.query(
    "UPDATE tickets SET status = ? WHERE id = ? AND (status = ? OR status = ?)",
    [status,req.body.id,lastStatus,nextStatus],
    (err: MysqlError | null, result:any) => {
      if (err) {
        console.error(err)
        res.status(500).end()
        return
      }
      if (result.affectedRows === 0) {
        res.status(403).end()
        return
      }
      res.status(200).json(req.body).end()
  });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});