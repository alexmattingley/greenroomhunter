import React, { useState, cloneElement } from "react";
import Modal from "@mui/material/Modal";
import { ModalContentContainer } from "./index.styled";

interface ModalProps {
  Trigger: React.ReactElement;
  ModalContent: React.ComponentType;
  ariaLabelby?: string;
  ariaDescribedBy?: string;
}

const CustomModal: React.FC<ModalProps> = ({
  Trigger,
  ModalContent,
  ariaLabelby,
  ariaDescribedBy,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Clone the trigger element and add onClick handler
  const triggerWithHandler = cloneElement(Trigger, {
    onClick: handleOpen,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      {triggerWithHandler}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaLabelby}
        aria-describedby={ariaDescribedBy}
      >
        <ModalContentContainer>
          <ModalContent />
        </ModalContentContainer>
      </Modal>
    </>
  );
};

export default CustomModal;
