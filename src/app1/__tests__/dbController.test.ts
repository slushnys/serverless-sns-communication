import { docClient, Loan } from '../utils/config'

import { loanMock } from '../__mocks__/loan'
import { deleteLoan, createLoan, getAllLoans, getLoan } from '../utils/dbController'
import { activeCompanyResponse } from '../__mocks__/kvkOpen.mock'

describe('db controller operations tests', () => {
    test('successfully creates a loan', async () => {
        const amount = 123
        const response: any = await createLoan(123, 'offered', activeCompanyResponse)

        const loan = JSON.parse(response.body)
        expect(loan.amount).toEqual(amount)
    })

    test('getAll loans have lenght of 1', async () => {
        const allLoans: any = await getAllLoans()
        expect(allLoans.length).toEqual(1)
    })
    test('successfully deletes a loan', async () => {
        const deleteLoanMockId = 'delete-loan-mock-id'
        const deleteLoanMock = { ...loanMock, id: deleteLoanMockId }
        await docClient.put({ TableName: 'loans', Item: deleteLoanMock }).promise()

        //@ts-ignore
        const { Item } = await docClient
            .get({ TableName: 'loans', Key: { id: deleteLoanMock.id } })
            .promise()
        expect(Item).toEqual(deleteLoanMock)

        // @ts-ignore
        expect(await deleteLoan(deleteLoanMock.id)).toStrictEqual({
            statusCode: 200,
            body: JSON.stringify({}),
        })
    })

    test('loan not found to delete it', async () => {
        expect(await deleteLoan('not-existing-loan-id')).toStrictEqual({
            statusCode: 200,
            body: JSON.stringify({ ConsumedCapacity: { TableName: 'loans', CapacityUnits: 1 } }),
        })
    })

    test('get single loan', async () => {
        const mockedLoan = {
            company: activeCompanyResponse,
            amount: 44,
            id: '5343-344af3-3g434',
            status: 'offered',
        }
        await docClient
            .put({
                TableName: 'loans',
                Item: mockedLoan,
            })
            .promise()
        const loan: any = await getLoan(mockedLoan.id)
        expect(loan.id).toEqual(mockedLoan.id)
    })
})
