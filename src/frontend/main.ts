import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './public/components/hello_world/hello_world.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
