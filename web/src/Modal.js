import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const InfoModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <a id="modal" onClick={toggle}>소개</a>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            부산대학교 2020 전기 졸업과제 - GAN을 활용한 페이스 체인지
        </ModalHeader>
        <ModalBody>
            <p>GAN을 활용한 페이스 체인지</p>
        </ModalBody>
        <ModalFooter>
            부산대학교 정보컴퓨터공학부<br></br>
            201524462 박세범<br></br>
            201524499 안형진<br></br>
            201624444 이동현<br></br>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InfoModal;