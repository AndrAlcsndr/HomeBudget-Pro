import { useEffect, useState } from "react";
import { empty_Guid } from "../../utils/guid";
import { CreatePessoaDto } from "../../interfaces/PessoaDtos/CreatePessoaDto";

interface Props {
  show: boolean;
  pessoa?: CreatePessoaDto;
  onSave: (pessoa: CreatePessoaDto) => void;
  onClose: () => void;
}

function ModalCriarEditarTransacoes({ show, transacao, onSave, onClose }: Props) {
  const [form, setForm] = useState<TransacaoDto>(new CreatePessoaDto());

  const isEdit = form.id !== empty_Guid;

  useEffect(() => {
    if (transacao) {
      setForm(transacao);
    } else {
      setForm(new CreateTransacaoDto());
    }
  }, [transacao, show]);

  

  return (
    <Modal show={show} onHide={onClose} centered>
     
    </Modal>
  );
}

export default ModalCriarEditarTransacoes;
