import * as React from 'react';

interface IReactLayoutProps {
    className?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class ReactLayout extends React.PureComponent<IReactLayoutProps, {}> {
    render() {
        const {className, children, onClick} = this.props;
        return (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        );
    }
}


function addCustomClassName(className: string, customClass: string) {
    return className + (customClass ? ' ' + customClass : '');
}

export class Box extends React.PureComponent<IReactLayoutProps, {}> {
    render() {
        const {className, children, onClick} = this.props;
        const layoutClass = addCustomClassName('box', className);
        return (
            <ReactLayout className={layoutClass} onClick={onClick}>
                {children}
            </ReactLayout>
        );
    }
}

export class BoxHeader extends React.PureComponent<IReactLayoutProps, {}> {
    render() {
        const {className, children} = this.props;
        const layoutClass = addCustomClassName('box-header', className);
        return (
            <ReactLayout className={layoutClass}>
                {children}
            </ReactLayout>
        );
    }
}