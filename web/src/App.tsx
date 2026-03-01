import { BrowserRouter, Routes, Route } from "react-router-dom";

import Base from "./pages/Base/Base";
import DashBoard from "./pages/DashBoard/DashBoardView";
import PessoaView from "./pages/PessoaView/PessoaView";
import CategoriaView from "./pages/CategoriaView/CategoriaView";
import TransacaoView from "./pages/TransacaoView/TransacaoView";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota-pai base para que o menu lateral fique sempre visivel */}
        <Route element={<Base />}>
        {/* Rotas filhas  */}
          <Route path="/" element={<DashBoard />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/pessoas" element={<PessoaView />} />
          <Route path="/categorias" element={<CategoriaView />} />
          <Route path="/transacoes" element={<TransacaoView />} />
          <Route path="/login" element={<DashBoard />} />
          {/*  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
