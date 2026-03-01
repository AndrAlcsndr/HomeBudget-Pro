import { Col, Container, Row } from "react-bootstrap";
import ResumoTransacoes from "../ResumoTransacoes/ResumoTransacoes";
import ResumoCategorias from "../ResumoCategorias/ResumoCategorias";
import ResumoPessoa from "../ResumoPessoa/ResumoPessoa";

function ResumoConta() {
  return (
    <>
      <Container className="bg-white p-4 space-y-10 rounded-lg shadow-md mb-6">
        <Row>
         
          <Col md={5}>
           <h4 className="text-2xl font-bold text-[#878787]">
            Informações pessoais
          </h4>

            <ResumoPessoa />
          </Col>

          <Col md={6}>
            <h4 className="text-2xl font-bold text-[#878787]">
              Transações recentes
            </h4>

            <ResumoTransacoes />
          </Col>
        </Row>

        <Row>
          <h4 className="text-2xl font-bold text-[#878787] mb-4">Categorias</h4>
          <ResumoCategorias />
        </Row>
      </Container>
    </>
  );
}

export default ResumoConta;
