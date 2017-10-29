import { safeGet } from '../../../../../lib/utils';
import { saveFile } from '../../../../utils';
import * as React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {generate} from 'shortid';
import {findDOMNode} from 'react-dom';
const {toBlob} = require('dom-to-image');
import * as _ from 'lodash';

interface IProps {
    parentId: string;
}

interface IState {
    id?: string;
    element?: HTMLElement;
}

export class ImageSave extends React.PureComponent<IProps, IState> {
    private static FILE_NAME = 'plot';

    private saveOptions = {
        bgcolor: '#fff'
    }


    constructor(props: IProps) {
        super(props);
        this.state = {
            id: generate(),
            element: this.getElement()
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
      this.setState(() => ({element: this.getElement()}));
    }

    private getElement = (): HTMLElement => {
        return safeGet(document.getElementById(this.props.parentId), x => x.children[0]) as HTMLElement;
    }
    
    private saveAsPng = () => {
        const {element} = this.state;
        if (element) {
            toBlob(element, this.saveOptions).then(function (blob: Buffer) {
                saveFile({
                    data: blob,
                    type: 'image/png',
                    fileName: ImageSave.FILE_NAME + '.png'
                });
            });
        }
    }

    private saveAsSvg = () => {
        const {element} = this.state;
        if (element) {
            const preparedElement = element.cloneNode(true) as HTMLElement;
            preparedElement.style.backgroundColor = this.saveOptions.bgcolor;
            const svgURL = new XMLSerializer().serializeToString(preparedElement);
            saveFile({
                data: svgURL,
                type: "image/svg+xml;charset=utf-8",
                fileName: ImageSave.FILE_NAME + ".svg"
            });
        }

    }
    
    render() {
        return (
            <DropdownButton 
                id={this.state.id}
                title={<span className='fa fa-save'/> as any}
                className='transp-button'
            >
                <MenuItem onClick={this.saveAsPng}>Save as png</MenuItem>
                <MenuItem onClick={this.saveAsSvg}>Save as svg</MenuItem>
            </DropdownButton>
        );
    }
}
