import { disburseLoan } from './utils/dbController'

export default async (event: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const loanId: String = event.Records[0].Sns.Message

            const updatedLoan = await disburseLoan(loanId)
            if (updatedLoan) {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({
                        message: `Successfully disbursed loan id: ${loanId}`,
                    }),
                })
            } else {
                resolve({
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Couldnt disburse the loan.' }),
                })
            }
        } catch (error) {
            console.error('ERROR', error)

            reject({
                statusCode: 500,
                body: error.stack,
            })
        }
    })
