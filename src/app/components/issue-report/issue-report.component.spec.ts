import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueReportComponent } from './issue-report.component';
import { IssuesService } from '../../services/issues.service';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentRef } from '@angular/core';
import { Issue } from '../../interfaces';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('IssueReportComponent', () => {
  let component: IssueReportComponent;
  let componentRef: ComponentRef<IssueReportComponent>;
  let fixture: ComponentFixture<IssueReportComponent>;
  let mockIssuesService: jasmine.SpyObj<IssuesService>;

  beforeEach(async () => {
    mockIssuesService = jasmine.createSpyObj('IssuesService', [
      'getSuggestions',
      'createIssue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ClarityModule,
        CommonModule,
        ReactiveFormsModule,
        IssueReportComponent,
      ],
      providers: [{ provide: IssuesService, useValue: mockIssuesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueReportComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.issueReportForm.value).toEqual({
      title: '',
      description: '',
      priority: '',
      type: '',
    });
  });

  it('should fetch suggestions when the title changes', () => {
    const mockSuggestions: Issue[] = [
      {
        issueNo: 1,
        title: 'Suggestion 1',
        description: 'Lorem ipsum',
        priority: 'low',
        type: 'Malfunction',
        completed: null,
      },
    ];

    mockIssuesService.getSuggestions.and.returnValue(mockSuggestions);

    component.issueReportForm.controls.title.setValue('Suggestion');
    expect(mockIssuesService.getSuggestions).toHaveBeenCalledWith('Suggestion');
    expect(component.suggestions).toEqual(mockSuggestions);
  });

  it('should mark the form as touched and not add an issue if the form is invalid', () => {
    spyOn(component.issueReportForm, 'markAllAsTouched');

    component.addIssue();

    expect(component.issueReportForm.markAllAsTouched).toHaveBeenCalled();
    expect(mockIssuesService.createIssue).not.toHaveBeenCalled();
  });

  it('should call createIssue and emit closeFormHandler when the form is valid', () => {
    spyOn(component.closeFormHandler, 'emit');

    component.issueReportForm.setValue({
      title: 'New Issue',
      description: 'Description of the issue',
      priority: 'high',
      type: 'Function',
    });

    component.addIssue();

    expect(mockIssuesService.createIssue).toHaveBeenCalledWith({
      title: 'New Issue',
      description: 'Description of the issue',
      priority: 'high',
      type: 'Function',
    } as Issue);
    expect(component.closeFormHandler.emit).toHaveBeenCalled();
  });
});
