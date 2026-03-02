import { useEffect, useState } from "react";
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


  useEffect(() => {
    if (categoria) {
      setForm(categoria);
    } else {
      setForm(new CreateCategoriaDto());
    }
  }, [categoria, show]);




  return (
    <Modal show={show} onHide={onClose} centered>

    </Modal>
  );
}

export default ModalCriarEditarCategoria;
