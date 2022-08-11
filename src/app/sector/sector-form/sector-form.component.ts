import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sector } from '../sector';
import { SectorService } from '../sector.service';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss']
})
export class SectorFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  sectorId: number = 0;
  sector: Sector = {id: 0, name: ""};
  
  isSubmitted: boolean = false;
  errorMessage: string = '';
  subs: Subscription[] = [];
  constructor(private router: Router, private service: SectorService) { 
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.sectorId = +(this.router.getCurrentNavigation()?.extras.state?.['id'] ?? 0);

    if (this.sectorId > 0) {
      this.subs.push(this.service.getSectorById(this.sectorId).subscribe(r => this.sector = r));
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.subs.push(this.service.postSector(this.sector).subscribe(r => {
                this.router.navigateByUrl("/super");
              },
              e => {
                this.errorMessage = e.message;
              }));
    }
    if (this.isEdit) {
      this.subs.push(this.service.putSector(this.sectorId, this.sector).subscribe(r => {
                this.router.navigateByUrl("/super");
              },
              e => {
                this.errorMessage = e.message;
              }));
    }
  }

}
