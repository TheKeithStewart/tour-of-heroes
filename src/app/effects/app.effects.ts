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
  DancerActionTypes,
  LoadDancers,
  LoadDancersFail,
  LoadDancersSuccess,
  GetDancer,
  GetDancerSuccess,
  GetDancerFail,
  UpsertDancer,
  UpdateDancer,
  UpdateDancerSuccess,
  UpdateDancerFail,
  Search,
  SearchSuccess,
  SearchFail
} from './../actions/dancer.actions';
import { DancerService } from './../dancer.service';

@Injectable()
export class AppEffects {
  @Effect()
  loadDancers$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDancers>(DancerActionTypes.LoadDancers),
    concatMap(() => this.dancerService.getDancers().pipe(
      map(dancers => new LoadDancersSuccess({ dancers: dancers })),
      catchError(err => of(new LoadDancersFail(err)))
    ))
  );

  @Effect()
  getDancer$: Observable<Action> = this.actions$.pipe(
    ofType<GetDancer>(DancerActionTypes.GetDancer),
    map(action => action.payload),
    concatMap(id => this.dancerService.getDancer(id).pipe(
      map(dancer => new GetDancerSuccess({ id, changes: dancer })),
      catchError(err => of(new GetDancerFail(err)))
    ))
  );

  @Effect()
  updateDancer$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateDancer>(DancerActionTypes.UpdateDancer),
    concatMap(action => this.dancerService.updateDancer(action.payload).pipe(
      map(() => {
        const dancer = action.payload;
        return new UpdateDancerSuccess({ dancer: { id: dancer.id, changes: dancer } })
      }),
      tap(() => this.location.back()),
      catchError(err => of(new UpdateDancerFail(err)))
    ))
  );

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(DancerActionTypes.Search),
    debounceTime(300),
    distinctUntilChanged(),
    concatMap((action: Search) => this.dancerService.searchDancers(action.payload).pipe(
      map(dancers => new SearchSuccess(dancers)),
      catchError(err => of(new SearchFail(err)))
    ))
  );

  // Should be your last effect
  @Effect() init$: Observable<Action> = defer(() => {
    return of(new LoadDancers())
  });

  constructor(
    private actions$: Actions,
    private dancerService: DancerService,
    private location: Location
  ) { }
}
