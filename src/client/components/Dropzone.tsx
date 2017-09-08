import * as React from 'react';
const ReactDropzone = require('react-dropzone');

interface IDropzoneProps {
    className?: string
    onDrop: (files: any[]) => void
    onClick?: (e: any) => void
    id?: string
}

export class Dropzone extends React.PureComponent<IDropzoneProps, {}> {
    constructor(props: IDropzoneProps) {
        super(props);
    }

    render() {
        let {onDrop, className, onClick, id, children} = this.props;
        return (
            <ReactDropzone onDrop={onDrop} className={className} id={id} onClick={onClick}>
                {children}
            </ReactDropzone>
        );
    }
}