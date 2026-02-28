import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function LateralNavBar() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Pessoas", path: "/pessoas" },
    { name: "Categorias", path: "/categorias" },
    { name: "Transações", path: "/transacoes" },
  ];

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-3 bg-[#191919] w-[250px] h-full text-white position-fixed">
        <div className="flex flex-center items-center just pb-4 ">
          <h4 className="">HomeBudget</h4>
          <h6 className="pb-6 font-bold">App</h6>
        </div>

        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav.Item key={item.path}>
              <Nav.Link
                as={Link}
                to={item.path}
                className={`text-white mb-2 ${
                  location.pathname === item.path ? "bg-success rounded" : ""
                }`}
              >
                {item.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="items-center flex justify-center mt-auto bg-neutral-800 rounded" >
          <Nav.Link as={Link} to="/login" className="text-white my-2">
            Login
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default LateralNavBar;
