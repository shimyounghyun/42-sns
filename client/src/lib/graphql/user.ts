import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
    {
        auth @client {
            isLoggedIn
        }        
    }
`;

export const LOGUSER_IN = gql`
    mutation logUserIn($token: string!) @client {
        logUserIn(token : $token) @client
    }
`;

export const LOGUSER_OUT = gql`
    mutation logUserOut($input: null) @client{
        logUserOut(input: $input) @client
    }
`;

export type SignUpIntraResponse = {
    result : boolean;
    error : string | null | undefined | "";
    token : string | null | undefined | "";
}

export type UserBasicInfo = {
    id : number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    intraId: string;
};

export type ConnectType = "LOGIN" | "REGIST" | "ERROR";

export type IntraConnectResponse = {
    result: boolean;
    error: string | null;
    token: string | null;
    type : ConnectType | null;
    data : UserBasicInfo | null;
}

export type SignUpIntraMutationArgs = {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    intraId: string;
    password: string;
    token:string;
    id : number;
  }

export type CurrentUser = {
    id : number;
    intraId: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
}

export const GET_CURRENT_USER = gql`
    {
        GetMyProfile {
            result
            error
            user {
                id
                intraId
                email
                userName
                firstName
                lastName
                profilePhoto
            }
        }
    }
`;

export const SIGN_UP = gql`
  mutation SignUpIntra(
        $id : Int!
        $email: String!
        $userName: String!
        $firstName: String!
        $lastName: String!
        $profilePhoto : String!
        $intraId: String!
        $password: String!
        $token: String!
  ) {
    SignUpIntra(
        id : $id
        email: $email
        userName: $userName
        firstName: $firstName
        lastName: $lastName
        profilePhoto : $profilePhoto
        intraId: $intraId
        password: $password
        token: $token
    ) {
        result
        error
        token
    }
  }
`;

export const INTRA_CONNECT = gql`
    mutation IntraConnect($code: String) {
        IntraConnect(code: $code) {
            result
            error
            token
            type
            data {
                id
                email
                userName
                firstName
                lastName
                profilePhoto
                intraId
            }
        }
    }
`;
