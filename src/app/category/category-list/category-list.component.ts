import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  errorMessage: string = '';
  subs: Subscription[] = [];
  constructor(private service: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  add() {
    this.router.navigate(['super/category/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['super/category/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.subs.push(this.service.deleteCategory(id).subscribe(r => {
      this.getCategories();
    }, error => {
      this.errorMessage = error.message;
    }))
  }

  getCategories() {
    this.subs.push(this.service.getCategories().subscribe(r => this.categories = r));
  }

}
