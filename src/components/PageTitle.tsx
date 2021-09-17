import { FC } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

export const PageTitle: FC = () => {
  const { pathname } = useLocation();
  const getTitle = () => {
    return pathname === "/"
      ? "Polls"
      : pathname === "/add"
      ? "Create Poll"
      : pathname === "/leaderboard"
      ? "Leaderboard"
      : pathname.includes("/questions")
      ? "Poll"
      : "Not Found";
  };
  return (
    <Container>
      <Title>{getTitle()}</Title>
      <Divider />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 110px;
  padding-left: 10px;
`;

const Title = styled.h1`
  align-self: flex-start;
  margin: 20px 0 5px 30px;
`;

const Divider = styled.div`
  border: 1px solid #8b8b8b;
  width: 95%;
  margin-bottom: 20px;
`;
