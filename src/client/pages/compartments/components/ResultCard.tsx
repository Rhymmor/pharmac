import { Box, BoxHeader } from '../../../components';
import * as React from 'react';

interface IProps {
    label: string;
    SaveButton?: JSX.Element;
}

interface IState {
}

export class ResultCard extends React.PureComponent<IProps, IState> {
    render() {
        const {label, children, SaveButton} = this.props;
        return (
            <Box>
                <BoxHeader className='clearfix'>
                    <div className='float-left'>
                        {label}
                    </div>
                    {
                        SaveButton &&
                        <div className='float-right'>
                            {SaveButton}
                        </div>
                    }
                </BoxHeader>
                {children}
            </Box>
        );
    }
}
