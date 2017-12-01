import { NestFactoryStatic } from '@nestjs/core';
import { Resolver } from '@nestjs/core/router/interfaces/resolver.interface';
import { NestContainer, InstanceWrapper } from '@nestjs/core/injector/container';
import { Controller } from '@nestjs/common/interfaces';
import { Routes } from './interfaces/routes.interface';
import { ConfigRoutes } from './interfaces/router-module.interface';
export declare class RouterResolver {
    private readonly application;
    routesResolver: Resolver;
    container: NestContainer;
    allRoutes: ConfigRoutes[];
    private readonly routerProxy;
    private readonly routerExceptionsFilter;
    private readonly routerBuilder;
    private readonly config;
    constructor(application: NestFactoryStatic);
    resolve(routesTree: Routes): void;
    getRoutes(): ConfigRoutes[];
    build(routes: Map<string, InstanceWrapper<Controller>>, moduleName: string, routesTree: Routes): void;
    private addController(metatype, instance, route);
    private getMethods(instance);
}
