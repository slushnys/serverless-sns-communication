import { docClient, DISBURSED } from '../utils/config'
import create from '../create'
test('', async () => {
    // const event = {
    //     body: { amount: 600, "company"}
    // }
    // expect(await consumeDisbursed(event)).toStrictEqual({
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         message: `Successfully disbursed loan id: ${loanMock.id}`,
    //     }),
    // })
    // const { Item: UpdatedItem } = await docClient
    //     .get({ TableName: 'loans', Key: { id: loanMock.id } })
    //     .promise()
    // console.log('UpdatedItem', UpdatedItem)
    // const updatedItemMock = { ...loanMock, status: DISBURSED }
    // expect(UpdatedItem).toEqual(updatedItemMock)
})
