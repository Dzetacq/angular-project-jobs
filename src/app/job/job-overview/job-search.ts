export interface JobSearch {
    name: string;
    description?: string;
    contractType?: string;
    location?: string;
    salary?: string;
    companyId?: number;
    sectorId: number;
}