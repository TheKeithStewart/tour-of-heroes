import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, filter, take } from 'rxjs/operators';

import { Hero } from './../models/hero.model';
import * as fromHero from './../reducers/hero.reducer';
import * as HeroActions from './../actions/hero.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(private route: ActivatedRoute, private store: Store<fromHero.State>) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new HeroActions.GetHero(id));
    this.store.select(fromHero.getSelectedHero).pipe(
      filter(hero => hero && hero.id === id),
      take(1),
      tap(hero => this.hero = { ...hero })
    ).subscribe();
  }

  save(): void {
    this.store.dispatch(new HeroActions.UpdateHero(this.hero));
  }
}
