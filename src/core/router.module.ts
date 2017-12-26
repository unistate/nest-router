import { Module, DynamicModule } from '@nestjs/common';
import { RouterResolver } from '../core/helpers/router-resolver';
import { Routes } from '../common/interfaces/routes.interface';
import { PathRemapper } from '../core/helpers/path-remapper';
@Module({})
export class RouterModule {
	public static routerResolver: RouterResolver = new RouterResolver();
	public static forRoutes(routes: Routes): DynamicModule {
		RouterModule.routerResolver.resolve(routes);
		RouterModule.reMapRoutes();
		return {
			module: RouterModule,
		};
	}

	private static reMapRoutes() {
		RouterModule.routerResolver.getRoutes().forEach(route => {
			route.childrens.forEach(child => {
				const newPath = route.path + child.path;
				PathRemapper.remapPathOf(child.controller, newPath);
			});
		});
	}
}