import * as React from 'react';
import './home.scss'
import {Box, BoxHeader} from '../../components'
const Hero = require('./hero-image.jpg')

interface IHomeProps {

}

interface IHomeState {
    
}

export class Home extends React.PureComponent<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        
    }
    
    render() {
        return (
            <div>
                <div className="hero-image">
                </div>
            </div>
        );
    }
}