import { Loan } from './utils/config'
import { APIGatewayEvent } from 'aws-lambda'
import { getAllLoans } from './utils/dbController'

export default async (event: APIGatewayEvent) => {
    try {
        const loans = await getAllLoans()

        return {
            statusCode: 200,
            body: JSON.stringify(loans),
        }
    } catch (e) {
        if (e.code === 'ResourceNotFoundException') {
            console.error('ERROR: Loan resource not found. Returning empty list []')
            return {
                statusCode: 400,
                body: JSON.stringify([]),
            }
        }
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}
