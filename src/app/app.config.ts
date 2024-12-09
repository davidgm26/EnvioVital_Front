// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration()
    , provideAnimationsAsync(), provideAnimationsAsync(),
     provideAnimationsAsync(), provideAnimationsAsync(),
      provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withFetch()),provideToastr(
      {
        timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),BrowserAnimationsModule]
  }
