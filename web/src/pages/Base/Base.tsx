import LateralNavBar from "../../components/LateralNavBar/LateralNavBar";
import { Outlet } from "react-router-dom";
import SearchBar from "../../components/DBSearchBar/SearchBar";

function Base() {
  return (
    <div className="flex">
      {/* Sidebar fixa */}
      <LateralNavBar />

      {/* Área principal */}
      <div className="ml-[250px] flex flex-col w-full min-h-screen bg-gray-100">
        
        {/* Topo */}
        <SearchBar />

        {/* Conteúdo */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Base;