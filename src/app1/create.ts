import { APIGatewayEvent } from 'aws-lambda'
import {
    validateCompanyId,
    validateAmount,
    validateCompanyData,
    validateBody,
} from './utils/validators'
import { queryKVKOpen } from './utils/helpers'
import { OFFERED, Loan } from './utils/config'
import { has } from 'lodash'
import { createLoan } from './utils/dbController'

export const create = async (event: APIGatewayEvent) => {
    try {
        await validateBody(event.body)

        // Parse POST request body and retrieve parameters
        // @ts-ignore
        const { amount, companyId } = JSON.parse(event.body)
        // Validates the requests payload
        await validateAmount(amount)
        await validateCompanyId(companyId)

        const companyData = await queryKVKOpen(companyId)
        // Check if company is active and if there was no error receiving the company data
        // @ts-ignore
        await validateCompanyData(companyData)

        return await createLoan(amount, OFFERED, companyData)
    } catch (e) {
        if (has(e, 'statusCode')) {
            return e
        }
        return {
            statusCode: 500,
            body: e.stack,
        }
    }
}
export default create
