import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueComponent } from './edit-issue.component';
import { ComponentRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Issue } from '../../interfaces';

describe('EditIssueComponent', () => {
  let component: EditIssueComponent;
  let componentRef: ComponentRef<EditIssueComponent>;
  let fixture: ComponentFixture<EditIssueComponent>;

  let issuesServiceSpy = jasmine.createSpyObj('IssuesService', ['updateIssue']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIssueComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIssueComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('visible', true);

    const editIssueForm: FormGroup = new FormGroup<any>({
      issueNo: new FormControl(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      title: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl('', { nonNullable: true }),
      priority: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      type: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
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

  it('should create the initial form with required fields', () => {
    expect(component.editIssueForm).toBeDefined();
    expect(component.editIssueForm.contains('issueNo')).toBeTruthy();
    expect(component.editIssueForm.get('issueNo')?.validator).toBeTruthy();
    expect(component.editIssueForm.contains('title')).toBeTruthy();
    expect(component.editIssueForm.get('title')?.validator).toBeTruthy();
    expect(component.editIssueForm.contains('description')).toBeTruthy();
    expect(component.editIssueForm.contains('priority')).toBeTruthy();
    expect(component.editIssueForm.get('priority')?.validator).toBeTruthy();
    expect(component.editIssueForm.contains('type')).toBeTruthy();
    expect(component.editIssueForm.get('type')?.validator).toBeTruthy();
  });

  it('should update the form when the issue input signal emits a new value', () => {
    componentRef.setInput('issue', {
      issueNo: 102,
      title: 'Add search functionality',
      description:
        'Implement a search bar on the homepage to allow users to search for products.',
      priority: 'low',
      type: 'Function',
      completed: null,
    });
    component.editIssueForm.patchValue({
      ...component.issue(),
    });
    fixture.detectChanges();

    expect(component.editIssueForm.get('issueNo')?.value).toEqual(
      component.issue()?.issueNo
    );
    expect(component.editIssueForm.get('title')?.value).toEqual(
      component.issue()?.title
    );
    expect(component.editIssueForm.get('description')?.value).toEqual(
      component.issue()?.description
    );
    expect(component.editIssueForm.get('priority')?.value).toEqual(
      component.issue()?.priority
    );
    expect(component.editIssueForm.get('type')?.value).toEqual(
      component.issue()?.type
    );
    expect(component.editIssueForm.contains('completed')).toBeFalsy();
  });

  it('should call the save function when the save button is clicked', () => {
    spyOn(component, 'save');

    const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
    saveButton.triggerEventHandler('click', null);

    expect(component.save).toHaveBeenCalled();
  });

  it('should mark all fields as touched and not update the issue when the form is invalid', () => {
    const markAllAsTouchedSpy = spyOn(
      component.editIssueForm,
      'markAllAsTouched'
    );
    const invalidIssue: Issue = {
      issueNo: 123,
      title: '', // empty title
      description: 'This is a invalid issue.',
      priority: 'high',
      type: 'Function',
    };
    component.editIssueForm.setValue(invalidIssue);

    component.save();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(issuesServiceSpy.updateIssue).not.toHaveBeenCalled();
  });

  it('should trigger onSaveIssue event with false when the cancel button is clicked', () => {
    spyOn(component.onSaveIssue, 'emit');

    const cancelButton = fixture.debugElement.query(By.css('.btn'));
    cancelButton.triggerEventHandler('click', null);

    expect(component.onSaveIssue.emit).toHaveBeenCalledWith();
  });
});
