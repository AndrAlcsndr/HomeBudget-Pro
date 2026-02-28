import { Nav } from "react-bootstrap";
import { Link, } from "react-router-dom";

function LateralNavBar() {
  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column p-3 bg-[#191919] w-[250px] h-full text-white position-fixed">
        <h4 className="mb-4">HomeBudgetApp</h4>

        <Nav className="flex-column">
          
        </Nav>

        <div className="mt-auto">
          <Nav.Link
            as={Link}
            to="/logout"
            className="text-white mt-4"
          >
            Login
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default LateralNavBar;