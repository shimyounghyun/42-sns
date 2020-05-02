import * as React from 'react';
import styled from 'styled-components';
import {MdArrowDropDown} from 'react-icons/md';
import palette from '../../lib/styles/palette';
import {CurrentUser} from '../../lib/graphql/user';
import {user_thumbnail} from '../../static/image';

const HeaderUserIconBlock = styled.div`
    cursor: pointer;
    img {
        display: block;
        height: 2.5rem;
        width: 2.5rem;
        box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
        border-radius: 50%;
        object-fit: cover;
        transition: 0.125s all ease-in;
    }
    svg {
        font-size: 1.5rem;
        margin-left: 0.25rem;
        color: ${palette.gray6};
        transition: 0.125s all ease-in;
        margin-right: -0.4375rem;
    }
    display: flex;
    align-items:center;
    &:hover {
        img {
            boax-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
        }
        svg{
            color: ${palette.gray9};
        }
    }
`;

export interface HeaderUserIconProps {
    user: CurrentUser;
    onClick: (e: React.MouseEvent) => void;
}

const HeaderUserIcon: React.FC<HeaderUserIconProps> = ({user, onClick}) => {
    return (
        <HeaderUserIconBlock onClick={onClick}>
            <img
                src={user.profilePhoto || user_thumbnail}
                alt="thumbnail"
                width={120}
            />
            <MdArrowDropDown/>
        </HeaderUserIconBlock>
    );
}

export default HeaderUserIcon;