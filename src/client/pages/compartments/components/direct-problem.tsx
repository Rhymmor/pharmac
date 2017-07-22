import { IDirectProblemSolution } from '../../../../server/modules/model-solver';
import { DirectProblemPlot } from './direct-problem-plot';
import { IModel } from '../../../redux/reducers/formulas';
import { BoxHeader, Box } from '../../../components/layout';
import * as React from 'react';
import * as request from 'superagent';
import { Row, Col } from 'react-bootstrap';

interface IDirectProblemProps {
    model: IModel;
}

interface IDirectProblemState {
    solution: IDirectProblemSolution
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    constructor(props: IDirectProblemProps) {
        super(props);
        this.state = {
            solution: undefined
        }
    }

    send = () => {
        request
            .post('/api/model/direct-problem')
            .send({model: this.props.model})
            .end((err, res) => {
                console.log(err)
                this.setState({
                    solution: res.body
                })
            })
    }

    render() {
        return (
            <Box>
                <BoxHeader>
                    Direct problem:
                </BoxHeader>
                <Row>
                    <button onClick={this.send}>Solve</button>
                    {
                        this.state.solution && 
                        <Col xs={6}>
                            <DirectProblemPlot solution={this.state.solution}/>
                        </Col>
                    }
                </Row>
            </Box>
        );
    }
}