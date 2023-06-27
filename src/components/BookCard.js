import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Card } from "react-bootstrap";
import { db } from "../config";

const BookCard = (props) => {
  const user = useContext(UserContext);

  const [bookName, setBookName] = useState("");

  const [author, setAuthor] = useState("");

  const [theme, setTheme] = useState("");

  useEffect(() => {
    async () => {
      if (!user) return;
      const bookRef = doc(db, "book", props.id);
      const bookSnap = await getDoc(bookRef);
      const bookData = bookSnap.data();
      setBookName(bookData.bookName);
      setAuthor(bookData.author);
      setTheme(bookData.theme);
    };
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{bookName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{theme}</Card.Text>
        <Card.Link href="#">Pregledaj</Card.Link>
        <Card.Link href="#">PDF</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
