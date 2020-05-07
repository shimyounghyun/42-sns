import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "./FatText";
import Theme from "../../lib/styles/Theme";
import ProfilePhoto from "./ProfilePhoto";
import { HeartFull, HeartEmpty, Comment } from "./Icons";

/* 메인 화면 디자인입니다. 아직 API 에서 정보를 받아와서 보여준 것이 아니고
    하드 코딩으로 위치만 잡아놨습니다. 예시입니다.
*/

const Post = styled.div`
  ${Theme.whiteBox};
  width: 100%;
  user-select: none;
  margin-bottom: 25px;
  margin-top: 80px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 16px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 70%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url("https://i.pinimg.com/736x/ca/22/15/ca2215b708184e852e20fae374a5ad15.jpg");
  background-size: contain;
  background-position: center;
  transition: opacity 0.5s linear;
  background-repeat: no-repeat;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${Theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default (/* {
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike
} */) => (
  <Post>
    <Header>
      <ProfilePhoto size="md" url="https://www.biography.com/.image/t_share/MTY3MDUxMjkzMjI1OTIwMTcz/brad-pitt-attends-the-premiere-of-20th-century-foxs--square.jpg" />
      <UserColumn>
        <FatText text="domMorello" />
        <Location>Itaewon</Location>
      </UserColumn>
    </Header>
    <Files
        // showing={1}        
    >
        <File />
    </Files>
    <Meta>
      <Buttons>
        <Button>
          <HeartFull />
        </Button>
        <Button>
          <Comment />
        </Button>
      </Buttons>
      <FatText text="1 like" />
      <Timestamp>5 minutes ago</Timestamp>
      <Textarea placeholder={"Add a comment..."} />
    </Meta>
  </Post>
);