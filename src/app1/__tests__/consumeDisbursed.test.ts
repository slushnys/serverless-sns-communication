import consumeDisbursed from '../consumeDisbursed'

import { docClient, DISBURSED } from '../utils/config'
import { loanMock } from '../__mocks__/loan'

test('should update a loan to a disbursed one', async () => {
    await docClient.put({ TableName: 'loans', Item: loanMock }).promise()

    const { Item } = await docClient.get({ TableName: 'loans', Key: { id: loanMock.id } }).promise()
    expect(Item).toEqual(loanMock)

    const event = {
        Records: [
            {
                Sns: {
                    Message: loanMock.id,
                },
            },
        ],
    }
    expect(await consumeDisbursed(event)).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify({
            message: `Successfully disbursed loan id: ${loanMock.id}`,
        }),
    })

    const { Item: UpdatedItem } = await docClient
        .get({ TableName: 'loans', Key: { id: loanMock.id } })
        .promise()
    const updatedItemMock = { ...loanMock, status: DISBURSED }
    expect(UpdatedItem).toEqual(updatedItemMock)
})

test('shouldnt disburse the loan', async () => {
    const event = {
        Records: [
            {
                Sns: {
                    Message: 'random-id',
                },
            },
        ],
    }

    expect(await consumeDisbursed(event)).toStrictEqual({
        statusCode: 400,
        body: JSON.stringify({ message: 'Couldnt disburse the loan.' }),
    })
})
