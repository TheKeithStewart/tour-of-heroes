import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Dancer } from './../models/dancer.model';

import * as fromDancer from './../reducers';
import * as DancerActions from './../actions/dancer.actions';

import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-dancer-search',
  templateUrl: './dancer-search.component.html',
  styleUrls: ['./dancer-search.component.css']
})
export class DancerSearchComponent implements OnInit {
  dancers$: Observable<Dancer[]>;

  constructor(private store: Store<fromDancer.State>) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.store.dispatch(new DancerActions.Search(term));
  }

  ngOnInit(): void {
    this.dancers$ = this.store.select(fromDancer.getSearchResult);
  }
}
