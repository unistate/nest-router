export class PathRemapper {

    public static remapPathOf(target, path) {
         Reflect.defineMetadata('path', path, target);
    }
}