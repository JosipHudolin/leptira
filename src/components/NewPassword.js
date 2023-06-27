import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updatePassword } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";

const NewPassword = ({ modalOpen, setModalOpen }) => {
  const user = useContext(UserContext);

  const { setGlobalError } = useContext(GlobalErrorContext);

  const [password1, setPassword1] = useState("");

  const [password2, setPassword2] = useState("");

  const handleSave = () => {
    if (password1 === password2) {
      const newPassword = password1;

      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          setGlobalError(error.message);
        });
    }
  };

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Nova Lozinka</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nova Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesi lozinku"
                onChange={(e) => setPassword1(e.target.value)}
              />
              <Form.Text className="text-muted">
                Pokušajte zapamtiti novu lozinku
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ponovi lozinku"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Zatvori</Button>
          <Button variant="primary" onClick={handleSave}>
            Promijeni lozinku
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default NewPassword;
