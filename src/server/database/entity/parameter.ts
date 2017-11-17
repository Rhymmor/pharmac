import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

export class Parameter {
    @Column()
    name: string;

    @Column()
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
} 