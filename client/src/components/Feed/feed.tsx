import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import FeedPresenter from "./FeedPresenter";


// export const FEED_TRIP_QUERY = gql`
    
//         query GetDatesNearTrips($dateId: Int!){
//             GetDatesNearTrips(dateId: $dateId) {
//                 trips {
//                     status
//                     file
//                     title
//                     caption
//                     hostId
//                     startAt
//                     endAt
//                     createdAt
//                     updatedAt
//                 }
//             }
            
//         }
    
// `;

// export default () => {
//     const {data, loading} = useQuery(FEED_TRIP_QUERY, {variables:{dateId:3}});
//     console.log(data, loading);
//     return (
//         <>Hello</>
//     );
// }

export default FeedPresenter;