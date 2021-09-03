import { FC, useState } from "react";
import { LoginModal, Navbar, Notification } from "./components";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Home, LeaderBoard, NewPoll } from "./pages";
import { User } from "./types/User";

export const App: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <Page>
      <Navbar
        loggedIn={!!loggedInUser}
        onLogoutClick={() => setLoggedInUser(null)}
      />
      {!!errors.length && (
        <Notification errors={errors} onClick={() => setErrors([])} />
      )}
      {!loggedInUser ? (
        <LoginModal
          setErrors={(messages) => setErrors(messages)}
          loginUser={(user) => setLoggedInUser(user)}
        />
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                setErrors={(messages) => setErrors(messages)}
                loggedInUser={loggedInUser}
              />
            )}
          />
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
