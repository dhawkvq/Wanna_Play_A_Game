import { FC } from "react";
import styled from "styled-components";
import { useReduxState } from "../hooks";
import { User } from "../types/User";
import { UserStats } from "../components/UserStats";

export const LeaderBoard: FC = () => {
  const currentUsers = useReduxState(({ allUsers }) => allUsers);

  const getUserTotal = (user: User) => {
    const answerCount = Object.keys(user.answers ?? {}).length;
    const questionCount = user.questions?.length ?? 0;
    return answerCount + questionCount;
  };

  const rankedUsers = Object.entries(currentUsers).sort(
    ([, aUser], [, bUser]) => {
      const userATotal = getUserTotal(aUser);
      const userBTotal = getUserTotal(bUser);
      return userATotal > userBTotal ? -1 : 1;
    }
  );

  return (
    <Board>
      <PageTitle>LeaderBoard</PageTitle>
      <Divider />
      <LeaderBox>
        <TableHeader>
          <TableDescription />
          <TableDescription>Answers</TableDescription>
          <TableDescription>Questions</TableDescription>
        </TableHeader>
        {rankedUsers.map(([key, user], idx) => (
          <UserStats key={key} user={user} place={idx + 1} />
        ))}
      </LeaderBox>
    </Board>
  );
};

const Board = styled.div`
  min-width: 100%;
  flex: 1;
  padding: 110px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  align-self: flex-start;
  margin: 20px 0 5px 30px;
`;

const Divider = styled.div`
  border: 1px solid #8b8b8b;
  width: 95%;
  margin-bottom: 20px;
`;

const LeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const TableHeader = styled.div`
  display: flex;
  flex: 1;
  width: 70%;
  margin-top: 10px;
  align-content: center;
  min-height: 30px;
  font-weight: bold;
`;

const TableDescription = styled.div`
  flex: 1;
`;
