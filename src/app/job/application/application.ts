import { User } from "src/app/user/user";
import { Job } from "../job";

export interface Application {
    userId: string;
    jobId: number;
    description?: string;
    user?: User;
    job?: Job;
}