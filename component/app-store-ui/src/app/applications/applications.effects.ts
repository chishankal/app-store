import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { mergeMap, catchError, map} from 'rxjs/operators';
import { ApplicationsService } from './applications.service';
import * as applicationsActions from './applications.actions';
import { Application, Subscription, ApplicationListResult, ApplicationDetails, SubscriptionResult } from './applications.data.models';
import { NotificationService } from '../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private service: ApplicationsService,
    private notification: NotificationService
  ) {}

  getAllApps$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetAllApplicationsAction),
    mergeMap(({payload}) => this.service.getAllApplications(payload)
      .pipe(
        map((response:ApplicationListResult) => applicationsActions.GetAllApplicationsSuccessAction({ "payload" : response})),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  getAppDetails$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetApplicationDetailsAction),
    mergeMap(({payload}) => this.service.getApplicationsDetails(payload)
      .pipe(
        map((response:ApplicationDetails) => applicationsActions.GetApplicationDetailsSuccessAction({ "payload" : response})),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ));

  appSubscriptions$ = createEffect(() => this.actions$.pipe(
    ofType(applicationsActions.GetApplicationSubscriptionsAction),
    mergeMap(({payload}) => this.service.getApplicationSubscriptions(payload)
      .pipe(
        map((response:SubscriptionResult) => applicationsActions.GetApplicationSubscriptionsSuccessAction({ "payload" : response})),
        catchError((e: HttpErrorResponse) => {
            this.notification.error(e.message);
            return EMPTY
        })
      )
    )
  ))
}
