import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { TipoCategoria } from "../../enums/TipoCategoriaEnum";
import { empty_Guid } from "../../utils/guid";
import { CreateCategoriaDto } from "../../interfaces/CategoriaDtos/CreateCategoriaDto";

interface Props {
  show: boolean;
  categoria?: CreateCategoriaDto;
  onSave: (categoria: CreateCategoriaDto) => void;
  onClose: () => void;
}

function ModalCriarEditarCategoria({
  show,
  categoria,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<CreateCategoriaDto>(
    new CreateCategoriaDto(),
  );

  const isEdit = form.id !== empty_Guid;

  useEffect(() => {
    if (categoria) {
      const key = categoria.finalidade as unknown as keyof typeof TipoCategoria;
      categoria.finalidade = TipoCategoria[key] as unknown as number; 

      setForm(categoria);
    } else {
      setForm(new CreateCategoriaDto());
    }
  }, [categoria, show]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev: CreateCategoriaDto) => ({
      ...prev,
      [name]: name === "finalidade" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    if (!form.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }

    if (!form.descricao.trim()) {
      alert("Descrição é obrigatória.");
      return;
    }

    if (form.descricao.trim().length > 400) {
      alert("Descrição deve ter no máximo 400 caracteres.");
      return;
    }

    onSave(form);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Editar Categoria" : "Criar Categoria"}
        </Modal.Title>
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
              placeholder="Digite o nome da categoria"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Finalidade</Form.Label>
            <Form.Select
              name="finalidade"
              value={form.finalidade}
              onChange={handleChange}
            >
              <option value={TipoCategoria.Despesa}>Despesa</option>
              <option value={TipoCategoria.Receita}>Receita</option>
              <option value={TipoCategoria.Ambas}>Ambas</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição"
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

export default ModalCriarEditarCategoria;
