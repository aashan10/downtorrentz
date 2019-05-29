import React from 'react';
import { Spinner } from 'native-base';

export default class Loader extends React.Component{

    state = {
        isLoading : true
    }
    constructor(props){
        super(props);
        this.setState({isLoading : this.props.isLoading });
    }


    componentDidUpdate = () => {
        const { isLoading } = this.props;
        if(this.state.isLoading != isLoading ){
            this.setState({ isLoading : isLoading });
        }
    }

    render = () => {
        return(
            (this.state.isLoading) ? <Spinner /> : <View></View>
        );
    }

}