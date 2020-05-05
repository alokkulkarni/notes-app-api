import handler from "./libs/handler-libs";
import dynamodb from "./libs/dynamodb-libs";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.TableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.requestContext.id
        }
    };

    const result = await dynamodb.get(params);
    if (!result.Item) {
      throw new Error("Item not found.");
    };

    // Return the retrieved item
    return result.Item;
});