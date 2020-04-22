#!/usr/bin/env node
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import { PORT } from './env';

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())

app.all('/', (req, res) => res.send('API ROOT'))

app.all(['/echo', '/echo/:route'], (req, res) => {
    res.send({
        params: req.params,
        body: req.body,
    })
})

app.all('*', (req, res) => res.send(404))

app.listen(PORT, () => console.log(`Servidor inciado na porta ${PORT} (http://localhost:${PORT}/)`))
    

export default app
