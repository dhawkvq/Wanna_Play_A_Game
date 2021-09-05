import { FC, useEffect, useState, useCallback } from "react";
import { QuestionsDb, _getQuestions } from "../DB/_DATA";
import { User } from "../types/User";
import styled from "styled-components";
import { organizePollsByUser } from "../utils";
import { ValueOf } from "../types/ValueOf";
import { Loading } from "../components";
import { Link } from "react-router-dom";

enum Preference {
  ANSWERED = "Answered",
  NOT_ANSWERED = "Not Answered",
  NONE = "None",
}

type ValueOfPreference = ValueOf<Preference>;

export const Home: FC<{
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  loggedInUser: User;
}> = ({ setErrors, loggedInUser }) => {
  const [polls, setPolls] = useState<QuestionsDb>({});
  const [loading, setLoading] = useState(false);
  const [pollPreference, setPollPreference] = useState<ValueOfPreference>(
    Preference.NOT_ANSWERED
  );

  const getPolls = useCallback(async () => {
    try {
      setLoading(true);
      const polls = await _getQuestions();
      setPolls(polls);
    } catch (error) {
      const newError = error as Error;
      setErrors((curErrors) => [...curErrors, newError.message]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setErrors]);

  useEffect(() => {
    getPolls();
  }, [getPolls]);

  const { answeredPolls, unAnsweredPolls } = organizePollsByUser(
    loggedInUser.id,
    polls
  );

  const preferredPoll =
    pollPreference === Preference.ANSWERED
      ? answeredPolls
      : pollPreference === Preference.NOT_ANSWERED
      ? unAnsweredPolls
      : [];

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        marginTop: 70,
      }}
    >
      <h1>Which Poll would you like to view?</h1>
      {Object.entries(Preference).map(([key, value]) => {
        return (
          <div key={key}>
            <input
              type="radio"
              id={key}
              value={value}
              onChange={(e) => setPollPreference(e.currentTarget.value)}
              checked={pollPreference === value}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        );
      })}
      {loading ? (
        <Loading />
      ) : (
        <>
          {!!preferredPoll.length ? (
            <PollContainer>
              <h1>{pollPreference}</h1>
              {preferredPoll.map((poll) => (
                <Link key={poll.id} to={`questions/${poll.id}`}>
                  <div>
                    <h3>{poll.id}</h3>
                    <p>{new Date(poll.timestamp).toISOString()}</p>
                  </div>
                </Link>
              ))}
            </PollContainer>
          ) : (
            <h1>Nothing to see here</h1>
          )}
        </>
      )}
    </div>
  );
};

const PollContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
