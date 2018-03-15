import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceChallengeComponent } from './dance-challenge.component';

describe('DanceChallengeComponent', () => {
  let component: DanceChallengeComponent;
  let fixture: ComponentFixture<DanceChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanceChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
