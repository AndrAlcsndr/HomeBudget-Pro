import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { empty_Guid } from "../../utils/guid";
import { CreatePessoaDto } from "../../interfaces/PessoaDtos/CreatePessoaDto";
import { maskCPF } from "../../utils/cpfValidator";

interface Props {
  show: boolean;
  pessoa?: CreatePessoaDto;
  onSave: (pessoa: CreatePessoaDto) => void;
  onClose: () => void;
}

function ModalCriarEditarPessoa({ show, pessoa, onSave, onClose }: Props) {
  const [form, setForm] = useState<CreatePessoaDto>(new CreatePessoaDto());

  const isEdit = form.id !== empty_Guid;

  useEffect(() => {
    if (pessoa) {
      setForm(pessoa);
    } else {
      setForm(new CreatePessoaDto());
    }
  }, [pessoa, show]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev: CreatePessoaDto) => ({
      ...prev,
      [e.target.name]: e.target.value,
      [e.target.name]:
        e.target.name === "cpf" ? maskCPF(e.target.value) : e.target.value,
    }));
  }

  function handleSubmit() {
    if (!form.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    if (!form.cpf.trim()) {
      alert("CPF é obrigatório.");
      return;
    }

    onSave(form);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Editar pessoa" : "Criar pessoa"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite o nome da pessoa"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>

            <Form.Control
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Digite o CPF da pessoa"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              type="text"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              placeholder="Digite a idade da pessoa"
            />
          </Form.Group>
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

export default ModalCriarEditarPessoa;
