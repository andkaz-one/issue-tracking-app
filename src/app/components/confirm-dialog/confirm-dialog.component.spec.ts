import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ClarityModule } from '@clr/angular';
import { By } from '@angular/platform-browser';
import { ComponentRef, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let componentRef: ComponentRef<ConfirmDialogComponent>;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityModule, ConfirmDialogComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('visible', true);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial visibility state', () => {
    componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(component.visible()).toBeFalse();

    componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(component.visible()).toBeTrue();
  });

  it('should emit true when agree is called', () => {
    spyOn(component.confirmation, 'emit');

    component.agree();

    expect(component.confirmation.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when disagree is called', () => {
    spyOn(component.confirmation, 'emit');

    component.disagree();

    expect(component.confirmation.emit).toHaveBeenCalledWith(false);
  });

  it('should call agree method when agree button is clicked', () => {
    spyOn(component, 'agree');

    const agreeButton = fixture.debugElement.query(By.css('.btn-danger'));
    agreeButton.triggerEventHandler('click', null);

    expect(component.agree).toHaveBeenCalled();
  });

  it('should call disagree method when disagree button is clicked', () => {
    spyOn(component, 'disagree');

    const disagreeButton = fixture.debugElement.query(By.css('.btn-outline'));
    disagreeButton.triggerEventHandler('click', null);

    expect(component.disagree).toHaveBeenCalled();
  });
});
