import { Modal, Button } from "react-bootstrap";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  show: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalConfirmarCancelar({
  show,
  title = "Confirmar ação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body className="text-center py-4">
        <div className="mb-3 flex justify-center text-warning">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="2xl"
            className="text-yellow-500"
          />
        </div>

        <h4 className="mb-3">{title}</h4>

        <p className="text-gray-600">{message}</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center gap-2">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmarCancelar;