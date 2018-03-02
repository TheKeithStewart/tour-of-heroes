import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { 
  map,
  concatMap,
  catchError
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import {
  HeroActionTypes,
  GetHeroes,
  GetHeroesError,
  LoadHeroes
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

  // Should be your last effect
  @Effect() init$: Observable<Action> = defer(() => {
    return of(new GetHeroes())
  });

  constructor(private actions$: Actions, private heroService: HeroService) {}
}
