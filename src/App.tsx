import { FC } from "react";
import { LoginModal, Navbar, Notification, Poll } from "./components";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Home, LeaderBoard, NewPoll, FourOhFour } from "./pages";
import { useAppDispatch, useReduxState } from "./hooks";
import { clearErrors } from "./redux/reducers/errorReducer";
import { PageTitle } from "./components/PageTitle";

export const App: FC = () => {
  const { currentUser, errors } = useReduxState((state) => state);
  const dispatch = useAppDispatch();

  return (
    <Page>
      {!!errors.length && (
        <Notification errors={errors} onClick={() => dispatch(clearErrors())} />
      )}
      {!currentUser.id ? (
        <LoginModal />
      ) : (
        <>
          <Navbar user={currentUser} />
          <PageTitle />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/add" component={NewPoll} />
            <Route path="/questions/:question_id" component={Poll} />
            <Route path="*" component={FourOhFour} />
          </Switch>
        </>
      )}
    </Page>
  );
};

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
