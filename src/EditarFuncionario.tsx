import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFuncionarioPorId, atualizaFuncionario } from './Api';
import { Funcionario } from './models/funcionario';

const EditarFuncionario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [profissao, setProfissao] = useState<string>("");
  const [idade, setIdade] = useState<number | string>("");

  useEffect(() => {
    if (id) {
      carregaFuncionario(id);
    }
  }, [id]);

  const carregaFuncionario = async (id: string) => {
    const response = await getFuncionarioPorId(id);
    console.log("Dados do funcionário carregados:", response.data); // Verifique os dados aqui
    const funcionario = response.data.data;
    setNome(funcionario.nome || ""); // Valor padrão vazio
    setCpf(funcionario.cpf || ""); // Valor padrão vazio
    setProfissao(funcionario.profissao || ""); // Valor padrão vazio
    setIdade(funcionario.idade || ""); // Valor padrão vazio
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      const funcionarioAtualizado: Funcionario = {
        id,
        nome,
        cpf,
        profissao,
        idade: Number(idade),
      };
      await atualizaFuncionario(id, funcionarioAtualizado);
      navigate('/');
    } else {
      console.error("ID do funcionário não encontrado.");
    }
  };

  return (
    <div>
      <h1>Editar Funcionário</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
          required
        />
        <input
          type="text"
          name="profissao"
          value={profissao}
          onChange={(e) => setProfissao(e.target.value)}
          placeholder="Profissão"
          required
        />
        <input
          type="number"
          name="idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
          required
        />
        <button type="submit">Salvar</button>
      </form>
      <div>
        <button type="button" onClick={() => navigate("/")} style={{ marginTop: "20px" }}>Voltar</button>
      </div>
    </div>
  );
};

export default EditarFuncionario;
