import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv'
import cors from 'cors';
import immoRouter from './routes/immo.js';

dotenv.config();
const app = express();
const dirname = path.resolve();



app.use(helmet());

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));
app.use('/', immoRouter);

app.get('/immos', (req, res) => res.status(200).json(getImmos(req)));
app.get('/immos/:id', (req, res) => {
  const { id } = req.params;
  const immo = getImmo(Number(id));
  if (immo) return res.status(200).json(immo);
  return res.status(404).send('The requested resource was not found');
});

app.delete('/immos', (req, res) => res.status(200).send(delImmos()));

app.delete('/immos/:id', (req, res) => {
  const { id } = req.params;
  if (delImmo(Number(id))) return res.status(200).send('deleted');
  return res.status(404).send('The requested resource was not found');
});


app.get('*', (req, res) =>
  res.status(404).sendFile(path.join(dirname, 'error/404-error.webp')),
);

const PORT = process.env.PORT ?? 5555;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
console.log('Server started');
