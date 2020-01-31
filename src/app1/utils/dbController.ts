import { ILoan, StatusType } from './interfaces'
import { Loan } from './config'
import { docClient, DISBURSED } from './config'

export const createLoan = async (amount: Number, status: StatusType, companyData: any) =>
    new Promise((resolve, reject) => {
        {
            const loanPayload: ILoan = {
                amount,
                status,
                company: JSON.stringify(companyData),
            }
            Loan.create(loanPayload, function(err, loan: ILoan) {
                if (err) reject(err)
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(loan),
                })
            })
        }
    })

export const getAllLoans = async () =>
    new Promise((resolve, reject) => {
        Loan.scan()
            .loadAll()
            .exec((err, loans) => {
                return err ? reject(err) : resolve(loans.Items)
            })
    })

export const deleteLoan = async (id: any) =>
    new Promise((resolve, reject) => {
        docClient.delete({ TableName: 'loans', Key: { id } }, (err, data) => {
            if (err)
                reject({
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Loan not found' }),
                })
            resolve({
                statusCode: 200,
                body: JSON.stringify(data),
            })
        })
        // Loan.destroy(id, { ReturnValues: 'ALL_OLD' }, function(err, loan: ILoan) {
        //     if (err || loan === null) {
        //         resolve({
        //             statusCode: 404,
        //             body: JSON.stringify({ message: 'Loan not found' }),
        //         })
        //     } else {
        //         resolve({
        //             statusCode: 200,
        //             body: JSON.stringify(loan),
        //         })
        //     }
        // })
    })
export const getLoan = async (id: any) =>
    new Promise((resolve, reject) => {
        docClient.get(
            {
                TableName: 'loans',
                Key: {
                    id,
                },
            },
            (err: any, data) => {
                if (err) reject(err)
                else resolve(data.Item)
            }
        )
    })

export const disburseLoan = (id: String) =>
    new Promise((resolve, reject) => {
        var params = {
            TableName: 'loans',
            Key: {
                id,
            },
            UpdateExpression: 'SET #status = :value',
            ExpressionAttributeNames: {
                '#status': 'status',
            },
            ExpressionAttributeValues: {
                ':value': DISBURSED,
            },
        }
        docClient.update(params, (err, _data) => {
            if (err) reject(err)
            else resolve(true)
        })
    })
