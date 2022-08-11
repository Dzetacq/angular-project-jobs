import { Job } from "../job/job";
import { User } from "../user/user";

export interface Company {
    id: number;
    name: string;
    adminId: string;
    admin?: User;
    jobCount: number;
    jobs: Job[];
}