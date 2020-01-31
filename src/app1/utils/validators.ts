import { has, get, isNil } from 'lodash'

// type of any because through request it may be passed as a string
export const validateBody = (body: any): Promise<any> =>
    new Promise((resolve, reject) => {
        if (!body) {
            reject({
                statusCode: 400,
                body: JSON.stringify({ message: 'Payload has not been provided' }),
            })
        }
        resolve(true)
    })

// type of any because through request it may be passed as a string
export const validateAmount = (amount: any): Promise<any> =>
    new Promise((resolve, reject) => {
        if (amount === '') {
            reject({
                statusCode: 400,
                body: JSON.stringify({ message: 'Amount cant be left empty.' }),
            })
        } else if (isNaN(amount)) {
            reject({
                statusCode: 400,
                body: JSON.stringify({ message: 'Amount has to be the type of number.' }),
            })
        } else {
            resolve(true)
        }
    })

// type of any because through request it may be passed as a string
export const validateCompanyId = (companyId: any): Promise<any> =>
    new Promise((resolve, reject) => {
        if (!isNaN(companyId)) {
            reject({
                statusCode: 400,
                body: JSON.stringify({ message: 'companyId should be a string' }),
            })
        }
        resolve(true)
    })

export const validateCompanyData = (companyData: Object) =>
    new Promise((resolve, reject) => {
        if (has(companyData, 'error')) {
            reject({
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Theres no such company',
                }),
            })
        }
        if (!get(companyData, 'actief')) {
            reject({
                statusCode: 400,
                body: JSON.stringify({
                    message:
                        'Company is not active. Only active companies are allowed to ask for a loan.',
                }),
            })
        }
        resolve(true)
    })

export const validatePathParameters = (parameters: { [name: string]: string } | null) =>
    new Promise((resolve, reject) => {
        if (!parameters && isNil(get(parameters, 'id'))) {
            reject({
                statusCode: 400,
                body: JSON.stringify({
                    message: 'You havent provided a path parameter. use /action/{id}',
                }),
            })
        }
        resolve(true)
    })
