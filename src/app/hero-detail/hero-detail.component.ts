import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, filter, take } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Hero } from './../models/hero.model';
import * as fromHero from './../reducers';
import * as HeroActions from './../actions/hero.actions';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  
  ratings: {
    moonwalk: number;
    sprinkler: number;
    worm: number;
    disco: number;
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromHero.State>,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new HeroActions.GetHero(id));
    this.store.select(fromHero.getSelectedHero).pipe(
      filter(hero => hero && hero.id === id),
      take(1),
      tap(hero => {
        this.hero = { ...hero };
        this.ratings = { ...hero.ratings };
      })
    ).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const hero: Hero = {
      ...this.hero,
      ratings: {
        ...this.ratings
      }
    };
    this.store.dispatch(new HeroActions.UpdateHero(hero));
  }
}
