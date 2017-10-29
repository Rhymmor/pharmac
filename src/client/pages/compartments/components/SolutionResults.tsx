import { Draggable } from '../../../components/Draggable';

import { checkArraysLength, ReactChildren, swap } from '../../../utils/utils';
import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Box, BoxHeader } from '../../../components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface IProps {
    children: ReactChildren;
}

interface IState {
    order?: number[];
}

class SolutionResultsImpl extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            order: _.isArray(props.children) ? _.map(props.children, (x, i) => i) : [0]
        }
    }

    moveCard = (dragIdx: number, dropIdx: number) => {
        this.setState({order: swap(this.state.order, dragIdx, dropIdx)});
    }

    render() {
        const {children} = this.props;
        const {order} = this.state;
        return (
            <Row>
                {
                    _.isArray(children)
                    ? (
                        _.map(order, (idx, i) => (
                            <Col xs={6} key={i}>
                                <Draggable moveCard={this.moveCard} index={i}>
                                {children[idx]}
                                </Draggable>
                            </Col>
                        ))
                    )
                    : (
                        <Col xs={6}>
                            {children}
                        </Col>
                    )
                }
            </Row>
        );
    }
}

export const SolutionResults = DragDropContext(HTML5Backend)(SolutionResultsImpl);