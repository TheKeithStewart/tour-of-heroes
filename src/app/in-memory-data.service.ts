import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Madonna', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 2, name: 'Micheal Jackson', ratings: {
        moonwalk: 10,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 3, name: 'Axel Rose', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 4, name: 'Susanna Hoffs', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 5, name: 'Debbie Harry', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 6, name: 'David Bowie', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 7, name: 'Mick Jagger', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 8, name: 'Stevie Nicks', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 9, name: 'Elton John', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } },
      { id: 10, name: 'James Hetfield', ratings: {
        moonwalk: 1,
        sprinkler: 2,
        worm: 3,
        disco: 4
      } }
    ];
    return { heroes };
  }
}
