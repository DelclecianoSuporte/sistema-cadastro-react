// import React, { useEffect, useState } from 'react';
// import { getFuncionarioPorId } from './api';
// import { Funcionario } from './models/funcionario';

// const FuncionarioDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [funcionario, setFuncionario] = useState<Funcionario | null>(null);

//   useEffect(() => {
//     if (id) {
//       loadFuncionario(id);
//     }
//   }, [id]);

//   const loadFuncionario = async (id: string) => {
//     const response = await getFuncionarioPorId(id);
//     setFuncionario(response.data);
//   };

//   if (!funcionario) {
//     return <div>Carregando...</div>;
//   }

//   return (
//     <div>
//       <h1>Detalhes do Funcionário</h1>
//       <p>Nome: {funcionario.nome}</p>
//       <p>CPF: {funcionario.cpf}</p>
//       <p>Profissão: {funcionario.profissao}</p>
//       <p>Idade: {funcionario.idade}</p>
//     </div>
//   );
// };

// export default FuncionarioDetail;
