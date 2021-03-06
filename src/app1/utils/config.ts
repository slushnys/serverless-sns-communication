import * as Joi from 'joi'
import * as dynamo from 'dynamodb'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export const sns = new AWS.SNS({
    region: 'eu-west-1',
})
const isTest = process.env.NODE_ENV === 'test'
const docClientConfig = {
    ...(isTest && {
        convertEmptyValues: true,
        endpoint: 'http://localhost:8000',
        region: 'local',
        sslEnabled: false,
    }),
}

export const docClient = new DocumentClient({
    ...docClientConfig,
})
dynamo.AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
})
dynamo.createTables()
export const Loan = dynamo.define('Loan', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        id: dynamo.types.uuid(),
        amount: Joi.number().required(),
        status: Joi.string(),
        company: Joi.string().allow(''),
    },
})

export const KVKOPEN_API_KEY = '6f52d195df4b10f3c923eadb310a74c410f0d6475b3d224220f6ef818de47bcc'

// hoofdvestiging-72612681-0000-vof-van-de-sande active company
export const OFFERED = 'offered'
export const DISBURSED = 'disbursed'
