import React, { useState } from "react";
import { Container, Input, Button, Form } from "semantic-ui-react";
import axios from "axios";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    const { email, password } = state;
    if (email && password) {
      const user = {
        email: state.email,
        password: state.password
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, user)
        .then(response => {
          console.log("res", response);
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            alert("Vous êtes connecté");
            window.location.href = "http://localhost:3000/"; // en attendant une meilleur redirection
          }
        })
        .catch(error => {
          console.log("Request failed", error.response);
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
            <label>Email</label>
            <Input
              icon="user"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              icon="lock"
              iconPosition="left"
              placeholder="password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Form.Field>
          <Button color="blue" type="submit" onSubmit={handleSubmit}>
            Se connecter
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
