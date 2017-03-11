import * as React from 'react';

import {Box, BoxHeader} from '../../components'

interface ICompartmentsProps {

}

interface ICompartmentsState {
    
}

export class Compartments extends React.PureComponent<ICompartmentsProps, ICompartmentsState> {
    constructor(props: ICompartmentsProps) {
        super(props);
        
    }
    
    render() {
        return (
            <div className="page-workzone">
               <BoxHeader>
                   Model parameters
               </BoxHeader>
            </div>
        );
    }
}