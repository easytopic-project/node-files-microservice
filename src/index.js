#!/usr/bin/env node
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import { PORT, FILES_PATH } from './env';
import fileUpload from 'express-fileupload'
import { extension } from "mime-types";
import { unlink } from "fs";

const uploadMiddleware = fileUpload({
    debug: process.env.NODE_ENV !== 'production',
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
    // useTempFiles: true,
    // tempFileDir: FILES_PATH
})


const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())

app.all('/', (req, res) => res.send('API ROOT'))

app.post('/files', uploadMiddleware, async ({ files: { file } }, res) => {
    const { size, mimetype, md5 } = file
    const name = `${(new Date()).getTime()}.${extension(mimetype)}`
    await file.mv(`${FILES_PATH}/${name}`)
    res.send({ name, size, mimetype, md5 })
})

app.delete('/files/:file', (req, res) => {
    unlink(`${FILES_PATH}/${req.params.file}`, (err) => {
        console.error(err)
        if(err && err.code === 'ENOENT')
            return res.send(404)
        res.send({deleted: !err})
    })

})

app.use('/files', express.static(FILES_PATH))


app.all(['/echo', '/echo/:route'], (req, res) => {
    res.send({
        params: req.params,
        body: req.body,
    })
})

app.all('*', (req, res) => res.send(404))

app.listen(PORT, () => console.log(`Servidor inciado na porta ${PORT} ( http://localhost:${PORT}/ ). Arquivos armazenados em ${FILES_PATH}`))


export default app
