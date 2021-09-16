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
      <h1>Which Poll would you like to view?</h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}
      >
        {Object.entries(Preference).map(([key, value]) => {
          const selected = pollPreference === value;
          return (
            <div
              key={key}
              style={{
                border: "1px dashed blue",
                fontSize: 30,
                fontWeight: "bold",
                margin: "0 10px",
              }}
            >
              <input
                type="hidden"
                id={key}
                value={value}
                defaultChecked={selected}
              />
              <label
                htmlFor={key}
                onClick={() => setPollPreference(value)}
                style={{
                  cursor: "pointer",
                  color:
                    selected && pollPreference === Preference.ANSWERED
                      ? "red"
                      : selected && pollPreference === Preference.NOT_ANSWERED
                      ? "green"
                      : "black",
                  textDecoration: selected ? "underline" : undefined,
                }}
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>

      {!!preferredPoll.length && (
        <PollContainer>
          {preferredPoll.map((poll) => (
            <Link key={poll.id} to={`questions/${poll.id}`}>
              <Poll questionKey={poll.id} />
            </Link>
          ))}
        </PollContainer>
      )}
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
  margin-top: 70px;
`;
