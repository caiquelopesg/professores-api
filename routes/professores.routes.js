import { Router } from 'express';
import {
  listarProfessores,
  obterProfessorPorId,
  listarTurmasPorProfessor,
  atualizarProfessor,
  adicionarTurmaParaProfessor,
  listarPorDepartamento,
  removerProfessor
} from '../controllers/professores.controller.js';

const router = Router();

// (1) Listar todos os professores
router.get('/', listarProfessores);

// (2) Buscar um professor por ID
router.get('/:id', obterProfessorPorId);

// (3) Listar todas as turmas de um professor
router.get('/:id/turmas', listarTurmasPorProfessor);

// (4) Atualizar dados de um professor
router.put('/:id', atualizarProfessor);

// (5) Adicionar uma turma para um professor
router.post('/:id/turmas', adicionarTurmaParaProfessor);

// (6) Listar professores por departamento
router.get('/departamento/:departamento', listarPorDepartamento);

// (7) Remover um professor
router.delete('/:id', removerProfessor);

export default router;
