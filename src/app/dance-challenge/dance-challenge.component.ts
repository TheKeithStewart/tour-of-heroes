import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromDancer from './../reducers';
import * as ChallengeActions from './../actions/challenge.actions';
import { Dancer } from '../models/dancer.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dance-challenge',
  templateUrl: './dance-challenge.component.html',
  styleUrls: ['./dance-challenge.component.css']
})
export class DanceChallengeComponent implements OnInit, OnDestroy {
  challenger$: Observable<Dancer>;
  challengee$: Observable<Dancer>;
  potentialChallengees$: Observable<Dancer[]>;
  challengersAreChosen$: Observable<boolean>;
  battleInProgress$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<fromDancer.State>) { }

  ngOnInit() {
    // set challenger
    this.route.params.subscribe(params => {
      this.store.dispatch(new ChallengeActions.SetChallenger(+params.id));
    });

    // select the challenger, array of potential challengees, and challengee
    this.challenger$ = this.store.select(fromDancer.getSelectedChallenger);
    this.challengee$ = this.store.select(fromDancer.getSelectedChallengee);
    this.potentialChallengees$ = this.store.select(fromDancer.getPotentialChallengees);
    this.challengersAreChosen$ = this.store.select(fromDancer.getChallengersAreChosen);
    this.battleInProgress$ = this.store.select(fromDancer.getBattleInProgress);
  }

  ngOnDestroy() {
    // clear the challenge
    this.store.dispatch(new ChallengeActions.ClearChallenge());
  }

  setChallengee(id: number) {
    this.store.dispatch(new ChallengeActions.SetChallengee(id));
  }

  battle() {
    this.store.dispatch(new ChallengeActions.Battle());
  }
}
