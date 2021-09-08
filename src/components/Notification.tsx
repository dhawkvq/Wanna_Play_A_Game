import { FC } from "react";
import styled from "styled-components";

export const Notification: FC<{
  errors?: string[];
  message?: string;
  onClick?(): unknown;
}> = ({ errors, message = "Other Message!", onClick }) => {
  return (
    <Container errors={!!errors?.length} onClick={onClick}>
      {!!errors?.length ? (
        <>
          <Error>Errors!</Error>
          {errors?.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </>
      ) : (
        <h1>{message}</h1>
      )}
    </Container>
  );
};

const Container = styled.div<{ errors?: boolean }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid;
  border-color: ${({ errors }) => (errors ? "red" : "green")};
  border-radius: 8px;
  box-shadow: 2px 5px 15px ${({ errors }) => (errors ? "red" : "green")};
  color: #636363;
  padding: 10px 0;
  position: absolute;
  top: 10px;
  cursor: pointer;
`;

const Error = styled.h1`
  text-decoration: underline;
`;
