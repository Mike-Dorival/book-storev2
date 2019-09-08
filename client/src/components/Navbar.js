import React, { useState, useEffect } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { A } from "hookrouter";

function Navbar() {
  const [isLoggin, setIsloggin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setIsloggin(true);
    }
  }, [user]);

  const deconnect = () => {
    localStorage.clear();
    setIsloggin(false);
  };

  return (
    <Menu>
      <Container>
        <Menu.Item header>
          <A href="/">Accueil</A>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {isLoggin ? <A href="/cart">Mes achats</A> : null}
          </Menu.Item>
          <Menu.Item name="login">
            {isLoggin ? (
              <h4>Bienvenue {user.userName}</h4>
            ) : (
              <A href="/login">Connexion</A>
            )}
          </Menu.Item>
          <Menu.Item name="register">
            {isLoggin ? (
              <Button onClick={deconnect} primary>
                Deconnexion
              </Button>
            ) : (
              <A href="/register">Inscription</A>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;
