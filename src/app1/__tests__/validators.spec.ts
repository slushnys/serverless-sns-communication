import {
    validateCompanyId,
    validateBody,
    validateCompanyData,
    validatePathParameters,
} from '../utils/validators'
import { validateAmount } from '../utils/validators'
import { AMOUNT_FORMAT_EXCEPTION } from '../utils/exceptions'
import {
    inactiveCompanyResponse,
    activeCompanyResponse,
    companyNotFoundResponse,
} from './kvkOpen.mock'

var request = require('supertest')
describe('create function tests', () => {
    test('if event body is missing return bad request', async () => {
        try {
            await validateBody(null)
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({ message: 'Payload has not been provided' }),
            })
        }
    })
    test('varify company id is bad format', async () => {
        try {
            const companyId = '24'
            await validateCompanyId(companyId)
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({ message: 'companyId should be a string' }),
            })
        }
    })
    test('verify company id is good format', async () => {
        const companyId = 'hoofdvestiging-72612681-0000-vof-van-de-sande'
        expect(await validateCompanyId(companyId)).toBe(true)
    })
    test('string passed as amount to be incorrect', async () => {
        try {
            await validateAmount('test')
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({ message: 'Amount has to be the type of number.' }),
            })
        }
    })
    test('number passed as amount to be correct', async () => {
        expect(await validateAmount(50)).toBe(true)
    })
    test('number passed as amount to incorrect when empty', async () => {
        try {
            await validateAmount('')
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({ message: 'Amount cant be left empty.' }),
            })
        }
    })
    test('inactive company retrieved should emit an error', async () => {
        // const mockQueryOpenKVK = jest.fn(x=> inactiveCompanyResponse)
        try {
            await validateCompanyData(inactiveCompanyResponse)
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({
                    message:
                        'Company is not active. Only active companies are allowed to ask for a loan.',
                }),
            })
        }
    })
    test('active company retrieved should emit success', async () => {
        expect(await validateCompanyData(activeCompanyResponse)).toBe(true)
    })
    test('company not found should emit an error', async () => {
        try {
            await validateCompanyData(companyNotFoundResponse)
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Theres no such company',
                }),
            })
        }
    })

    test('empty path parameter should emit error', async () => {
        const event = null
        try {
            await validatePathParameters(event)
        } catch (error) {
            expect(error).toStrictEqual({
                statusCode: 400,
                body: JSON.stringify({
                    message: 'You havent provided a path parameter. use /action/{id}',
                }),
            })
        }
    })
})
