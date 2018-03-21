#### Tasks ####

* [Task 1](./task-1.md)
* **Task 2 <-**
* [Task 3](./task-3.md)
* [Task 4 (optional)](./task-4.md)

### Description ###

At this point we have created an effect and a unit test for that effect that ensures if a dance battle successfully completes that the `BattleOutcomeDetermined` action is returned. But what if there is an error thrown for some reason when the battle is being processed? Next we will handle when the battle has failed.

### Steps ###

The completed test should look like this:

```ts
describe('battle$', () => {
	/* ... */

	it('should return a BattleFail if there is an error when processing the battle', () => {
		const error = 'When you error I will catch you (I will be waiting time after time)';
		const challenger = new Dancer();
		const challengee = new Dancer();
		const action = new Battle({
			challenger: challenger,
			challengee: challengee
		});
		const completion = new BattleFail(error);

		actions$.stream = hot('-a', { a: action });
		const battle = cold('-#', { }, error);
		const expected = cold('--c', { c: completion });
		dancerService.determineBattleWinnerByCategory.and.returnValue(battle);

		expect(effects.battle$).toBeObservable(expected);
	});
});
```

The updated Effect should like like this:

```ts
@Effect()
battle$: Observable<Action> = this.actions$.pipe(
	ofType<Battle>(ChallengeActionTypes.Battle),
	switchMap(action => this.dancerService.determineBattleWinnerByCategory(action.payload.challenger, action.payload.challengee).pipe(
		map((outcome: BattleOutcome) => new BattleOutcomeDetermined(outcome)),
		catchError(err => of(new BattleFail(err)))
	))
);
```