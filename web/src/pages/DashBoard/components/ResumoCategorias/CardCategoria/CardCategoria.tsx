import { Card } from "react-bootstrap";

function CardCategoria() {
  //Valor mockado para demonstração
  const target = 20000;

  return (
    <Card className="w-[22rem] border-[16px] p-[1rem]">
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 style={{ fontWeight: "600" }}>Categoria nome</h4>
        </div>

       
      </Card.Body>
    </Card>
  );
}

export default CardCategoria;
