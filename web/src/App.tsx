import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./pages/Base/Base";
import DashBoard from "./pages/DashBoard/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota-pai base para que o menu lateral fique sempre visivel */}
        <Route element={<Base />}>
        {/* Rotas filhas  */}
          <Route path="/" element={<DashBoard />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/pessoas"  />
          <Route path="/categorias"  />
          <Route path="/transacoes"  />
          <Route path="/login"  />
          {/*  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
