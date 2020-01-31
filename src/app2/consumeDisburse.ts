import { PublishInput } from 'aws-sdk/clients/sns'

import { sns } from '../app1/utils/config'

export default (event: any) => {
    const loanId = event.Records[0].Sns.Message
    const payload: PublishInput = {
        Message: JSON.stringify({ default: loanId, disbursed: true }),
        MessageStructure: 'json',
        TopicArn: 'arn:aws:sns:eu-west-1:123456789012:publishLoanDisbursed',
    }
    sns.publish(payload, error => {
        if (error) throw error

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Sent loan to be disbursed.' }),
        }
        return response
    })
}
