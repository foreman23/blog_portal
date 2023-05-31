import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-2_LG7MLL3Au",
    ClientId: "1evf1vphk4mvpaofe89atpniit",
}

export default new CognitoUserPool(poolData);