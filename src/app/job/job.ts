import { Sector } from "../sector/sector";
import { Company } from '../company/company'
import { Category } from "../category/category";

export interface Job {
    id: number;
    name: string;
    description?: string;
    deadline?: Date;
    contractType?: string;
    location?: string;
    salary?: string;
    companyId?: number;
    sectorId: number;
    company?: Company;
    sector?: Sector;
    categories? : Category[];
}