import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { 
  map,
  concatMap,
  catchError,
  tap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import {
  HeroActionTypes,
  GetHeroes,
  GetHeroesError,
  LoadHeroes,
  GetHero,
  GetHeroSuccess,
  GetHeroError,
  UpsertHero,
  UpdateHero,
  UpdateHeroSuccess,
  UpdateHeroFail,
  Search,
  SearchSuccess,
  SearchFail
} from './../actions/hero.actions';
import { HeroService } from './../hero.service';

@Injectable()
export class AppEffects {
  // TODO: unit tests
  @Effect()
  getHeroes$: Observable<Action> = this.actions$.pipe(
    ofType<GetHeroes>(HeroActionTypes.GetHeroes),
    concatMap(() => this.heroService.getHeroes().pipe(
      map(heroes => new LoadHeroes({ heroes: heroes })),
      catchError(err => of(new GetHeroesError(err)))
    ))
  );

  // TODO: unit tests
  @Effect()
  getHero$: Observable<Action> = this.actions$.pipe(
    ofType<GetHero>(HeroActionTypes.GetHero),
    map(action => action.payload),
    concatMap(id => this.heroService.getHero(id).pipe(
      map(hero => new GetHeroSuccess({ id, changes: hero })),
      catchError(err => of(new GetHeroError(err)))
    ))
  );

  // TODO: unit tests
  @Effect()
  updateHero$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateHero>(HeroActionTypes.UpdateHero),
    concatMap(action => this.heroService.updateHero(action.payload).pipe(
      map(() => {
        const hero = action.payload;
        return new UpdateHeroSuccess({ hero: { id: hero.id, changes: hero } })
      }),
      tap(() => this.location.back()),
      catchError(err => of(new UpdateHeroFail(err)))
    ))
  );

  // TODO: unit tests
  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(HeroActionTypes.Search),
    debounceTime(300),
    distinctUntilChanged(),
    concatMap((action: Search) => this.heroService.searchHeroes(action.payload).pipe(
      map(heroes => new SearchSuccess(heroes)),
      catchError(err => of(new SearchFail(err)))
    ))
  );

  // Should be your last effect
  @Effect() init$: Observable<Action> = defer(() => {
    return of(new GetHeroes())
  });

  constructor(
    private actions$: Actions,
    private heroService: HeroService,
    private location: Location
  ) {}
}
