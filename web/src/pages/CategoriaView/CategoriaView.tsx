import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ApiCategoriaService } from "../../services/CategoriaService/categoriaService";

import type { CategoriaDto } from "../../interfaces/CategoriaDtos/CategoriaDto";

import DataListComponent from "../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import ModalCriarEditarCategoria from "../../components/ModalCriarEditarCategoriaComponent/ModalCriarEditarCategoria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

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
    {
      field: "acoes",
      headerName: "Ações",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="sm" color="warning" onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button
              size="sm"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Button
              size="sm"
              color="secondary"
              onClick={() => handleDeactivate(row.id)}
            >
              <FontAwesomeIcon icon={faUserSlash} />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleClickModal = () => {};
    const handleEdit = (categoria: CategoriaDto) =>  {}
    const handleDelete = (id: string) => {}
    const handleDeactivate = (id: string) => {}

  return (
    <>
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold ">Categorias</span>
          <Button variant="primary" onClick={() => handleClickModal()}>
            +Novo
          </Button>
        </div>

        {loading ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columns} rows={rows} />
        )}
      </div>
      <ModalCriarEditarCategoria
        show={true}
        onSave={() => {}}
        onClose={() => {}}
      />
    </>
  );
}

export default CategoriaView;