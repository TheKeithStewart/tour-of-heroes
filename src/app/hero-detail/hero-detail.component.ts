import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Hero } from './../models/hero.model';
import * as fromHero from './../reducers/hero.reducer';
import * as HeroActions from './../actions/hero.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromHero.State>
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new HeroActions.GetHero(id));
    this.hero$ = this.store.select(fromHero.getSelectedHero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // TODO: use effects for this and write unit tests
    // this.heroService.updateHero(this.hero)
    //   .subscribe(() => this.goBack());
  }
}
