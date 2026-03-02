import { useEffect, useState } from "react";
import { ApiPessoaService } from "../../services/PessoaService/pessoaService";
import { Button } from "react-bootstrap";

import type { CreatePessoaDto } from "../../interfaces/PessoaDtos/CreatePessoaDto";
import type { UpdatePessoaDto } from "../../interfaces/PessoaDtos/UpdatePessoaDto";

import DataListComponent from "../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import ModalCriarEditarPessoa from "../../components/ModalCriarEditarPessoalComponent/ModalCriarEditarPessoa";
import ModalSuccessError from "../../components/ModalSuccessErrorComponent/ModalSuccessErrorComponent";
import { empty_Guid } from "../../utils/guid";
import { isValidCpf, maskCPF, onlyDigits } from "../../utils/cpfValidator";
import type { PessoaDto } from "../../interfaces/PessoaDtos/PessoaDto";
import { formatDate } from "../../utils/formatDate";
import {
  faEdit,
  faTrash,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalConfirmarCancelar from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";

function PessoaView() {
  const api = new ApiPessoaService();
  const [rows, setRows] = useState<PessoaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pessoaEdit, setPessoaEdit] = useState<PessoaDto>();
  const [modalSuccessError, setModalSuccessError] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
  });

  const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "idade", headerName: "Idade", width: 110 },
    {
      field: "cpf",
      headerName: "CPF",
      width: 150,
      valueFormatter: (params: any) => maskCPF(params),
    },
    {
      field: "dataCriacao",
      headerName: "Data de Criação",
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
          <div className="flex gap-6">
            <Button
              className="mt-2"
              size="sm"
              color="warning"
              onClick={() => handleEdit(row)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button
              size="sm"
              className="mt-2"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Button
              size="sm"
              className="mt-2"
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

  const showSuccess = (message: string) => {
    setModalSuccessError({ show: true, type: "success", message });
  };

  const showError = (message: string) => {
    setModalSuccessError({ show: true, type: "error", message });
  };

  const handleEdit = (pessoa: PessoaDto) => {
    setPessoaEdit(pessoa);
    setOpenModal(true);
  };
  const handleDelete = (id: string) => {
    setConfirmModal({ show: true, id });
  };

  const handleDeactivate = (id: string) => {};

  const addEditarPessoas = async (
    pessoa: CreatePessoaDto | UpdatePessoaDto,
  ) => {
    try {
      setLoading(true);

      if (pessoa.nome.trim() === "") {
        showError("Nome é obrigatório.");
        return;
      }

      pessoa.cpf = onlyDigits(pessoa.cpf);
      if (!isValidCpf(pessoa.cpf)) {
        showError("CPF inválido.");
        return;
      }

      const result =
        pessoa.id === empty_Guid
          ? await api.create(pessoa as CreatePessoaDto)
          : await api.update(pessoa.id, pessoa as UpdatePessoaDto);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error: any) {
      showError(
        error?.response?.data?.detail || "Erro ao salvar alterações na pessoa.",
      );
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.getPaged({
        page: 1,
        pageSize: 10,
      });

      setRows([...(result.items ?? [])]);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    } finally {
      setLoading(false);
    }
  };

  const excluirPessoa = async (id: string) => {
    try {
      setLoading(true);

      const result = await api.delete(id);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold ">Pessoas</span>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            +Novo
          </Button>
        </div>

        {loading ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columns} rows={rows} />
        )}
      </div>

      <ModalCriarEditarPessoa
        show={openModal}
        pessoa={pessoaEdit}
        onSave={(pessoa) => {
          addEditarPessoas(pessoa);
        }}
        onClose={() => {
          setOpenModal(false);
          setPessoaEdit(undefined);
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
        message="Tem certeza que deseja excluir esta pessoa?"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => {
          excluirPessoa(confirmModal.id);
          setConfirmModal({ ...confirmModal, show: false });
        }}
        onCancel={() => setConfirmModal({ ...confirmModal, show: false })}
      />
    </>
  );
}

export default PessoaView;
