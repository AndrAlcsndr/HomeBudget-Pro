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
import ModalConfirm from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";
import ModalConfirmarCancelar from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";

function PessoaView() {
  const api = new ApiPessoaService();
  const [rows, setRows] = useState<PessoaDto[]>([]);
  const [openModal, setOpenModal] = useState(false);


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
    </>
  );
}

export default PessoaView;
