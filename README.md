# Nest Router
🔀 Router Module For Nestjs Framework 🐯


![UC](https://www.gannett-cdn.com/-mm-/438112d08852a5cf64fb668899b62a1c6abcfadb/c=0-104-5312-3105&r=x1683&c=3200x1680/local/-/media/2017/05/23/WIGroup/Appleton/636311326049773956-UC.jpg)

It still under construction, but here is a simple example of what I Do

```typescript
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { RouterModule, Routes } from '../' // it's what we are building
import { CatsController } from './app/cats/cats.controller';
import { DogsController } from './app/dogs/dogs.controller';
import { NinjaController } from './app/ninja/ninja.controller';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const routes: Routes = [{
    path: '/ninja',
    controller: NinjaController,
    children: [{
      path: '/dogs',
      controller: DogsController
    }, {
      path: '/cats',
      controller: CatsController
    }]
  }]
  new RouterModule(NestFactory).forRoutes(routes);
  await app.listen(3000);
}
bootstrap();
```

the result will be

```bash
- /ninja
-- /dogs
-- /cats
```

```
/ninja -> NinjaController
/ninja/dogs -> DogsController
/ninja/cats -> CatsController
```

You get the Idea ..


