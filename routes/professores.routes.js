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

router.get('/', listarProfessores);

router.get('/:id', obterProfessorPorId);

router.get('/:id/turmas', listarTurmasPorProfessor);

router.put('/:id', atualizarProfessor);

router.post('/:id/turmas', adicionarTurmaParaProfessor);

router.get('/departamento/:departamento', listarPorDepartamento);

router.delete('/:id', removerProfessor);

export default router;
