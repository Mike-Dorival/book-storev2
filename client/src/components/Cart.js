import React, { useState, useEffect } from "react";
import { Card, Grid, Image, Container, Icon } from "semantic-ui-react";

function Cart() {
  const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")));
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")) || 0);
  const [bookQuantity, setBookQuantity] = useState(JSON.parse(localStorage.getItem('bookQuantity')) || [])

  useEffect(() => {
    // Todo Si on ajoute un livre et qu'on revient sur mes achats faut qu'on a l'ensemble du total
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = bookQuantity ? bookQuantity.reduce(reducer) : 0;
    localStorage.setItem("total", total);
    setTotal(total);
  }, []);
  

  const addQuantity = price => {
    setTotal(total + price);
    setBookQuantity([...bookQuantity, price])
    localStorage.setItem("total", parseInt(total + price));
    localStorage.setItem('bookQuantity', JSON.stringify([...bookQuantity, price]))
  };

  const removeQuantity = price => {
    if (total - price < 0) {
      localStorage.setItem(
        "total",
        total - price < 0 ? parseInt(0) : parseInt(total - price)
      );
      return setTotal(0);
    }

    setTotal(total - price);
    localStorage.setItem("total", parseInt(total - price));
    JSON.parse(localStorage.getItem('bookQuantity', [...bookQuantity, bookQuantity.splice(bookQuantity.findIndex(e => e === price), 1)]))
  };

  return (
    <Container>
      <Grid>
        <Grid sm={12}>
          <h1>Total : {total} €</h1>
        </Grid>
        <Grid.Row columns={3}>
          {myCart
            ? myCart.map(book => (
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
                      <Icon
                        name="plus"
                        size="large"
                        onClick={() => addQuantity(book.price)}
                      />
                      <Icon
                        name="minus"
                        size="large"
                        onClick={() => removeQuantity(book.price)}
                      />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            : null}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Cart;
