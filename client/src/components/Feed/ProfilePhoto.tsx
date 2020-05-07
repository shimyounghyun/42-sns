import React from "react";
import styled from "styled-components";

/* User 프로필사진 디자인입니다. */

export interface Props {
    size: string;
    url: string;
}

const getSize = (size) => {
  let number;
  if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 50;
  } else if (size === "lg") {
    number = 150;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div<Props>`
  ${props => getSize(props.size)}
  background-image:url(${props => props.url});
  background-size:cover;
  border-radius:50%;
`;

const Avatar = ({ size = "sm", url }) => <Container size={size} url={url} />;

export default Avatar;