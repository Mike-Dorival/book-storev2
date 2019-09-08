import React, { useState } from "react";
import { Container, Input, Button, Form } from "semantic-ui-react";
import axios from "axios";

function Register() {
  const [state, setState] = useState({
    pseudo: "",
    email: "",
    password: ""
  });

  const handleChange = event => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    const { pseudo, email, password } = state;
    if (pseudo && email && password) {
      const user = {
        pseudo: state.pseudo,
        email: state.email,
        password: state.password
      };

      console.log(user);
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/register`, user)
        .then(response => {
          console.log("res", response);
        })
        .catch(error => {
          console.log("Request failed", error);
        });
    } else {
      console.log("probleme dans les champs");
    }
  };

  return (
    <>
      <Container text>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Pseudo</label>
            <Input
              placeholder="Pseudo"
              name="pseudo"
              type="text"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              placeholder="password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Form.Field>
          <Button color="blue" type="submit" onSubmit={handleSubmit}>
            M'inscrire
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
