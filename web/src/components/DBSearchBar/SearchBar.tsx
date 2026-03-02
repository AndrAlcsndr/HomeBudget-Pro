import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function SearchBar() {
  return (
    <>
      <div className="flex justify-between items-center  bg-gray-200 p-2 shadow-md w-full">
        {/* Exibição de data atual */}
        <h6 className="text-[#525256] font-semibold pt-2">
          {" "}
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h6>

        <div className="w-1/3 flex items-center justify-center">
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-0">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </InputGroup.Text>

            <Form.Control
              placeholder="Search"
              aria-label="search"
              className="text-start rounded-lg border-0 shadow-sm"
            />

            <Button variant="light">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputGroup>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
