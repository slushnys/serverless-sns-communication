import { docClient, Loan } from '../utils/config'

import { loanMock } from '../__mocks__/loan'
import { deleteLoan, createLoan } from '../utils/dbController'

describe('db controller operations tests', () => {
    test('successfully creates a loan', async () => {
        await docClient.put({ TableName: 'loans', Item: loanMock }).promise()
        const response = await createLoan(123, 'offered', loanMock)

        // @ts-ignore
        expect(response).toStrictEqual({
            statusCode: 200,
            body: JSON.stringify(loanMock),
        })
    })
    test('successfully deletes a loan', async () => {
        Loan.
        await docClient.put({ TableName: 'loans', Item: loanMock }).promise()

        //@ts-ignore
        const { Item } = await docClient
            .get({ TableName: 'loans', Key: { id: loanMock.id } })
            .promise()
        expect(Item).toEqual(loanMock)

        // @ts-ignore
        expect(await deleteLoan(loan.id)).toStrictEqual({
            statusCode: 200,
            body: JSON.stringify(loanMock),
        })
    })
})
