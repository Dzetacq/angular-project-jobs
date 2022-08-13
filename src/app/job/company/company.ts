import { User } from "src/app/user/user";
import { Job } from "../job";


export interface Company {
    id: number;
    name: string;
    adminId: string;
    admin?: User;
    jobCount?: number;
    jobs?: Job[];
}