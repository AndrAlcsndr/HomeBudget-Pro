import { useEffect, useState } from "react";
import { empty_Guid } from "../../utils/guid";

interface Props {
  show: boolean;
  transacao?: CreateTransacaoDto;
  onSave: (transacao: CreateTransacaoDto) => void;
  onClose: () => void;
}

function ModalCriarEditarTransacoes({
  show,
  transacao,
  pessoas,
  categorias,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<CreateTransacaoDto>(
    new CreateTransacaoDto(),
  );

  const camposFinanceiros = [
    {
      label: "Receitas",
      name: "receitas",
      tipo: TipoTransacao.Receita,
    },
    {
      label: "Despesas",
      name: "despesas",
      tipo: TipoTransacao.Despesa,
    },
  ];

  const isEdit = form.id !== empty_Guid;

  useEffect(() => {
    if (transacao) {
      setForm(transacao);
    } else {
      setForm(new CreateTransacaoDto());
    }
  }, [transacao, show]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
  
    setForm((prev) => ({
    ...prev,
    [name]:
      name === "tipo"
        ? Number(value)
        : name === "receitas" || name === "despesas"
        ? Number(value)
        : value,
  }));
  }

  function handleSubmit() {
    onSave({
      ...form,
    });
  }

  return (
    <Modal show={show} onHide={onClose} centered>
     
    </Modal>
  );
}

export default ModalCriarEditarTransacoes;
