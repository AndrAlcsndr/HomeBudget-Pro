import LateralNavBar from "../../components/LateralNavBar/LateralNavBar";
import { Outlet } from "react-router-dom";


function Base() {
  return (
    <>
    <div className="d-flex" >
       <LateralNavBar />
       {/* Ajuste de espaçamento para exibição de conteudo */}
       <div className="ml-[250px] p-[10px]"></div>
       <Outlet />
    </div>
    </>
  ) 
}

export default Base;