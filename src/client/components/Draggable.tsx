import { isEven, isSameEvenness } from '../utils/utils';
import * as React from 'react';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor, DropTargetSpec,
    DropTargetMonitor, DropTargetConnector, DragSourceSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';

interface IDropTargetMonitor<T> extends DropTargetMonitor {
    getItem: () => T;
}

interface IProps {
    connectDragSource?: Function;
    connectDropTarget?: Function;
    moveCard: (dragIdx: number, dropIdx: number) => void;
    index: number;
}

interface IState {
}

interface BeginDragResult {
    index: number;
}

const cardSource: DragSourceSpec<IProps> = {
    beginDrag(props: IProps): BeginDragResult {
        return {
            index: props.index
        };
    }
};

const cardTarget: DropTargetSpec<IProps> = {
    hover(props, monitor: IDropTargetMonitor<BeginDragResult>, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
  
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
  
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        // Dragging downwards
        if (isSameEvenness(dragIndex, hoverIndex)) {
            if (dragIndex < hoverIndex && clientOffset.y < hoverBoundingRect.top - 10) {
                return;
            }
            if (dragIndex > hoverIndex && clientOffset.y > hoverBoundingRect.bottom + 10) {
                return;
            }
        } else {
            if (dragIndex < hoverIndex && clientOffset.x < hoverBoundingRect.left - 10) {
                return;
            }
            if (dragIndex > hoverIndex && clientOffset.x > hoverBoundingRect.right + 10) {
                return;
            }
        }
  
        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);
    
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};
  

function collectDrag(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),

    }
}

function collectDrop(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

class DraggableImpl extends React.Component<IProps, IState> {

    render() {
        const {connectDragSource, connectDropTarget} = this.props;
        return connectDragSource(connectDropTarget(
            <div className='draggable'>
                {this.props.children}
            </div>
        ));
    }
}

export const Draggable = DragSource('default', cardSource, collectDrag)(DropTarget('default', cardTarget, collectDrop)(DraggableImpl));