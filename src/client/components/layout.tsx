import * as React from 'react';

interface IReactLayoutProps {
    className: string
}

class ReactLayout extends React.PureComponent<IReactLayoutProps, {}> {
    render() {
        const {className, children} = this.props;
        return (
            <div className={className}>
                {children}
            </div>
        );
    }
}

interface ILayoutComponentsProps {
    className?: string
}

function addCustomClassName(className: string, customClass: string) {
    return className + (customClass ? ' ' + customClass : '');
}

export class Box extends React.PureComponent<ILayoutComponentsProps, {}> {
    render() {
        const {className, children} = this.props;
        const layoutClass = addCustomClassName('box', className);
        return (
            <ReactLayout className={layoutClass}>
                {children}
            </ReactLayout>
        );
    }
}

export class BoxHeader extends React.PureComponent<ILayoutComponentsProps, {}> {
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