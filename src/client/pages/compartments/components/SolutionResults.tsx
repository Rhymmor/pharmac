import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Box, BoxHeader } from '../../../components';

interface ISolutionResultsProps {
    children: React.ReactElement<any> | React.ReactElement<any>[];
    labels: string[];
}

interface ISolutionResultsState {
}

export class SolutionResults extends React.Component<ISolutionResultsProps, ISolutionResultsState> {

    render() {
        const {children, labels} = this.props;
        return (
            <Row>
                {
                    (children as any).length 
                    ? (
                        _.map(children as React.ReactElement<any>[], (child, i) => (
                            <Col xs={6} key={i}>
                                <Box>
                                    <BoxHeader>{labels[i] || ""}</BoxHeader>
                                    {child}
                                </Box>
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
