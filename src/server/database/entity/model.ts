import { Parameter } from './parameter';
import { Formula } from './formula';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ArrayColumn } from '../utils';

@Entity()
export class Model {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    names: string[];

    @ArrayColumn(type => Formula)
    formulas: Formula[];

    @ArrayColumn(type => Parameter)
    parameters: Parameter[];
}