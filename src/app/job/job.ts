import { Sector } from "../sector/sector";
import { Category } from "../category/category";
import { Company } from "./company/company";
import { Application } from "./application/application";

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
    applications? : Application[];
}