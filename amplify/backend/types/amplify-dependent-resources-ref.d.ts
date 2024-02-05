export type AmplifyDependentResourcesAttributes = {
  "api": {
    "EventAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "EventManager": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "EventManager": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "EventFunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "s3eventmanagerstoragedf0e68b2": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}