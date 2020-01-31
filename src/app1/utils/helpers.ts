import { get, has } from 'lodash'
import { KVKOPEN_API_KEY } from './config'

export const queryKVKOpen = async (companyId: String) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(
                `https://api.overheid.io/openkvk/${companyId}?ovio-api-key=${KVKOPEN_API_KEY}`
            )
            resolve(response.json())
        } catch (error) {
            reject(error)
        }
    })

export const getIdFromPathParameters = (
    pathParameters: {
        [name: string]: string,
    } | null
) => {
    if (!pathParameters && !has(pathParameters, 'id')) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'You havent provided an id' }),
        }
    }
    return get(pathParameters, 'id')
}
