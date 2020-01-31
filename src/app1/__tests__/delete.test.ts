import { docClient, Loan } from '../utils/config'
import { loanMock } from '../__mocks__/loan'
import _delete from '../delete'

test('successfully deletes a loan', async () => {
    // await docClient.put({ TableName: 'loans', Item: loanMock }).promise()
    const loan = new Loan(loanMock)
    loan.save()

    const id = loan.get('id')
    const event = {
        pathParameters: {
            id: id,
        },
    }
    // @ts-ignore
    expect(await _delete(event)).toStrictEqual({
        statusCode: 200,
        body: JSON.stringify(loanMock),
    })
}, 30000)
