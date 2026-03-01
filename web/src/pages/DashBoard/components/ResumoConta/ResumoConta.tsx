import { Container, Row } from "react-bootstrap";
import ResumoTransacoes from "../ResumoTransacoes/ResumoTransacoes";

function ResumoConta() {
  return (
    <>
      <Container className="bg-white p-4 space-y-10 rounded-lg shadow-md mb-6">
        <Row>
          <h4 className="text-2xl font-bold text-[#878787] mb-4">Transações</h4>
          <ResumoTransacoes />
        </Row>

        <Row>
          <h4 className="text-2xl font-bold text-[#878787] mb-4">
            Gastos por categoria
          </h4>
        </Row>
      </Container>
    </>
  );
}

export default ResumoConta;
