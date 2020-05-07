import gql from 'graphql-tag';

export const GET_DEFAULT_FEED = gql`
    {
        GetDatesNearTrips($dateId: Int!){
            trips {
                title
                file
                
            }
        }
    }
`