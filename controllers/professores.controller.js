import { professores } from '../data/professores.js';

function findProfessorIndexById(id) {
  return professores.findIndex((p) => p.id === id);
}

export function listarProfessores(req, res) {
  res.json(professores);
}

export function obterProfessorPorId(req, res) {
  const { id } = req.params;
  const professor = professores.find((p) => p.id === id);
  if (!professor) return res.status(404).json({ erro: 'Id não existente' });
  res.json(professor);
}

export function listarTurmasPorProfessor(req, res) {
  const { id } = req.params;
  const professor = professores.find((p) => p.id === id);
  if (!professor) return res.status(404).json({ erro: 'Id não existente' });
  res.json(professor.turmas || []);
}

export function atualizarProfessor(req, res) {
  const { id } = req.params;
  const idx = findProfessorIndexById(id);
  if (idx === -1) return res.status(404).json({ erro: 'Id não existente' });

  const { nome, idade, departamento } = req.body;

  if (nome !== undefined) professores[idx].nome = nome;
  if (idade !== undefined) professores[idx].idade = idade;
  if (departamento !== undefined) professores[idx].departamento = departamento;

  res.json({ mensagem: 'Professor atualizado com sucesso', professor: professores[idx] });
}

export function adicionarTurmaParaProfessor(req, res) {
  const { id } = req.params;
  const professor = professores.find((p) => p.id === id);
  if (!professor) return res.status(404).json({ erro: 'Id não existente' });

  const { codigo, disciplina, alunos } = req.body;
  if (!codigo || !disciplina || !Array.isArray(alunos)) {
    return res.status(400).json({ erro: 'Informe codigo, disciplina e alunos (array)' });
  }

  const existe = (professor.turmas || []).some((t) => t.codigo === codigo);
  if (existe) {
    return res.status(409).json({ erro: 'Já existe uma turma com este código para este professor' });
  }

  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas = professor.turmas || [];
  professor.turmas.push(novaTurma);

  res.status(201).json({ mensagem: 'Turma adicionada com sucesso', turma: novaTurma, professor });
}

export function listarPorDepartamento(req, res) {
  const { departamento } = req.params;
  const filtrados = professores.filter(
    (p) => (p.departamento || '').toLowerCase() === decodeURIComponent(departamento).toLowerCase()
  );
  res.json(filtrados);
}

export function removerProfessor(req, res) {
  const { id } = req.params;
  const idx = findProfessorIndexById(id);
  if (idx === -1) return res.status(404).json({ erro: 'Id não existente' });

  const removido = professores.splice(idx, 1)[0];
  res.json({ mensagem: 'Professor removido com sucesso', professor: removido });
}
