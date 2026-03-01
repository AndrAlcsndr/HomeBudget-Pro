import { DataGrid } from "@mui/x-data-grid";
import type { PessoaDto } from "../../../interfaces/PessoaDto";

function PessoaListComponent() {
  const pessoasExemplo: PessoaDto[] = [
    {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      nome: "João Silva",
      cpf: "123.456.789-00",
      idade: 30,
      dataCriacaoModificacao: "2026-02-28T18:30:00",
    },
    {
      id: "b12cf1ee-8c54-4a01-90a6-d701748f0123",
      nome: "Maria Souza",
      cpf: "987.654.321-99",
      idade: 25,
      dataCriacaoModificacao: "2026-01-15T10:20:00",
    },
  ];
  const columns: any[] = [
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      editable: true,
    },
    {
      field: "cpf",
      headerName: "CPF",
      width: 150,
      editable: true,
    },
    {
      field: "idade",
      headerName: "Idade",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "dataCriacaoModificacao",
      headerName: "Criado/Modificado",
      type: "dateTime",
      width: 200,
      valueGetter: (params: any) => params.value && new Date(params.value),
    },
  ];

  return (
    <div className="flex">AAA
      <DataGrid
        rows={pessoasExemplo}
        columns={columns}
        pagination
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default PessoaListComponent;
