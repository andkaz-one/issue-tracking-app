import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueListComponent } from './issue-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../interfaces';
import { signal } from '@angular/core';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let mockIssuesService: jasmine.SpyObj<IssuesService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueListComponent],
      providers: [
        provideAnimations(),
        provideToastr({
          timeOut: 5000,
          positionClass: 'toast-bottom-left',
          preventDuplicates: false,
          closeButton: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;

    mockIssuesService = jasmine.createSpyObj('IssuesService', [
      'completeIssue',
      'uncompleteIssue',
      'issues',
    ]);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should filter pending and completed issues correctly', () => {
  //   const issues: Issue[] = [
  //     {
  //       issueNo: 1,
  //       title: 'Pending Issue',
  //       description: 'Pending Issue',
  //       priority: 'low',
  //       type: 'Malfunction',
  //       completed: null,
  //     },
  //     {
  //       issueNo: 2,
  //       title: 'Completed Issue',
  //       description: 'Completed issue',
  //       priority: 'low',
  //       type: 'Documentation',
  //       completed: new Date(),
  //     },
  //   ];
  //   mockIssuesService.issues.set(issues);

  //   expect(component.pendingIssues()).toEqual([
  //     {
  //       issueNo: 1,
  //       title: 'Pending Issue',
  //       description: 'Pending Issue',
  //       priority: 'low',
  //       type: 'Malfunction',
  //       completed: null,
  //     },
  //   ]);
  //   expect(component.completedIssues()).toEqual([
  //     {
  //       issueNo: 2,
  //       title: 'Completed Issue',
  //       description: 'Completed issue',
  //       priority: 'low',
  //       type: 'Documentation',
  //       completed: new Date(),
  //     },
  //   ]);
  // });
});
