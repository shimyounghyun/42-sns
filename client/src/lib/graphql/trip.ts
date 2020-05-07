import gql from 'graphql-tag';

export type AddPlaceMutationArgs = {
    name: string;
    lat: number;
    lng: number;
    address: string;
    isFav: boolean;
    placeId: string;
}

export type AddDatesMutationArgs ={
    name: string;
    startAt: string;
    endAt: string;
    isFav: boolean;
}

export type BasicResponse = {
    result: boolean;
    error : string;
}

export const ADD_PLACE = gql`
    mutation AddPlace(
        $name : String!
        $lat : Float!
        $lng : Float!
        $address : String!
        $isFav : Boolean!
    ) {
        AddPlace (
            name : $name
            lat : $lat
            lng : $lng
            address : $address
            isFav : $isFav
        ) {
            result
            error
        }
    }
`;