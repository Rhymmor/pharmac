import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

export class Formula {
    @Column()
    id: string;

    @Column()
    text: string;

    @Column()
    initialValue: number;
}