import React, { useState, useEffect } from "react";
import { Card, Grid, Image, Container, Icon } from "semantic-ui-react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then(res => {
        setAllBooks(res.data);
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  }, []);

  const myCart = book => {
    // Todo : Trouver une solution quand on revient dans accueil et qu'on ajoute un livre ca ne cumule pas
    // ca remplace
    if (Cart) {
      setCart([...Cart, book]);
      localStorage.setItem("myCart", JSON.stringify([...Cart, book]));
    }
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
                    <Card.Description>Auteur : {book.author}</Card.Description>
                    <Card.Description>
                      Publié : {book.publisher}
                    </Card.Description>
                    <Card.Description>Pages : {book.pages}</Card.Description>
                    <Card.Description>{book.price} €</Card.Description>
                    <Icon
                      name="cart arrow down"
                      size="large"
                      onClick={() => myCart(book)}
                    />
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
