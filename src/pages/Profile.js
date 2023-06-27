import React, { useState, useEffect, useContext } from "react";
import { Container, Card, InputGroup, Form, Button } from "react-bootstrap";
import { data as fakeData } from "../data/books";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config";
import { UserContext } from "../contexts/UserContext";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

const Profile = () => {
  const [data, setData] = useState({});

  const [name, setName] = useState("");

  const [surname, setSurname] = useState("");

  const [grade, setGrade] = useState();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const user = useContext(UserContext);

  const [editable, setEditable] = useState(false);

  const [error, setError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const userRef = doc(db, "user", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      console.log(userData);
      setName(userData.name);
      setSurname(userData.surname);
      setGrade(userData.grade);
      setEmail(auth.currentUser.email);
    })();
  }, [user]);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 10 * 1000);
  }, [error]);

  const handleClick = async (e) => {
    if (editable) {
      if (!user) return;
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, {
        grade,
        name,
        surname,
      });
      updateEmail(auth.currentUser, email)
        .then(() => {})
        .catch((error) => {});
    }

    setEditable(!editable);
  };

  useEffect(() => {
    setData(fakeData);
  }, []);

  return (
    <Container>
      <h1 className="text-center mb-3">Moj profil</h1>
      <Card className="mx-auto" style={{ width: "18rem" }}>
        <Card.Header className="text-center">
          <p>Podaci</p>
        </Card.Header>

        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Ime
            </InputGroup.Text>
            <Form.Control
              value={name}
              aria-label="Ime"
              aria-describedby="inputGroup-sizing-default"
              disabled={!editable}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Prezime
            </InputGroup.Text>
            <Form.Control
              value={surname}
              aria-label="Prezime"
              aria-describedby="inputGroup-sizing-default"
              disabled={!editable}
              onChange={(e) => setSurname(e.target.value)}
            />
          </InputGroup>
          <Form.Label id="inputGroup-sizing-default">Razred</Form.Label>
          <Form.Select
            value={grade}
            className="mb-3"
            aria-label="Default select example"
            onChange={(e) => setGrade(e.target.value)}
            disabled={!editable}
          >
            <option>Odaberi razred</option>
            {data &&
              Object.keys(data).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
          </Form.Select>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              E-mail
            </InputGroup.Text>
            <Form.Control
              value={email}
              type="email"
              aria-label="E-mail"
              aria-describedby="inputGroup-sizing-default"
              disabled={!editable}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>
      <Button variant="primary" onClick={handleClick} className="mx-auto mt-3">
        {editable ? "Spremi" : "Izmijeni"}
      </Button>
    </Container>
  );
};

export default Profile;