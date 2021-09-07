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
        <LoginModal />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/add" component={NewPoll} />
          <Route path="/questions/:question_id" component={Poll} />
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
