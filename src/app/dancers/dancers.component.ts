import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Dancer } from './../models/dancer.model';
import * as fromDancer from './../reducers';
import * as DancerActions from './../actions/dancer.actions';

@Component({
  selector: 'app-dancers',
  templateUrl: './dancers.component.html',
  styleUrls: ['./dancers.component.css']
})
export class DancersComponent implements OnInit {
  dancers$: Observable<Dancer[]>;
  dancerIds: number[] = [];

  constructor(private store: Store<fromDancer.State>) { }

  ngOnInit() {
    this.getDancers();
  }

  getDancers(): void {
    this.dancers$ = this.store.select(fromDancer.getAllDancers);
    // TODO: need to manage this subscription better (#7)
    this.store.select(fromDancer.getDancerIdState)
      .subscribe((ids: number[]) => this.dancerIds = ids);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    const nextId = this.dancerIds.length > 0 ? Math.max(...this.dancerIds) + 1 : 0;
    // TODO: add effect and unit tests around adding a dancer (#9)
    this.store.dispatch(new DancerActions.AddDancer({
      dancer: {
        id: nextId,
        name: name,
        ratings: {
          moonwalk: 1,
          sprinkler: 1,
          worm: 1,
          disco: 1
        }
      }
    }));
  }

  delete(dancer: Dancer): void {
    this.store.dispatch(new DancerActions.DeleteDancer({ id: dancer.id }))
  }

}
