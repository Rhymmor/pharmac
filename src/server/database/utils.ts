import { Column } from "typeorm";



export function ArrayColumn(type: (type?: any) => Function) {
    return Column(type, {isArray: true} as any);
}