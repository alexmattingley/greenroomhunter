import React from "react";
import Modal from "@mui/material/Modal";
import { ModalContentContainer } from "./index.styled";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  ModalContent: React.ComponentType;
  ariaLabelby?: string;
  ariaDescribedBy?: string;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  ModalContent,
  ariaLabelby,
  ariaDescribedBy,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelby}
      aria-describedby={ariaDescribedBy}
    >
      <ModalContentContainer>
        <ModalContent />
      </ModalContentContainer>
    </Modal>
  );
};

export default CustomModal;

