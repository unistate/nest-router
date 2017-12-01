import { IRouterModule, ConfigRoutes } from "../common/interfaces/router-module.interface";
import { Routes } from "../common/interfaces/routes.interface";
import { NestFactoryStatic } from "@nestjs/core";
import { RouterResolver } from "../common/router-resolver";
import { PathRemapper } from '../core/path-remapper'
export class RouterModule implements IRouterModule {
    public routerResolver: RouterResolver;
    constructor(private readonly application: NestFactoryStatic) {
        this.routerResolver = new RouterResolver(application);
    }
    public forRoutes(routes: Routes) {
        this.routerResolver.resolve(routes);
        this.reMapRoutes();
    }

    private reMapRoutes() {
        this.routerResolver.getRoutes().forEach(route => {
            route.childrens.forEach(child => {
                const newPath = route.path + child.path;
                PathRemapper.remapPathOf(child.controller, newPath);
            })
        })
    }
}