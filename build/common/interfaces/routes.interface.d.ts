import { Controller } from "@nestjs/common/interfaces";
export interface Route {
    path: string;
    controller?: Controller;
    redirectTo?: string;
    children?: Routes;
}
export declare type Routes = Route[];
