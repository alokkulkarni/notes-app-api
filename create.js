import * as uuid from 'uuid';
import handler from './libs/handler-libs';
import dynamodb from './libs/dynamodb-libs';

export const main = handler(async (event, context) =>  {

    const data =  JSON.parse(event.body);

    const params = {
        TableName: process.env.TableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    await dynamodb.put(params);

    return params.Item;
});