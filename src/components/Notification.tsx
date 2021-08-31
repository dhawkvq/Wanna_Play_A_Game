import { FC } from "react";
import styled from "styled-components";

export const Notification: FC<{
  errors?: string[];
  message?: string;
  onClick?(): unknown;
}> = ({ errors, message = "Other Message!", onClick }) => (
  <Container errors={!!errors?.length} onClick={onClick}>
    {!!errors?.length ? (
      <>
        <h1 style={{ textDecoration: "underline" }}>Errors!</h1>
        {errors?.map((error, idx) => (
          <p key={idx}>{error}</p>
        ))}
      </>
    ) : (
      <h1>{message}</h1>
    )}
  </Container>
);

const Container = styled.div<{ errors?: boolean }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.errors ? "red" : "blue")};
  border-radius: 8px;
  color: white;
  padding: 10px 0;
  position: absolute;
  top: 10px;
`;
