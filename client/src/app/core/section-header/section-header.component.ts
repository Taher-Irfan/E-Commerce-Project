import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  breadcrumb$: Observable<any[]>;
  constructor(private bs: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$=this.bs.breadcrumbs$
  }
  ngOnDestroy(): void
  {

  }

}
