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
    labels: string[];
}

interface IState {
    order?: number[];
}

function checkLength(children: IProps["children"], labels: IProps["labels"]) {
    return checkArraysLength(children, labels) || labels.length === 1;
}

class SolutionResultsImpl extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        if (_.isArray(props.children) && (props.children.length !== props.labels.length)) {
            throw "The list of labels length should be equal to the list of components length";
        }
        this.state = {
            order: _.isArray(props.children) ? _.map(props.children, (x, i) => i) : [0]
        }
    }

    moveCard = (dragIdx: number, dropIdx: number) => {
        this.setState({order: swap(this.state.order, dragIdx, dropIdx)});
    }

    render() {
        const {children, labels} = this.props;
        const {order} = this.state;
        return (
            <Row>
                {
                    _.isArray(children)
                    ? (
                        _.map(order, (idx, i) => (
                                <Col xs={6} key={i}>
                                    <Draggable moveCard={this.moveCard} index={i}>
                                        <Box>
                                            <BoxHeader>{labels[idx] || ""}</BoxHeader>
                                            {children[idx]}
                                        </Box>
                                    </Draggable>
                                </Col>
                        ))
                    )
                    : (
                        <Col xs={6}>
                            <Box>
                                <BoxHeader>{labels[0] || ""}</BoxHeader>
                                {children}
                            </Box>
                        </Col>
                    )
                    
                }
            </Row>
        );
    }
}

export const SolutionResults = DragDropContext(HTML5Backend)(SolutionResultsImpl);