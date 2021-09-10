import { FC } from "react";
import { useReduxState } from "../hooks";
import { User } from "../types/User";

/**
    The Leaderboard is available at/leaderboard.
    Each entry on the leaderboard contains the following:
    the user’s name;
    the user’s picture;
    the number of questions the user asked; and
    the number of questions the user answered.
    Users are ordered in descending order based on the sum of the number 
    of questions they’ve answered and the number of questions they’ve asked.
 */

const UserStats: FC<{ user: User }> = ({ user }) => (
  <div
    style={{
      display: "flex",
      flex: 1,
      width: "70%",
      border: "1px dashed blue",
      margin: "15px 0",
      alignContent: "center",
    }}
  >
    {/* users picture/ name */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "black",
        fontWeight: "bold",
      }}
    >
      <div style={{ height: 100, width: 100 }}>
        <img
          src={user.avatarURL}
          alt="avatar"
          height="100%"
          width="100%"
          style={{ borderRadius: 8 }}
        />
      </div>
      {user.name}
    </div>
    {/* questions asked */}
    <div
      style={{
        marginLeft: 10,
        borderLeft: "1px solid black",
        flex: 1,
      }}
    >
      {user.questions?.length ?? 0}
    </div>
    {/* questions answered */}
    <div
      style={{
        marginLeft: 10,
        borderLeft: "1px solid black",
        minHeight: "100%",
        flex: 1,
        textAlign: "center",
      }}
    >
      {Object.keys(user.answers ?? {}).length}
    </div>
  </div>
);

export const LeaderBoard: FC = () => {
  const currentUsers = useReduxState(({ allUsers }) => allUsers);

  const getUserTotal = (user: User) => {
    const answerCount = Object.keys(user.answers ?? {}).length;
    const questionCount = user.questions?.length ?? 0;
    return answerCount + questionCount;
  };

  const rankedUsers = Object.entries(currentUsers).sort(
    ([aKey, aUser], [bKey, bUser]) => {
      const userATotal = getUserTotal(aUser);
      const userBTotal = getUserTotal(bUser);
      return userATotal > userBTotal ? -1 : 1;
    }
  );

  return (
    <div
      style={{
        border: "1px dashed red",
        minWidth: "100%",
        flex: 1,
        padding: "110px 25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>LeaderBoard!</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            width: "70%",
            border: "1px dashed blue",
            margin: "15px 0",
            alignContent: "center",
            minHeight: 30,
          }}
        >
          <div style={{ flex: 1 }} />
          <div style={{ flex: 2 }}>answers</div>
          <div style={{ flex: 1 }}>questions</div>
        </div>
        {rankedUsers.map(([key, user]) => (
          <UserStats key={key} user={user} />
        ))}
      </div>
    </div>
  );
};
