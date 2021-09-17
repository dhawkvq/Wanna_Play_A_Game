import { FC, useState } from "react";
import styled from "styled-components";
import { organizePollsByUser } from "../utils";
import { ValueOf } from "../types/ValueOf";
import { Poll } from "../components";
import { Link } from "react-router-dom";
import { useReduxState } from "../hooks";

enum Preference {
  ANSWERED = "Answered",
  NOT_ANSWERED = "Not Answered",
}

export const Home: FC = () => {
  const [pollPreference, setPollPreference] = useState<ValueOf<Preference>>(
    Preference.NOT_ANSWERED
  );
  const [polls, currentUser] = useReduxState(
    ({ allQuestions, currentUser }) => [allQuestions, currentUser]
  );

  const { answeredPolls, unAnsweredPolls } = organizePollsByUser(
    currentUser.id,
    polls
  );

  const preferredPoll =
    pollPreference === Preference.ANSWERED
      ? answeredPolls
      : pollPreference === Preference.NOT_ANSWERED
      ? unAnsweredPolls
      : [];

  return (
    <HomePage>
      <Container>
        {Object.entries(Preference).map(([key, value]) => {
          const selected = pollPreference === value;
          return (
            <PreferenceBox selected={selected} key={key}>
              <input
                type="hidden"
                id={key}
                value={value}
                defaultChecked={selected}
              />
              <InputLabel
                htmlFor={key}
                onClick={() => setPollPreference(value)}
                selected={selected}
              >
                {value}
              </InputLabel>
            </PreferenceBox>
          );
        })}
      </Container>

      <PollContainer>
        {!!preferredPoll.length ? (
          preferredPoll.map((poll) => (
            <Link key={poll.id} to={`questions/${poll.id}`}>
              <Poll questionKey={poll.id} />
            </Link>
          ))
        ) : (
          <h1>Nothing to see here!</h1>
        )}
      </PollContainer>
    </HomePage>
  );
};

const PollContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: black;
    margin: 0 10px;
  }
`;

const HomePage = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const PreferenceBox = styled.div<{ selected: boolean }>`
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ selected }) => (selected ? "green" : "gray")};
  box-shadow: ${({ selected }) => (selected ? "2px 2px 15px green" : "")};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const InputLabel = styled.label<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "green" : "black")};
`;
