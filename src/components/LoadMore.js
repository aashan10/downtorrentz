import React from 'react';
import { View, Row, Icon } from 'native-base';

export default class LoadMore extends React.Component{

    constructor(props){
        super(props);
        this.setState({ previous : this.props.previous, next : this.props.next, current : this.props.currentPage });
    }

    componentDidUpdate = () => {
        const { previous, next, currentPage } = this.props;
        if(this.state != {previous, next, currentPage}){
            this.setState({ previous : previous, next : next, currentPage : currentPage });
        }
    }

    render = () => {
        return(
            <View>
                <Row>
                    <Col>
                        <Button small rounded disabled={ this.state.previous }>
                            <Icon name="previous"/>
                        </Button>
                    </Col>
                    <Col>
                        <Button small>
                            <Text>
                                {
                                    this.state.currentPage
                                }
                            </Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button small rounded disabled={ this.state.next }>
                            <Icon name="next"/>
                        </Button>
                    </Col>
                </Row>
            </View>
        )
    }

}