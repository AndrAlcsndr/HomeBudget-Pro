import { useEffect, useState } from "react";
import { empty_Guid } from "../../utils/guid";

interface Props {
  show: boolean;
  transacao?: CreateTransacaoDto;
  onSave: (transacao: CreateTransacaoDto) => void;
  onClose: () => void;
}

function ModalCriarEditarTransacoes({ show, transacao, onSave, onClose }: Props) {
  const [form, setForm] = useState<TransacaoDto>(new CreateTransacaoDto());

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
