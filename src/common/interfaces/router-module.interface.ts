import { Routes } from './routes.interface';
import { Controller, Metatype } from '@nestjs/common/interfaces';
import { RoutePathProperties } from '@nestjs/core/router/router-explorer';

export interface ConfigRoutes {
    path: string;
    controller: Controller;
    childrens: Routes;
    methods: RoutePathProperties[];
}