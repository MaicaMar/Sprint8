import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoolCalendarComponent } from './fool-calendar.component';

describe('FullCalendarComponent', () => {
  let component: FoolCalendarComponent;
  let fixture: ComponentFixture<FoolCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoolCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoolCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
