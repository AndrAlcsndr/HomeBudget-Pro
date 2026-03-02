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
      
    </Modal>
  );
}

export default ModalSuccessError;