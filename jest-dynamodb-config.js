module.exports = {
    tables: [
        {
            TableName: `loans`,
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        },
        // etc
    ],
    port: 8002,
    options: ['-sharedDb'],
}
