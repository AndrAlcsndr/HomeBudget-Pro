import LateralNavBar from "../../components/LateralNavBar/LateralNavBar";
import { Outlet } from "react-router-dom";
import SearchBar from "../DashBoard/components/DBSearchBar/SearchBar";

function Base() {
  return (
    <>
      <div className="d-flex">
        <LateralNavBar />

        {/* Ajuste de espaçamento para exibição de conteudo */}
        <div className="ml-[250px]"></div>
        <SearchBar />

        <Outlet />
      </div>
    </>
  );
}

export default Base;
