import { Company } from "../job/company/company";


export interface User {
    id: string;
    userName: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    isAdmin: boolean;
    isSuper: boolean;
    password?: string | null;
    token?: string;
    phoneNumber?: string;
    address?: string;
    linkedIn?: string;
    companies: Company[]
}