import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrCheckInterceptor } from './errorcheck-interceptors';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrCheckInterceptor, multi: true },
];
