import React from 'react';
import { Image, Dimensions } from 'react-native';

export default class DynamicImage extends React.Component {
    
    state = {
        height : null,
        uri : null
    }
    
    componentDidMount = async () => {
        if(this.props.uri != this.state.uri){
            const state = this.state;
            state.uri = this.props.uri;
            const x = Dimensions.get('screen').width;
            await Image.getSize(this.props.uri, (width, height) => {
                state.height = Math.floor(x * ( height/ width ));
            });
            this.setState(state);
        }
    }

    componentDidUpdate = async () => {
        if(this.props.uri != this.state.uri){
            const state = this.state;
            state.uri = this.props.uri;
            const x = Dimensions.get('screen').width;
            await Image.getSize(this.props.uri, (width, height) => {
                state.height = Math.floor(x * ( height/ width ));
            });
            this.setState(state);
        }
    }

    render = () => {
        return (
            <Image source={{ uri : this.state.uri }} style={{ height : this.state.height,  flex : 1 }} />
        )
    }
}