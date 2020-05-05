import handler from "./libs/handler-libs";
import dynamodb from "./libs/dynamodb-libs";


export const main = handler(async (event, context) => {

    const params = {
      TableName: process.env.TableName,
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id,
      },
    };

    await dynamodb.delete(params);

    return { status: true };
});