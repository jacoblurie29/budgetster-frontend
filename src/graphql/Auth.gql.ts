import { gql } from "@apollo/client";

export const LoginUserMutation = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      _id
      email
      firstName
      lastName
      authToken
      refreshToken
    }
  }
`;

export const RegisterUserMutation = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      _id
      email
      firstName
      lastName
      authToken
      refreshToken
    }
  }
`;

export const RefreshTokenQuery = gql`
  query RefreshToken($refreshTokenInput: RefreshTokenInput!) {
    refreshToken(refreshTokenInput: $refreshTokenInput) {
      authToken
      refreshToken
      firstName
      lastName
    }
  }
`;
