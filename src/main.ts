import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideState, provideStore } from '@ngrx/store';
import { filterReducer } from './app/store/filter.reducer';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {})
  .catch((err) => console.error(err));
