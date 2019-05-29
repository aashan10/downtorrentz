import React from 'react';
import { View, Header, Item, Text, Button, Input, Icon, Right, Row, Col, Picker } from 'native-base';

export default class AppHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMoreParams : true,
            genre : 'All',
            minimum_rating : '0',
            sort_by : 'date_added',
            queryString : ''
        }
    }
    render = () => {
        return (
            <View>
                <Header searchBar rounded>
                    <Item>
                        <Button transparent onPress={
                            () => {
                                this.props.navigation.toggleDrawer();
                            }
                        }>
                            <Icon name="menu" />
                        </Button>
                        <Input placeholder="Search" onChangeText= { (text) => {
                            const state = this.state;
                            state.queryString = text;
                            this.setState(state);
                            this.props.onStateChange(this.getSearchTerms());
                        } }/>
                        <Right>
                            <Button transparent>
                                <Icon name="search"/>
                            </Button>
                        </Right>
                    </Item>
                </Header>
                {
                    this.renderMoreOptions()
                }
            </View>
        );
    }

    getSearchTerms = () => {
        return {
            genre: this.state.genre, 
            minimum_rating: this.state.minimum_rating, 
            sort_by: this.state.sort_by, 
            query_string: this.state.queryString
        }
    }
    
    renderMoreOptions = () => {
        if(this.state.showMoreParams){
            return(
                    <Item>
                        <Col>
                            <Picker selectedValue={this.state.genre} onValueChange={ (value) => {
                                const state = this.state;
                                state.genre = value;
                                this.setState(state);
                                this.props.onStateChange(this.getSearchTerms());
                            }}>
                                <Picker.Item label="Genre" value="All" />
                                <Picker.Item label="Comedy" value="comedy" />
                                <Picker.Item label="Romance" value="romance" />
                                <Picker.Item label="Superhero" value="superhero" />
                                <Picker.Item label="Sci-Fi" value="sci-fi" />
                                <Picker.Item label="Crime" value="crime" />
                                <Picker.Item label="Action" value="action" />
                                <Picker.Item label="Thriller" value="thriller" />
                                <Picker.Item label="Horror" value="horror" />
                                <Picker.Item label="Drama" value="drama" />
                                <Picker.Item label="Animation" value="animation" />
                                <Picker.Item label="Adventure" value="adventure" />
                                <Picker.Item label="Fantasy" value="Fantasy" />
                            </Picker>
                        </Col>
                        <Col>
                            <Picker selectedValue={ this.state.minimum_rating } onValueChange={ (value) => {
                                const state = this.state;
                                state.minimum_rating = value;
                                this.setState(state);
                                this.props.onStateChange(this.getSearchTerms());
                            }}>
                                <Picker.Item label="Rating" value="0" />
                                <Picker.Item label="9+" value="9" />
                                <Picker.Item label="8+" value="8" />
                                <Picker.Item label="7+" value="7" />
                                <Picker.Item label="6+" value="6" />
                                <Picker.Item label="5+" value="5" />
                                <Picker.Item label="4+" value="4" />
                                <Picker.Item label="3+" value="3" />
                                <Picker.Item label="2+" value="2" />
                                <Picker.Item label="1+" value="1" />
                            </Picker>
                        </Col>
                        <Col>
                            <Picker selectedValue={ this.state.sort_by } onValueChange={ (value) => {
                                const state = this.state;
                                state.sort_by = value;
                                this.setState(state);
                                this.props.onStateChange(this.getSearchTerms());
                            }}>
                                <Picker.Item label="Latest" value="date_added" />
                                <Picker.Item label="Rating" value="rating" />
                                <Picker.Item label="Likes" value="like_count" />
                                <Picker.Item label="Downloads" value="download_count" />
                                <Picker.Item label="Title" value="title" />
                                <Picker.Item label="Year" value="year" />
                                <Picker.Item label="Seeds" value="seeds" />
                                <Picker.Item label="Peers" value="peers" />
                            </Picker>
                        </Col>
                    </Item>
            );
        }
        return null;
    }
}