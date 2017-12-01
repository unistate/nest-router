import { IRouterModule } from "../common/interfaces/router-module.interface";
import { Routes } from "../common/interfaces/routes.interface";
import { NestFactoryStatic } from "@nestjs/core";
import { RouterResolver } from "../common/router-resolver";
export declare class RouterModule implements IRouterModule {
    private readonly application;
    routerResolver: RouterResolver;
    constructor(application: NestFactoryStatic);
    forRoutes(routes: Routes): void;
    private reMapRoutes();
}
