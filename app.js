import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import professoresRouter from './routes/professores.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Professores ativa',
    rotas: [
      'GET /professores',
      'GET /professores/:id',
      'GET /professores/:id/turmas',
      'PUT /professores/:id',
      'POST /professores/:id/turmas',
      'GET /professores/departamento/:departamento',
      'DELETE /professores/:id'
    ]
  });
});

app.use('/professores', professoresRouter);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

export default app;
