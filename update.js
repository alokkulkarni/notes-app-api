import handler from "./libs/handler-libs";
import dynamodb from "./libs/dynamodb-libs";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: process.env.TableName,
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id,
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": data.attachment || null,
        ":content": data.content || null,
      },
      ReturnValues: "ALL_NEW",
    };

    await dynamodb.update(params);

    return { status: true };
});