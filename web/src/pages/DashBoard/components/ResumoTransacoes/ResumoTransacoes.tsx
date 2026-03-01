import { Card } from "react-bootstrap";

function ResumoTransacoes() {
  const target = 20000;

  return (
    <Card
      style={{
        width: "22rem",
        borderRadius: "16px",
        padding: "1rem",
      }}
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 style={{ fontWeight: "600" }}>Gastos totais</h4>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          {/* Informações */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <small style={{ color: "#6c757d" }}>Total das Receitas: </small>
              <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>

            <div>
              <small style={{ color: "#6c757d" }}>Total das Despesas: </small>
              <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>
          </div>

          {/* Gauge */}
          <div style={{ width: 120, height: 120 }}>
            <div
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                fontSize: "0.8rem",
                color: "#6c757d",
              }}
            >
              Saldo
              <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                R$ {target.toLocaleString("Pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ResumoTransacoes;
