
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

}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      
    </Modal>
  );
}

export default ModalConfirmarCancelar;