import { APIGatewayEvent } from 'aws-lambda'

import { validatePathParameters } from './utils/validators'
import { getLoan } from './utils/dbController'

import { publishDisburseLoan } from './utils/gateway'

export default async (event: APIGatewayEvent) => {
    await validatePathParameters(event.pathParameters)
    // @ts-ignore
    const { id } = event.pathParameters

    try {
        let loan = await getLoan(id)
        if (!loan) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Could not find the loan.' }),
            }
        }
        if (loan !== null) {
            return await publishDisburseLoan(id)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: error.stack,
        }
    }
}
