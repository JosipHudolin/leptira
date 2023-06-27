import React from "react";
import { Card } from "react-bootstrap";

const BookCard = (props) => {
  return (
    <Card className="my-3 mx-auto">
      <Card.Body>
        <Card.Title>{props.bookName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.author}
        </Card.Subtitle>
        <Card.Text>{props.theme}</Card.Text>
        <Card.Link href="#">Pregledaj</Card.Link>
        <Card.Link href="#">PDF</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
