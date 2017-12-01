"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathRemapper {
    static remapPathOf(target, path) {
        Reflect.defineMetadata('path', path, target);
    }
}
exports.PathRemapper = PathRemapper;
//# sourceMappingURL=path-remapper.js.map