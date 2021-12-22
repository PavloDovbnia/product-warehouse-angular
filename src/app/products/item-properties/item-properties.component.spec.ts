import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemPropertiesComponent} from './properties.component';

describe('PropertiesComponent', () => {
  let component: ItemPropertiesComponent;
  let fixture: ComponentFixture<ItemPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemPropertiesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
