import { PublishInput } from 'aws-sdk/clients/sns'
import { sns } from './config'

export const publishDisburseLoan = (id: String) =>
    new Promise((resolve, reject) => {
        const payload: PublishInput = {
            Message: JSON.stringify({ default: id }),
            MessageStructure: 'json',
            TopicArn: 'arn:aws:sns:eu-west-1:123456789012:publishDisburseLoan',
        }
        sns.publish(payload, error => {
            if (error) reject(error)

            const response = {
                statusCode: 200,
                body: JSON.stringify({ message: 'Sent loan to be disbursed.' }),
            }
            resolve(response)
        })
    })
