
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
      
    </Modal>
  );
}

export default ModalConfirmarCancelar;