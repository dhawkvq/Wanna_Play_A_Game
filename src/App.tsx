import { FC, useState } from "react";
import { LoginModal, Navbar, Notification } from "./components";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Home, LeaderBoard, NewPoll } from "./pages";

export const App: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Page>
      <Navbar loggedIn={loggedIn} onLogoutClick={() => setLoggedIn(false)} />
      {!!errors.length && (
        <Notification errors={errors} onClick={() => setErrors([])} />
      )}
      {!loggedIn ? (
        <LoginModal
          setErrors={(messages) => setErrors(messages)}
          loginUser={(loggedIn) => setLoggedIn(loggedIn)}
        />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/add" component={NewPoll} />
        </Switch>
      )}
    </Page>
  );
};

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
