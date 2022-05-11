import { Amplify } from "aws-amplify";

Amplify.configure({
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
  aws_cognito_region: "ap-southeast-2",
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id:
    process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
  aws_cognito_identity_pool_id: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  aws_appsync_region: "ap-southeast-2",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
});
