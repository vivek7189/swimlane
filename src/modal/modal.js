import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 500px;
  height: 500px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const ModalButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const Modal = ({ title, onClose, onSave, children }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>{title}</ModalTitle>
        {children}
        <ButtonContainer>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
          <ModalButton onClick={onSave}>Save</ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
