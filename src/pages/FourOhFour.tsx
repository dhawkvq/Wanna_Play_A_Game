import { FC } from "react";
import styled from "styled-components";

export const FourOhFour: FC = () => {
  return (
    <NotFound>
      <Flexer>
        <h1>404!</h1>
        <p>🙅‍♀️</p>
      </Flexer>
    </NotFound>
  );
};

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
`;

const Flexer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 80px;
    margin: 0;
  }
`;
