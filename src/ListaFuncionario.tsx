import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFuncionarios, deletaFuncionario, criaFuncionario } from './Api';
import { Funcionario } from './models/funcionario';
import { v4 as uuidv4 } from 'uuid';

const ListaFuncionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("");
  const [idade, setIdade] = useState<number | string>("");

  useEffect(() => {
    carregaFuncionarios();
  }, []);

  const carregaFuncionarios = async () => {
    const response = await getFuncionarios();
    setFuncionarios(response.data.data);
  };

  const handleDeleta = async (id: string) => {
    await deletaFuncionario(id);
    carregaFuncionarios();
  };

  const cadastraFuncionario = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const novoFuncionario: Funcionario = {
      id: uuidv4(),
      nome,
      cpf,
      profissao,
      idade: Number(idade),
    };
    await criaFuncionario(novoFuncionario);
    carregaFuncionarios();

    setNome("");
    setCpf("");
    setProfissao("");
    setIdade("");
  };

  const houverMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#fff';
    e.currentTarget.style.backgroundColor = '#007bff';
  };

  const retirarMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#007bff';
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <div>
      <h1>Lista de Funcionários</h1>
      <ul>
        {funcionarios.map(funcionario => (
          <li key={funcionario.id}>
            {funcionario.nome} - {funcionario.profissao}
            <button onClick={() => handleDeleta(funcionario.id)}>Excluir</button>
            <Link to={`/editar/${funcionario.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
      <h2>Cadastrar Novo Funcionário</h2>
      <form onSubmit={cadastraFuncionario} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
            style={{ marginBottom: '5px' }}
          />
        </label>

        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            required
            style={{ marginBottom: '5px' }}
          />
        </label>

        <label>
          Profissao:
          <input
            type="text"
            name="profissao"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            placeholder="Profissão"
            required
            style={{ marginBottom: '5px' }}
          />
        </label>

        <label>
          Idade:
          <input
            type="number"
            name="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade"
            required
            min="0"
            style={{ marginBottom: '5px' }}
          />
        </label>
        {/* <button type="submit" style={{ alignSelf: 'center', marginTop: '10px' }}>Cadastrar</button> */}
        
        <button
          type="submit"
          style={{
            alignSelf: 'center',
            marginTop: '10px',
            padding: '0.375rem 0.75rem',
            fontSize: '1rem',
            color: '#007bff',
            backgroundColor: 'transparent',
            border: '1px solid #007bff',
            borderRadius: '0.25rem',
            transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out'
          }}
          onMouseOver={(e) => houverMouse(e)}
          onMouseOut={(e) => retirarMouse(e)}>
          Cadastrar
       </button>

      </form>
    </div>
  );
};

export default ListaFuncionarios;
