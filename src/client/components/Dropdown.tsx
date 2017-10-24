import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import * as classnames from 'classnames';
import {map} from 'lodash';
import {generate} from 'shortid';

type ObjectType = {[key: string]: string};

interface IDropdownProps {
    value: string;
    tooltips?: ObjectType;
    names: ObjectType;
    label?: string;
    modify: (value: string) => void;
    id?: string;
    className?: string;
}

interface IDropdownState {
}

export class Dropdown extends React.Component<IDropdownProps, IDropdownState> {

    renderItems = () => {
        const {names, tooltips, modify} = this.props;
        return map(names, (value, key) => (
            <MenuItem 
                key={key}
                onClick={() => modify(key)}
            >
                <span title={tooltips && tooltips[key]}>{value}</span>
            </MenuItem>
        ))
    }

    render() {
        const {value, label, tooltips, names, id, className} = this.props;
        return (
            <div className={classnames("methods-dropdown", "inline-block", className)} title={tooltips && tooltips[value]}>
                { label && <span>{label}</span> }
                <DropdownButton
                    id={id || generate()}
                    title={names[value]}
                    className={classnames("methods-dropdown-button", "direct-problem-input")}
                >
                    {this.renderItems()}
                </DropdownButton>
            </div>
        );
    }
}
