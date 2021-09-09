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
    {/* users picture */}
    <div style={{ height: 100, width: 100 }}>
      <img
        src={user.avatarURL}
        alt="avatar"
        height="100%"
        width="100%"
        style={{ borderRadius: 8 }}
      />
    </div>
    {/* users name */}
    <div
      style={{
        marginLeft: 10,
        minHeight: "100%",
        flex: 3,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
      }}
    >
      {user.name}
    </div>
    {/* questions asked */}
    <div
      style={{
        marginLeft: 10,
        borderLeft: "1px solid black",
        // display: "flex",
        // height: "100%",
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
      {user.answers?.length ?? 0}
    </div>
  </div>
);

export const LeaderBoard: FC = () => {
  const currentUsers = useReduxState(({ allUsers }) => allUsers);
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
      <>
        {Object.entries(currentUsers).map(([key, user]) => (
          <UserStats key={key} user={user} />
        ))}
      </>
    </div>
  );
};
