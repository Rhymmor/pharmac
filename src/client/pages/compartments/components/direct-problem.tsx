import { IModel } from '../../../redux/reducers/formulas';
import { BoxHeader, Box } from '../../../components/layout';
import * as React from 'react';
import * as request from 'superagent';

interface IDirectProblemProps {
    model: IModel;
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    send = () => {
        request
            .post('/api/model/direct-problem')
            .send({model: this.props.model})
            .end((err, res) => {
                console.log(err)
                console.log(res)
            })
    }

    render() {
        return (
            <Box>
                <BoxHeader>
                    Direct problem:
                </BoxHeader>
                <div>
                    <button onClick={this.send}>Solve</button>
                </div>
            </Box>
        );
    }
}