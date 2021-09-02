import { FC, useState } from "react";
import { LoginModal, Navbar, Notification } from "./components";
import styled from "styled-components";

export const App: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Page>
      <Navbar loggedIn={loggedIn} onLogoutClick={() => setLoggedIn(false)} />
      {!loggedIn ? (
        <>
          {!!errors.length && (
            <Notification errors={errors} onClick={() => setErrors([])} />
          )}
          <LoginModal
            setErrors={(messages) => setErrors(messages)}
            loginUser={(loggedIn) => setLoggedIn(loggedIn)}
          />
        </>
      ) : (
        <div>A Different Page!</div>
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
