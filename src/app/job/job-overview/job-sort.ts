import { Category } from "src/app/category/category";
import { Sector } from "src/app/sector/sector";
import { Company } from "../company/company";

export interface JobSort {
    companies: Company[];
    sectors: Sector[];
    categories: Category[];
    companyId: number;
    search: string;
    location: string;
    sector: number;
    selectedCategories: Category[];
    sort: string;
}