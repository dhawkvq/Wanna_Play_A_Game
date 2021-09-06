import { FC, useState } from "react";
import { LoginModal, Navbar, Notification, Poll } from "./components";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Home, LeaderBoard, NewPoll } from "./pages";
import { useReduxState } from "./hooks";

export const App: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const { currentUser } = useReduxState((state) => state);

  return (
    <Page>
      <Navbar user={currentUser.id ? currentUser : undefined} />
      {!!errors.length && (
        <Notification errors={errors} onClick={() => setErrors([])} />
      )}
      {!currentUser.id ? (
        <LoginModal setErrors={(messages) => setErrors(messages)} />
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                setErrors={(messages) => setErrors(messages)}
                loggedInUser={currentUser}
              />
            )}
          />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/add" component={NewPoll} />
          <Route
            path="/questions/:question_id"
            render={() => (
              <Poll
                setErrors={(errors) => setErrors(errors)}
                currentUser={currentUser}
              />
            )}
          />
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
