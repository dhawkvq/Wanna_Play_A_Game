import { FC } from "react";
import { User } from "../types/User";
import styled from "styled-components";

export const UserStats: FC<{ user: User; place: number }> = ({
  user,
  place,
}) => (
  <UserBox>
    {/* users place */}
    <Rank>{place}</Rank>
    {/* users picture/ name */}
    <UserDetails>
      <ImageContainer>
        <img src={user.avatarURL} alt="avatar" />
      </ImageContainer>
      <span>{user.name}</span>
    </UserDetails>
    {/* questions asked */}
    <TallyContainer>{user.questions?.length ?? 0}</TallyContainer>
    {/* questions answered */}
    <TallyContainer>{Object.keys(user.answers ?? {}).length}</TallyContainer>
  </UserBox>
);

const TallyContainer = styled.div`
  margin-left: 10px;
  border: 2px solid #8b8b8b;
  border-radius: 8px;
  min-height: 100%;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const ImageContainer = styled.div`
  height: 100px;
  width: 100px;
  margin-bottom: 5px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
  }
`;

const UserBox = styled.div`
  display: flex;
  flex: 1;
  width: 70%;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 7px;
  margin: 15px 0;
  align-content: center;
  position: relative;
`;

const Rank = styled.span`
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  font-weight: bold;

  span {
    color: "#555555";
  }
`;
