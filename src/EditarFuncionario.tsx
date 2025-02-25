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
    console.log("Dados do funcionário carregados:", response.data); 
    const funcionario = response.data.data;
    setNome(funcionario.nome || ""); 
    setCpf(funcionario.cpf || ""); 
    setProfissao(funcionario.profissao || ""); 
    setIdade(funcionario.idade || ""); 
  };

  const houverMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.backgroundColor = '#007bff';
    };
  
    const retirarMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.color = '#007bff';
      e.currentTarget.style.backgroundColor = 'transparent';
    };

  const atualizaInformacoes = async (event: React.FormEvent<HTMLFormElement>) => {
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
    } 
    else {
      console.error("ID do funcionário não encontrado.");
    }
  };

  return (
    <div>
      <h1>Editar Funcionário</h1>
      <form onSubmit={atualizaInformacoes} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
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
      
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
            Salvar
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/")}
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
            Voltar 
          </button>
        </div>
      
      </form>
    </div>
  );
};

export default EditarFuncionario;
