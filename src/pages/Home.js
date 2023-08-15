import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import BookCard from "../components/BookCard";
import { getAllBooks } from "../server";

const Home = () => {
  const [books, setBooks] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.uid) return;

    (async () => {
      try {
        const booksRef = collection(db, "book");
        const q = query(booksRef, where("user", "==", user.uid));
        const booksSnap = await getDocs(q);

        let tempBooks = [];
        booksSnap.forEach((doc) =>
          tempBooks.push({ id: doc.id, ...doc.data() })
        );
        setBooks(tempBooks);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const books = await getAllBooks();
      console.log(books);
    })();
  }, []);

  return (
    <Container>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </Container>
  );
};

export default Home;
