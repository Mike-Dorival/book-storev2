import React, { useState, useEffect } from "react";
import { Card, Grid, Image, Container, Button } from "semantic-ui-react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("myCart")) || []);
  const [bookQuantity, setBookQuantity] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then(res => {
        setAllBooks(res.data);
      })
      .catch(error => {
        console.log("Request failed", error);
      });
      // ici j'ai besoin d'avoir le total des livres issu du catalogue
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;
      // const onlyTotal = cart ? cart.map(book => book.price) : null;
      // const total = onlyTotal ? onlyTotal.reduce(reducer) : 0;
      // localStorage.setItem("total", total); 
      setBookQuantity(cart.map(book => book.price)) 
    }, [cart]); // [cart] equivalent a un componentDidUpdate
    
  useEffect(() => {
      if (JSON.parse(localStorage.getItem("user"))) {
        localStorage.setItem('bookQuantity',JSON.stringify(bookQuantity))
      }
  }, [bookQuantity])

  const addBook = book => {
    setCart([...cart, book]);
    localStorage.setItem("myCart", JSON.stringify([...cart, book]));
  };

  return (
      <>
        <Container>
          <Grid>
            <Grid.Row columns={3}>
              {allBooks.map(book => (
                <Grid.Column key={book.isbn}>
                  <Card className="margin_card">
                    <Image src={book.imgURL} fluid />
                    <Card.Content>
                      <Card.Header>{book.title}</Card.Header>
                      <Card.Description>
                        Auteur : {book.author}
                      </Card.Description>
                      <Card.Description>
                        Publié : {book.publisher}
                      </Card.Description>
                      <Card.Description>Pages : {book.pages}</Card.Description>
                      <Card.Description>{book.price} €</Card.Description>
                      <Button primary onClick={() => addBook(book)}>Ajouter au panier</Button>       
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Container>
      </>
  );
}

export default Home;
