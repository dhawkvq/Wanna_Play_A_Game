import { FC, useState } from "react";
import { LoginModal, Notification } from "./components";
import styled from "styled-components";

export const App: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Page>
      {!!errors.length && (
        <Notification errors={errors} onClick={() => setErrors([])} />
      )}
      <LoginModal setErrors={(messages) => setErrors(messages)} />
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
  border: 1px dashed red;
`;
