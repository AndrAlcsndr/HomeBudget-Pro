import { Card } from "react-bootstrap";

function ResumoPessoa() {
    // Valor mockado para demonstração
  const target = 20000;

  return (
    <Card
     className="w-[22rem] border-[16px] p-[1rem]"
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="font-bold">Nome</h4>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          {/* Informações */}
          <div>
            <div className="mb-2">
              <small className="text-[#6c757d]">Idade: </small>
              <div className="font-bold text-[1.1rem]">
                  R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>

            <div>
              <small className="text-[#6c757d]">CPF: </small>
              <div className="font-bold text-[1.1rem]">
                R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="w-[120px] h-[120px]">
            <div
              className="text-center mt-2 text-[0.8rem] text-[#6c757d]"
            >
              <div className="font-bold text-[1.1rem]">
                R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ResumoPessoa;
