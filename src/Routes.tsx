import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditarFuncionario from './EditarFuncionario';
import ListaFuncionarios from './ListaFuncionario';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaFuncionarios />} />
        <Route path="/editar/:id" element={<EditarFuncionario />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
