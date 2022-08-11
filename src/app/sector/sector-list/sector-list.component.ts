import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sector } from '../sector';
import { SectorService } from '../sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss']
})
export class SectorListComponent implements OnInit, OnDestroy {
  sectors: Sector[] = [];
  errorMessage: string = '';
  subs: Subscription[] = [];

  constructor(private service: SectorService, private router: Router) { }

  ngOnInit(): void {
    this.getSectors();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  add() {
    this.router.navigate(['super/sector/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['super/sector/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.subs.push(this.service.deleteSector(id).subscribe(r => {
      this.getSectors();
    }, error => {
      this.errorMessage = error.message;
    }))
  }

  getSectors() {
    this.subs.push(this.service.getSectors().subscribe(r => this.sectors = r));
  }

}
