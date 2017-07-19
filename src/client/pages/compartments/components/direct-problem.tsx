import { BoxHeader, Box } from '../../../components/layout';
import * as React from 'react';

interface IDirectProblemProps {
}

interface IDirectProblemState {
}

export class DirectProblem extends React.PureComponent<IDirectProblemProps, IDirectProblemState> {
    render() {
        return (
            <Box>
                <BoxHeader>
                    Direct problem:
                </BoxHeader>
                <div>
                    
                </div>
            </Box>
        );
    }
}