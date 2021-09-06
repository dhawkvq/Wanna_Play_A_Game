import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
import { User } from "../types/User";
import { useAppDispatch } from "../hooks";
import { logout } from "../redux/reducers/currentUserReducer";

export const Navbar: FC<{ user?: User }> = ({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <Bar>
      {!!user && (
        <>
          <div style={{ marginLeft: 20 }}>
            Hi <span style={{ color: "#6262ff" }}>{user.name}</span>, Wanna play
            a game?
          </div>
          <div>
            <NavLink to="/add" className="newPoll">
              + New Poll
            </NavLink>
            <NavLink to="/leaderboard">LeaderBoard</NavLink>
            <NavLink to="/">Home</NavLink>
            <Button onClick={() => dispatch(logout())} buttonText="Log Out" />
          </div>
        </>
      )}
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  border-bottom: 2px solid #6262ffbc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0px;
  position: absolute;
  top: 0;
  box-shadow: -5px 5px 8px #6262ffbc;

  a,
  button {
    margin-right: 12px;
  }

  a {
    text-decoration: none;
    color: #464646;
  }

  .newPoll {
    color: #00bd00;
  }
`;
