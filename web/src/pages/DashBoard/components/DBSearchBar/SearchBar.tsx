
function SearchBar() {
  return (
    <>
      <div className="flex justify-between items-center  bg-gray-200 p-2 shadow-md w-full z-[9999]">
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

       
      </div>
    </>
  );
}

export default SearchBar;
