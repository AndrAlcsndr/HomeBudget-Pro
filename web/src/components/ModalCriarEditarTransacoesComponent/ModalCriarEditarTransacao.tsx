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
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Editar Transação" : "Nova Transação"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Descrição */}
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Tipo */}
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value={0}>Receita</option>
              <option value={1}>Despesa</option>
            </Form.Select>
          </Form.Group>

          {/* Pessoa */}
          <Form.Group className="mb-3">
            <Form.Label>Pessoa</Form.Label>
            <Form.Select
              name="idPessoa"
              value={form.idPessoa ?? ""}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {pessoas.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
     
          {/* Categoria */}
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              name="idCategoria"
              value={form.idCategoria ?? ""}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {camposFinanceiros.map((campo) => (
            <Form.Group className="mb-3" key={campo.name}>
              <Form.Label>{campo.label}</Form.Label>
              <Form.Control
                type="number"
                name={campo.name}
                value={form[campo.name as keyof typeof form]}
                disabled={form.tipo === campo.tipo}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? "Salvar Alterações" : "Criar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCriarEditarTransacoes;
