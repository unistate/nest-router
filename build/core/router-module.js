"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_resolver_1 = require("../common/router-resolver");
const path_remapper_1 = require("../core/path-remapper");
class RouterModule {
    constructor(application) {
        this.application = application;
        this.routerResolver = new router_resolver_1.RouterResolver(application);
    }
    forRoutes(routes) {
        this.routerResolver.resolve(routes);
        this.reMapRoutes();
    }
    reMapRoutes() {
        this.routerResolver.getRoutes().forEach(route => {
            route.childrens.forEach(child => {
                const newPath = route.path + child.path;
                path_remapper_1.PathRemapper.remapPathOf(child.controller, newPath);
            });
        });
    }
}
exports.RouterModule = RouterModule;
//# sourceMappingURL=router-module.js.map