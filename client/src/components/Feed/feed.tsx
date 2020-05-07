import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';


// export const FEED_TRIP_QUERY = gql`
//     {
//         GetDatesNearTrips($dataId: Int!) {
//             trips{
//                 status
//                 file
//                 title
//                 caption
//                 hostId
//                 startAt
//                 endAt
//                 createdAt
//                 updatedAt
//             }
//         }        
//     }
// `;

// export const FEED_USER_QUERY = gql`
//     {
//         GetUserWithHostId($hostId: Int!){
//             user{
//                 userName
//                 profilePhoto
//             }
//         }
//     }
// `;

export default () => {
    // const {data, loading} = useQuery(FEED_TRIP_QUERY);
    // console.log(data, loading);
    return (
        <>Hello</>
    );
}
