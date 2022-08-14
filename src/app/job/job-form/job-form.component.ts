import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { Sector } from 'src/app/sector/sector';
import { SectorService } from 'src/app/sector/sector.service';
import { Job } from '../job';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { JobService } from '../job.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Company } from '../company/company';
import { User } from 'src/app/user/user';
import { AuthService } from 'src/app/user/auth/auth.service';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnDestroy {
  job: Job = {id: 0, name: "", sectorId: 0}
  dateInput!: NgbDateStruct;
  //editJob?
  id: number = 0;
  companyId: number = 0;
  company: Company = {id: 0, name: "", adminId: "", jobCount: 0, jobs: []};
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []}
  isSubmitted: boolean = false;
  sectors: Sector[] = [];
  categories: Category[] = [];
  error: string = '';
  isAdd: boolean = false;
  isEdit: boolean = false;
  subs: Subscription[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private service: JobService, private router: Router, private auth: AuthService,
      private sectorService: SectorService, private categoryService: CategoryService, 
      private companyService: CompanyService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.id = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.companyId = +this.router.getCurrentNavigation()?.extras.state?.['companyId'];
    this.user = this.auth.getUser() ?? this.user;
    if (this.id > 0) {
      this.subs.push(this.service.getJobById(this.id).subscribe(r => {
        this.subs.push(this.companyService.getCompanyById(r.companyId ?? 0).subscribe(r => this.company = r));
        this.job = r;
        if (r.deadline) {
          let date = new Date(r.deadline);
          this.dateInput = r.deadline? {year: date.getFullYear(), month: date.getMonth() + 1, 
              day: date.getDate()} : this.dateInput
        }
      }));
    }
  }

  ngOnInit(): void {
    if (this.isAdd == this.isEdit) {
      window.history.back();
    }
    if (this.companyId) {
      this.subs.push(this.companyService.getCompanyById(this.companyId).subscribe(r => this.company = r));
    } 
    this.subs.push(this.sectorService.getSectors().subscribe(r => this.sectors = r));
    this.subs.push(this.categoryService.getCategories().subscribe(r => this.categories = r));
    this.dropdownSettings = {
      idField: 'id', textField: 'name',
    }
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.dateInput) {
      this.job.deadline = new Date(this.dateInput.year, this.dateInput.month - 1, this.dateInput.day + 1).toISOString()
    } else {
      this.job.deadline = null;
    }
    let observable = new Observable<Job>();
    if (this.isAdd) {
      this.job.companyId = this.companyId;
      observable = this.service.postJob(this.job);
    }
    if (this.isEdit) {
      observable = this.service.putJob(this.id, this.job)
    }
    this.subs.push(observable.subscribe({
        next: r => this.router.navigateByUrl("/job/" + (this.isAdd ? r.id : this.id)),
        error: e => this.error = e.message
    }));
  }
}