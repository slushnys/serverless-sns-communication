import { APIGatewayEvent } from 'aws-lambda'
import { Loan } from './utils/config'
import { ILoan } from './utils/interfaces'
import { deleteLoan } from './utils/dbController'
import { validatePathParameters } from './utils/validators'

export default async (event: APIGatewayEvent) => {
    try {
        await validatePathParameters(event.pathParameters)

        // @ts-ignore
        const { id } = event.pathParameters

        return await deleteLoan(id)
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}
