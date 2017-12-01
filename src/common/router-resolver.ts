import { NestFactory, NestFactoryStatic } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/core/adapters/express-adapter';
import { RoutesResolver } from '@nestjs/core/router/routes-resolver';
import { Resolver } from '@nestjs/core/router/interfaces/resolver.interface';
import { NestContainer, InstanceWrapper } from '@nestjs/core/injector/container';
import { Controller, Metatype } from '@nestjs/common/interfaces';
import { RouterProxy } from '@nestjs/core/router/router-proxy';
import { RouterExceptionFilters } from '@nestjs/core/router/router-exception-filters';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { RouterExplorer } from '@nestjs/core/router/interfaces/explorer.inteface';
import { ExpressRouterExplorer, RoutePathProperties } from '@nestjs/core/router/router-explorer';
import { ApplicationConfig } from '@nestjs/core/application-config';
import { Routes, Route } from './interfaces/routes.interface';
import { ConfigRoutes } from './interfaces/router-module.interface';

export class RouterResolver {
    public routesResolver: Resolver = null;
    public container: NestContainer;
    public allRoutes: ConfigRoutes[] = [];
    private readonly routerProxy = new RouterProxy();
    private readonly routerExceptionsFilter: RouterExceptionFilters;
    private readonly routerBuilder: ExpressRouterExplorer;
    private readonly config: ApplicationConfig;
    constructor(private readonly application: NestFactoryStatic) {
        this.container = application.getContainer();
        this.config = new ApplicationConfig(null);
        this.routesResolver = new RoutesResolver(application.getContainer(), ExpressAdapter, this.config);
        this.routerExceptionsFilter = new RouterExceptionFilters(this.config);
        this.routerBuilder = new ExpressRouterExplorer(
            new MetadataScanner(), this.routerProxy, ExpressAdapter,
            this.routerExceptionsFilter, this.config, this.container,
        );
    }

    public resolve(routesTree: Routes) {
        const modules = this.container.getModules();
        modules.forEach(({ routes }, moduleName) => this.build(routes, moduleName, routesTree));
    }

    public getRoutes() {
        return this.allRoutes;
    }

    public build(routes: Map<string, InstanceWrapper<Controller>>, moduleName: string, routesTree: Routes) {
        routes.forEach(({ instance, metatype }) => {
            const controller = metatype;
            routesTree.forEach(route => {
                if (route.controller === controller) {
                    this.addController(metatype, instance, route)
                }
            })
        });
    }

    private addController(metatype: Metatype<Controller>, instance: Controller, route: Route) {
        const methods = this.getMethods(instance);
        this.allRoutes.push({
            controller: metatype,
            path: route.path,
            childrens: route.children,
            methods
        })
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
        return methods
    }
}
