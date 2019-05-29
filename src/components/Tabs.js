import React from 'react';
import { View, Button, Icon } from 'native-base';

export default class Tabs extends React.Component{
    render = () => {
        return (
            <View style={{ display : 'flex', flexDirection : 'row', borderTopWidth : 1, borderTopColor : '#c8c6c6', backgroundColor : 'white', justifyContent : 'center' }}>
                <Button style={{ flex : 1, justifyContent : 'center' }} transparent onPress={ () => {
                    dispatchEvent(new Event('scrollToTop'));
                }}>
                    <Icon name="home" />
                </Button>
                <Button style={{ flex : 1, justifyContent : 'center' }} transparent>
                    <Icon name="heart" />
                </Button>
                <Button style={{ flex : 1, justifyContent : 'center' }} transparent onPress={ () => {localStorage.getItem('Shit')} } style={{marginTop : 5}}>
                    <Icon name="sort-alpha-down" type="FontAwesome5" />
                </Button>
                <Button style={{ flex : 1, justifyContent : 'center' }} transparent>
                    <Icon name="timer" />
                </Button>
                <Button style={{ flex : 1, justifyContent : 'center' }} transparent >
                    <Icon name="download" />
                </Button>
            </View>
        );
    }
}