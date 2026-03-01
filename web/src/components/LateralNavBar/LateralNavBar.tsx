import { faArrowRightToBracket, faCashRegister, faTableCellsLarge, faTableList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function LateralNavBar() {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: faTableCellsLarge },
    { name: "Pessoas", path: "/pessoas", icon: faUsers },
    { name: "Categorias", path: "/categorias", icon: faTableList },
    { name: "Transações", path: "/transacoes", icon: faCashRegister},
  ];

  return (
    <>
    {/* Versão expandida do navBar lateral */}
    <div className="d-flex">
      <div className="d-flex flex-column p-3 bg-[#191919] w-[250px] h-full text-white position-fixed">
        <div className="flex flex-center items-center just pb-4 ">
          <h4 className="">HomeBudget</h4>
          <h6 className="pb-6 font-bold">App</h6>
        </div>

        <Nav className="flex-column">
          {/* Mapeamento dos itens do menu */}
          {menuItems.map((item) => (
            <Nav.Item key={item.path}>
              <Nav.Link
                as={Link}
                to={item.path}
                className={`text-white mb-2 space-x-2 flex ${
                  location.pathname === item.path || location.pathname == '' ? "bg-success rounded" : ""
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="items-center flex justify-center mt-auto bg-neutral-800 rounded " >
          <Nav.Link as={Link} to="/login" className="text-white my-2 space-x-2">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <span>Login</span>
          </Nav.Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default LateralNavBar;
