import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Hero } from './../models/hero.model';
import * as fromHero from './../reducers/hero.reducer';
import * as HeroActions from './../actions/hero.actions';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  heroIds: number[] = [];

  constructor(private store: Store<fromHero.State>) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.store.select(fromHero.getAllHeroes);
    this.store.select(fromHero.getHeroIdState)
      .subscribe((ids: number[]) => this.heroIds = ids);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    
    const nextId = this.heroIds.length > 0 ? Math.max(...this.heroIds) + 1 : 0;
    this.store.dispatch(new HeroActions.AddHero({ hero: { id: nextId, name: name } }))
  }

  delete(hero: Hero): void {
    this.store.dispatch(new HeroActions.DeleteHero({ id: hero.id }))
  }

}
