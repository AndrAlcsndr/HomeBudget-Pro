import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

function ModalSuccessError({ show, type, message, onClose }: Props) {
  const isSuccess = type === "success";

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="text-center py-4">
        <div className="mb-3 flex justify-center">
          {isSuccess ? (
            <FontAwesomeIcon icon={faCheckCircle} size='2xl' className="text-green-500" />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} size='2xl' className="text-red-500" />
          )}
        </div>

        <h4 className={`mb-3 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {isSuccess ? "Sucesso!" : "Erro!"}
        </h4>

        <p className="text-gray-600">{message}</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button
          variant={isSuccess ? "success" : "danger"}
          onClick={onClose}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSuccessError;