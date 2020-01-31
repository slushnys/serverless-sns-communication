export type StatusType = 'offered' | 'disbursed'

export interface ILoan {
    id?: String
    amount: Number
    status: StatusType
    company?: Object
}
