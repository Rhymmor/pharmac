import { KeyValueType } from '../table/KeyValueTable';
import { safeGet } from '../../../../../lib/utils';
import { saveFile } from '../../../../utils';
import * as React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {generate} from 'shortid';
import {findDOMNode} from 'react-dom';
const {toBlob} = require('dom-to-image');
import * as _ from 'lodash';

interface IProps {
    parameters: KeyValueType[];
}

interface IState {
    id?: string;
}

export class TableSave extends React.PureComponent<IProps, IState> {
    private static FILE_NAME = 'results';

    constructor(props: IProps) {
        super(props);
        this.state = {
            id: generate()
        };
    }
    
    private saveAsPlain = () => {
        saveFile({
            data: this.formatTable(),
            type: 'text/plain',
            fileName: TableSave.FILE_NAME + '.txt'
        })
    }
    
    private saveAsJSON = () => {
        saveFile({
            data: JSON.stringify(this.props.parameters),
            type: 'application/json',
            fileName: TableSave.FILE_NAME + '.json'
        })
    }

    private formatTable = () => {
        return _
            .map(this.props.parameters, ({key, value}) => `${key}\t${value}\r\n`)
            .reduce((prev, next) => prev + next, '')
    }

    render() {
        return (
            <DropdownButton 
                id={this.state.id}
                title={<span className='fa fa-save'/> as any}
                className='transp-button'
            >
                <MenuItem onClick={this.saveAsPlain}>Save as plain text</MenuItem>
                <MenuItem onClick={this.saveAsJSON}>Save as JSON</MenuItem>
            </DropdownButton>
        );
    }
}
