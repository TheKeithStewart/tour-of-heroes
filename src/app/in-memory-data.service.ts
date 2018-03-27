import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Dancer } from './models/dancer.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dancers: Dancer[] = [
      {
        id: 1, name: 'Madonna', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/madonna.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 2, name: 'Michael Jackson', ratings: {
          moonwalk: 10,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/michealJackson.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 3, name: 'Axel Rose', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/axelRose.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 4, name: 'Susanna Hoffs', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/susannaHoffs.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 5, name: 'Debbie Harry', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/debbieHarry.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 6, name: 'David Bowie', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/davidBowie.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 7, name: 'Mick Jagger', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/mickJagger.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 8, name: 'Stevie Nicks', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/stevieNicks.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 9, name: 'Elton John', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/eltonJohn.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      },
      {
        id: 10, name: 'James Hetfield', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/jamesHetfield.jpg',
          danceUrl: 'assets/testPic2.png'
        }
      }
    ];
    return { dancers };
  }
}
