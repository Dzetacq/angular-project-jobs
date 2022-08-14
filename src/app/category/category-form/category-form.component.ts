import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;
  category: Category = {id: 0, name: ""};
  
  isSubmitted: boolean = false;
  errorMessage: string = '';
  subs: Subscription[] = [];


  constructor(private router: Router, private service: CategoryService) { 
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.categoryId = +(this.router.getCurrentNavigation()?.extras.state?.['id'] ?? 0);

    if (this.categoryId > 0) {
      this.subs.push(this.service.getCategoryById(this.categoryId).subscribe(r => this.category = r));
    }
  }

  ngOnInit(): void {
    if (this.isAdd == this.isEdit) {
      window.history.back();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.subs.push(this.service.postCategory(this.category).subscribe(r => {
                this.router.navigateByUrl("/super");
              },
              e => {
                this.errorMessage = e.message;
              }));
    }
    if (this.isEdit) {
      this.subs.push(this.service.putCategory(this.categoryId, this.category).subscribe(r => {
                this.router.navigateByUrl("/super");
              },
              e => {
                this.errorMessage = e.message;
              }));
    }
  }

}
