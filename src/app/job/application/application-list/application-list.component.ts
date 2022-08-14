import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../application';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  @Input() applications: Application[] = [];
  @Input() fromUser: boolean = false;
  @Input() fromJob: boolean = false;
  constructor() { }

  ngOnInit(): void {}

}
