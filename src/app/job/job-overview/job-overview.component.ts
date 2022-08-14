import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flip } from '@popperjs/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import { SectorService } from 'src/app/sector/sector.service';
import { AuthService } from 'src/app/user/auth/auth.service';
import { User } from 'src/app/user/user';
import { Company } from '../company/company';
import { CompanyService } from '../company/company.service';
import { Job } from '../job'
import { JobService } from '../job.service'
import { JobSort } from './job-sort';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.scss']
})
export class JobOverviewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() companyId: number = 0;
  @Input() isSeparate: boolean = true;
  jobSort: JobSort = {companies: [], sectors: [], companyId: 0, search: "", location: "", 
                      sector: 0, categories: [], selectedCategories: [], sort: 0};
  sorts = [{v: 0, s: "Default"}, {v: 1, s: "Soonest deadline first"}, {v: 2, s: "Latest deadline first"}, 
           {v: 3, s: "Without deadline first"}, {v: 4, s: "Expired jobs"}]
  company: Company = {id: 0, name: "", adminId: "", jobCount: 0, jobs: []};
  user: User = {id: "", userName: "", companies: [], isAdmin: false, isSuper: false};
  jobs: Job[] = [];
  subs: Subscription[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(private jobService: JobService, private router: Router, private categoryService: CategoryService, 
    private auth: AuthService, private companyService: CompanyService, private sectorService: SectorService) {
    
   }

  ngOnInit(): void {
    this.getJobs();
    this.user = this.auth.getUser() ?? this.user;
    this.dropdownSettings = {
      idField: 'id', textField: 'name',
    }
  }

  ngOnChanges(): void {
    this.getJobs();
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

  add() {
    this.router.navigate(['admin/job/form'], {state: {companyId: this.companyId, mode: 'add'}});
  }

  getJobs() {
    this.subs.push(this.companyService.getCompanies().subscribe(r => this.jobSort.companies = r));
    this.subs.push(this.sectorService.getSectors().subscribe(r => this.jobSort.sectors = r));
    this.subs.push(this.categoryService.getCategories().subscribe(r => this.jobSort.categories = r));
    if (this.companyId == 0) {
      this.subs.push(this.jobService.getJobs()
            .subscribe(r => this.jobs = this.companyId == 0 ? r : this.jobs))
    } else {
      this.subs.push(this.companyService.getCompanyById(this.companyId)
            .subscribe(r => this.company = r))
      this.subs.push(this.jobService.getJobsByCompany(this.companyId)
            .subscribe(r => this.jobs = r))
    }
  }

  filter(job: Job): boolean {
    if (this.jobSort.companyId > 0 && this.jobSort.companyId != job.companyId) {
      return false;
    }
    if (this.jobSort.sector > 0 && this.jobSort.sector != job.sectorId) {
      return false;
    }
    if (this.jobSort.search.length > 0) {
      if (!this.termSearch(this.jobSort.search, [job.name, job.description, job.contractType])) {
        return false;
      }
    }
    if (this.jobSort.location.length > 0) {
      if (!this.termSearch(this.jobSort.location, [job.location])) {
        return false;
      }
    }
    if (this.jobSort.selectedCategories.length > 0) {
      if (!this.jobSort.selectedCategories.every(c => job.categories?.map(cat => cat.id).includes(c.id))) {
        return false;
      }
    }
    return true;
  }

  termSearch(search: string, places: (string|undefined)[]) : boolean {
    let terms = search.toLowerCase().trim().split(/\s+/)
    return !terms.some(t => places.every(p => !p?.toLowerCase().includes(t)));
    //true if all found
  }

  sorter(jobs: Job[]) : Job[] {
    switch (this.jobSort.sort) {
      case 0: //default
        jobs.sort((a, b) => {
          if (a.deadline == undefined || b.deadline == undefined) {
            return a.deadline == undefined ? -1 : 1
          }
          let aDate = new Date(a.deadline).getTime();
          let bDate = new Date(b.deadline).getTime();
          let today = new Date().getTime();
          if (aDate < today ? bDate > today : bDate < today) {
            return aDate < today ? 1 : -1;
          }
          return aDate < bDate ? -1 : 1;
        })
        break;
      case 1: // soonest first
        jobs.sort((a, b) => {
          let today = new Date().getTime();
          let aDate = a.deadline != undefined ? new Date(a.deadline).getTime() : today;
          let bDate = b.deadline != undefined ? new Date(b.deadline).getTime() : today;
          if ((aDate < today || bDate < today)) {
            return aDate < today && bDate >= today ? 1 : bDate < today && aDate >= today ? -1 : aDate < bDate ? 1 : -1;
          }
          if (a.deadline == undefined || b.deadline == undefined) {
            return a.deadline == undefined ? 1 : -1
          }
          return aDate < bDate ? -1 : 1;
        })
        break;
      case 2: //latest first
        jobs.sort((a, b) => {
          let today = new Date().getTime();
          let aDate = a.deadline != undefined ? new Date(a.deadline).getTime() : today;
          let bDate = b.deadline != undefined ? new Date(b.deadline).getTime() : today;
          if (aDate < today ? bDate > today : bDate < today) {
            return aDate < today ? 1 : -1;
          }
          return aDate < bDate ? 1 : -1;
        })
        break; 
      case 3: //without first
        jobs.sort((a, b) => {
          if (a.deadline == undefined || b.deadline == undefined) {
            return a.deadline == undefined ? -1 : 1
          }
          let aDate = new Date(a.deadline).getTime();
          let bDate = new Date(b.deadline).getTime();
          let today = new Date().getTime();
          if (aDate < today ? bDate > today : bDate < today) {
            return aDate < today ? 1 : -1;
          }
          return aDate < bDate ? -1 : 1;
        })
        break;
      case 4: //expired 
        jobs.sort((a, b) => {
          if (a.deadline == undefined || b.deadline == undefined) {
            return a.deadline == undefined ? 1 : -1
          }
          let aDate = new Date(a.deadline).getTime();
          let bDate = new Date(b.deadline).getTime();
          let today = new Date().getTime();
          if (aDate < today ? bDate > today : bDate < today) {
            return aDate < today ? -1 : 1;
          }
          return aDate < bDate ? 1 : -1;
        })
        break;
      default:
        break;
    }
    return jobs;
  }
}
