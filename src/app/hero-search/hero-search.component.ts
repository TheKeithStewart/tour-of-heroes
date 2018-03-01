import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Hero } from './../models/hero.model';

import * as fromHero from './../reducers';
import * as HeroActions from './../actions/hero.actions';

import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<fromHero.State>) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.store.dispatch(new HeroActions.Search(term));
  }

  ngOnInit(): void {
    this.heroes$ = this.store.select(fromHero.getSearchResult);
  }
}
