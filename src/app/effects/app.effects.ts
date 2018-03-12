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
  LoadHeroes,
  LoadHeroesFail,
  LoadHeroesSuccess,
  GetDancer,
  GetHeroSuccess,
  GetHeroFail,
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
  @Effect()
  loadHeroes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadHeroes>(HeroActionTypes.LoadHeroes),
    concatMap(() => this.heroService.getHeroes().pipe(
      map(heroes => new LoadHeroesSuccess({ heroes: heroes })),
      catchError(err => of(new LoadHeroesFail(err)))
    ))
  );

  @Effect()
  getHero$: Observable<Action> = this.actions$.pipe(
    ofType<GetDancer>(HeroActionTypes.GetHero),
    map(action => action.payload),
    concatMap(id => this.heroService.getHero(id).pipe(
      map(hero => new GetHeroSuccess({ id, changes: hero })),
      catchError(err => of(new GetHeroFail(err)))
    ))
  );

  @Effect()
  updateHero$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateHero>(HeroActionTypes.UpdateDancer),
    concatMap(action => this.heroService.updateHero(action.payload).pipe(
      map(() => {
        const hero = action.payload;
        return new UpdateHeroSuccess({ hero: { id: hero.id, changes: hero } })
      }),
      tap(() => this.location.back()),
      catchError(err => of(new UpdateHeroFail(err)))
    ))
  );

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
    return of(new LoadHeroes())
  });

  constructor(
    private actions$: Actions,
    private heroService: HeroService,
    private location: Location
  ) {}
}
