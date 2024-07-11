import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import withFetch

import { routes } from './app.routes'; // Adjust path as necessary

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provide your application routes
    provideClientHydration(), // Provide client hydration if needed
    provideHttpClient(withFetch()), // Provide HttpClient with fetch support
    // Add other global providers as needed
  ],
};
