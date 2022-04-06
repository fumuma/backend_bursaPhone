
import express from 'express';
import bodyParser from 'body-parser';
import penitipanRoutes from './routes/penitipan.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/penitipan', penitipanRoutes);

app.get('/', (req, res) => {
    console.log('[TEST]!')
    res.send('Hello World!')
  })


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })