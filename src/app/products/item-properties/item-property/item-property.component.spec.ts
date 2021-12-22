import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemPropertyComponent} from './item-property.component';

describe('ItemPropertyComponent', () => {
  let component: ItemPropertyComponent;
  let fixture: ComponentFixture<ItemPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemPropertyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
