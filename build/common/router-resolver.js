"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_adapter_1 = require("@nestjs/core/adapters/express-adapter");
const routes_resolver_1 = require("@nestjs/core/router/routes-resolver");
const router_proxy_1 = require("@nestjs/core/router/router-proxy");
const router_exception_filters_1 = require("@nestjs/core/router/router-exception-filters");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const router_explorer_1 = require("@nestjs/core/router/router-explorer");
const application_config_1 = require("@nestjs/core/application-config");
class RouterResolver {
    constructor(application) {
        this.application = application;
        this.routesResolver = null;
        this.allRoutes = [];
        this.routerProxy = new router_proxy_1.RouterProxy();
        this.container = application.getContainer();
        this.config = new application_config_1.ApplicationConfig(null);
        this.routesResolver = new routes_resolver_1.RoutesResolver(application.getContainer(), express_adapter_1.ExpressAdapter, this.config);
        this.routerExceptionsFilter = new router_exception_filters_1.RouterExceptionFilters(this.config);
        this.routerBuilder = new router_explorer_1.ExpressRouterExplorer(new metadata_scanner_1.MetadataScanner(), this.routerProxy, express_adapter_1.ExpressAdapter, this.routerExceptionsFilter, this.config, this.container);
    }
    resolve(routesTree) {
        const modules = this.container.getModules();
        modules.forEach(({ routes }, moduleName) => this.build(routes, moduleName, routesTree));
    }
    getRoutes() {
        return this.allRoutes;
    }
    build(routes, moduleName, routesTree) {
        routes.forEach(({ instance, metatype }) => {
            const controller = metatype;
            routesTree.forEach(route => {
                if (route.controller === controller) {
                    this.addController(metatype, instance, route);
                }
            });
        });
    }
    addController(metatype, instance, route) {
        const methods = this.getMethods(instance);
        this.allRoutes.push({
            controller: metatype,
            path: route.path,
            childrens: route.children,
            methods
        });
    }
    getMethods(instance) {
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
exports.RouterResolver = RouterResolver;
//# sourceMappingURL=router-resolver.js.map