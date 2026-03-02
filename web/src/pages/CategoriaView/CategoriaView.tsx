import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ApiCategoriaService } from "../../services/CategoriaService/categoriaService";
import { empty_Guid } from "../../utils/guid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

import type { UpdateCategoriaDto } from "../../interfaces/CategoriaDtos/UpdateCategoriaDto";
import type { CreateCategoriaDto } from "../../interfaces/CategoriaDtos/CreateCategoriaDto";
import type { CategoriaDto } from "../../interfaces/CategoriaDtos/CategoriaDto";

import DataListComponent from "../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import ModalCriarEditarCategoria from "../../components/ModalCriarEditarCategoriaComponent/ModalCriarEditarCategoria";
import ModalSuccessError from "../../components/ModalSuccessErrorComponent/ModalSuccessErrorComponent";
import ModalConfirmarCancelar from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";
import { formatDate } from "../../utils/formatDate";

function CategoriaView() {
  const api = new ApiCategoriaService();
  const [rows, setRows] = useState<CategoriaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState<
    CreateCategoriaDto | UpdateCategoriaDto
  >();
  const [modalSuccessError, setModalSuccessError] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const fetchData = async () => {
    try {
      const result = await api.getPaged({
        page: 1,
        pageSize: 10,
      });

      setRows([...(result.items ?? [])]);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "descricao", headerName: "Descrição", width: 110 },
    { field: "finalidade", headerName: "Finalidade", width: 150 },
    {
      field: "dataCriacao",
      headerName: "Data da Criação",
      width: 200,
      valueFormatter: (params: any) => formatDate(params),
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
          <div className="flex gap-6 mt-2">
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
              onClick={() => handleDeactivate()}
            >
              <FontAwesomeIcon icon={faUserSlash} />
            </Button>
          </div>
        );
      },
    },
  ];

  const excluirCategoria = async (id: string) => {
    try {
      setLoading(true);

      const result = await api.delete(id);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const addEditaCategoria = async (
    categoria: UpdateCategoriaDto | CreateCategoriaDto,
  ) => {
    try {
      setLoading(true);

      if (categoria.nome.trim() === "") {
        showError("Nome é obrigatório.");
        return;
      }

      if (categoria.descricao.trim() === "") {
        showError("Descrição é obrigatória.");
        return;
      }

      const result =
        categoria.id === empty_Guid
          ? await api.create(categoria as CreateCategoriaDto)
          : await api.update(categoria.id, categoria as UpdateCategoriaDto);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error: any) {
      showError(
        error?.response?.data?.detail ||
          "Erro ao salvar alterações na categoria.",
      );
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleClickModal = () => {
    setCategoriaEdit(undefined);
    setOpenModal(true);
  };

  const handleEdit = (categoria: CreateCategoriaDto | UpdateCategoriaDto) => {
    setCategoriaEdit(JSON.parse(JSON.stringify(categoria)));
    setOpenModal(true);
  };
  const handleDelete = (id: string) => {
    setConfirmModal({ show: true, id });
  };

  const handleDeactivate = () => {};

  const showSuccess = (message: string) => {
    setModalSuccessError({ show: true, type: "success", message });
  };

  const showError = (message: string) => {
    setModalSuccessError({ show: true, type: "error", message });
  };

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
        show={openModal}
        categoria={categoriaEdit}
        onSave={(categoria) => {
          addEditaCategoria(categoria);
        }}
        onClose={() => {
          setOpenModal(false);
          setCategoriaEdit(undefined);
        }}
      />

      <ModalSuccessError
        show={modalSuccessError.show}
        type={modalSuccessError.type}
        message={modalSuccessError.message}
        onClose={() =>
          setModalSuccessError({ ...modalSuccessError, show: false })
        }
      />

      <ModalConfirmarCancelar
        show={confirmModal.show}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta categoria  ?"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => {
          excluirCategoria(confirmModal.id);
          setConfirmModal({ ...confirmModal, show: false });
        }}
        onCancel={() => setConfirmModal({ ...confirmModal, show: false })}
      />
    </>
  );
}

export default CategoriaView;
