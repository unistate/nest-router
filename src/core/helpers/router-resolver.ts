import { ExpressAdapter } from '@nestjs/core/adapters/express-adapter';
import { RoutesResolver } from '@nestjs/core/router/routes-resolver';
import { Resolver } from '@nestjs/core/router/interfaces/resolver.interface';
import { Controller, Metatype } from '@nestjs/common/interfaces';
import { RouterProxy } from '@nestjs/core/router/router-proxy';
import { RouterExceptionFilters } from '@nestjs/core/router/router-exception-filters';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { RouterExplorer } from '@nestjs/core/router/interfaces/explorer.inteface';
import { ExpressRouterExplorer, RoutePathProperties } from '@nestjs/core/router/router-explorer';
import { ConfigRoutes } from '../../common/interfaces/router-module.interface';
import { InstanceWrapper } from '@nestjs/core/injector/container';
import { Routes, Route } from '../../common/interfaces/routes.interface';

export class RouterResolver {
    public routesResolver: Resolver = null;
    public allRoutes: ConfigRoutes[] = [];
    private readonly routerProxy = new RouterProxy();
    private readonly routerExceptionsFilter: RouterExceptionFilters;
    private readonly routerBuilder: ExpressRouterExplorer;
    constructor() {
        this.routerBuilder = new ExpressRouterExplorer(
            new MetadataScanner(), this.routerProxy, ExpressAdapter,
            this.routerExceptionsFilter, null, null,
        );
    }

    public getRoutes() {
        return this.allRoutes;
    }

    public resolve(routesTree: Routes) {
        routesTree.forEach(route => {
            this.addController(route.controller, route);
        });
    }
    public addRoutes(instance: Controller, path: string) {
        const router = ExpressAdapter.createRouter();
        const express = ExpressAdapter.create();
        express.use(path, instance);
        // this.routerBuilder.applyPathsToRouterProxy(ExpressAdapter.createRouter(), this.getMethods(instance), instance, 'RouterModule');
    }
    private addController(instance: Controller, route: Route) {
        const methods = this.getMethods(instance);
        this.allRoutes.push({
            controller: instance,
            path: route.path,
            childrens: route.children,
            methods,
        });
    }
    private getMethods(instance: Controller): RoutePathProperties[] {
        const paths = this.routerBuilder.scanForPaths(instance);
        const methods = [];
        (paths || []).map((pathProperties) => {
            const { methodName } = pathProperties;
            const instancePrototype = Object.getPrototypeOf(instance);
            const singleRoute = this.routerBuilder.exploreMethodMetadata(instance, instancePrototype, methodName);
            methods.push(singleRoute);
        });
        return methods;
    }
}
