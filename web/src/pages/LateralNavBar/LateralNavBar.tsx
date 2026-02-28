import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function LateralNavBar() {
  return (
    <div className="d-flex">
      <div
        className="bg-dark d-flex flex-column p-3 text-white"
        
      >
        <h4 className="mb-4">HomeBudgetApp</h4>

        <Nav className="flex-column">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/pessoas">Pessoas</Nav.Link>
            </Nav.Item>
             <Nav.Item>
                <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/">Transações</Nav.Link>
            </Nav.Item>
        
        </Nav>

        <div className="mt-auto">
        </div>
      </div>
    </div>
  );
}

export default LateralNavBar;