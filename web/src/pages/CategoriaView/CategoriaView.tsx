import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ApiCategoriaService } from "../../services/CategoriaService/categoriaService";

import type { CategoriaDto } from "../../interfaces/CategoriaDtos/CategoriaDto";

import DataListComponent from "../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";


function CategoriaView() {
  const [rows, setRows] = useState<CategoriaDto[]>([]);
    const [loading, setLoading] = useState(false);
    const api = new ApiCategoriaService();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await api.getPaged({
            page: 1,
            pageSize: 10,
          });
  
          setRows(result.data ?? ([] as CategoriaDto[]));
        } catch (error) {
          console.error("Erro ao buscar pessoas:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "descricao", headerName: "Descrição", width: 110 },
    { field: "finalidade", headerName: "Finalidade", width: 150 },
    {
      field: "dataCriacaoModificacao",
      headerName: "Data de Modificação",
      width: 200,
      valueFormatter: (params: any) =>
        new Date(params.value).toLocaleString("pt-BR"),
    },
  ];

  return (
    <>
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold ">Categorias</span>
          <Button variant="primary" onClick={() => setLoading(!loading)}>
            +Novo
          </Button>
        </div>

        {loading ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columns} rows={rows} />
        )}
      </div>
    </>
  );
}

export default CategoriaView;