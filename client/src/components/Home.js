import React, { useState, useEffect } from "react";
import { Container, Card, Grid, Image, Divider } from "semantic-ui-react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then(res => {
        setAllBooks(res.data.content);
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  }, []);
  return (
    console.log(allBooks),
    (
      <>
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              {allBooks.map(book => (
                <Card
                  key={book.id}
                  className="margin_card"
                  style={{
                    alignItems: "center"
                  }}
                >
                  <Image src={book.imageUrl} />
                  <Card.Content>
                    <Card.Header>{book.author}</Card.Header>
                    <Card.Description>{book.title}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Row>
          </Grid>
        </Container>
      </>
    )
  );
};

export default Home;
