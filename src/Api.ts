import axios from 'axios';
import { Funcionario } from './models/funcionario';

const api = axios.create({
  baseURL: 'https://localhost:7031/api',
});

export const getFuncionarios = () => {
  return api.get('/funcionario');
};

export const getFuncionarioPorId = (id: string) => {
  return api.get(`/funcionario/${id}`);
};

export const criaFuncionario = (funcionario: Funcionario) => {
  return api.post('/funcionario', funcionario);
};

export const atualizaFuncionario = (id: string, funcionario: Funcionario) => {
  return api.put(`/funcionario/${id}`, funcionario);
};

export const deletaFuncionario = (id: string) => {
  return api.delete(`/funcionario/${id}`);
};
