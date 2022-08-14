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

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnDestroy {
  job: Job = {id: 0, name: "", sectorId: 0}
  dateInput: NgbDateStruct = {year: 0, month: 0, day: 0};
  //editJob?
  id: number = 0;
  companyId: number = 0;
  isSubmitted: boolean = false;
  sectors: Sector[] = [];
  categories: Category[] = [];
  error: string = '';
  isAdd: boolean = false;
  isEdit: boolean = false;
  subs: Subscription[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private service: JobService, private router: Router, 
      private sectorService: SectorService, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.id = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.companyId = +this.router.getCurrentNavigation()?.extras.state?.['companyId'];
    if (this.id > 0) {
      this.subs.push(this.service.getJobById(this.id).subscribe(r => {
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
    this.job.deadline = new Date(this.dateInput.year, this.dateInput.month - 1, this.dateInput.day + 1).toISOString()
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