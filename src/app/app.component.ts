import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faIcons } from '@fortawesome/free-solid-svg-icons';
import { Menu } from './models/Menu';
import {   faBars,faChevronDown,faLayerGroup,faTableList,faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(public route:Router) {}

  
  faBars = faBars
  faCalendar = faCalendar
  ngOnInit(){ }




}
