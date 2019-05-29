import React from 'react';
import { Spinner, Container, Header, Button, Icon, Content, View } from 'native-base';


export default class StreamMovie extends React.Component{
    
    static navigationOptions = {
        drawerLabel : null, 
        drawerIcon : null
    }


    state = {
        torrent : null
    }
    
    componentDidMount = () => {
        if(this.state.torrent != this.props.navigation.getParam('torrent')){
            const state = this.state;
            state.torrent = this.props.navigation.getParam('torrent');
            this.setState(state);
        }
        
    }

    componentDidUpdate = () => {
        if(this.state.torrent != this.props.navigation.getParam('torrent')){
            const state = this.state;
            state.torrent = this.props.navigation.getParam('torrent');
            this.setState(state);
        }
        
    }

    render = () => {
        return (
            <View>
                {
                    this.state.torrent ? 
                        null
                    : <Container>
                        <Header transparent>
                            <Button transparent>
                                <Icon name="arrow-back" />
                            </Button>
                        </Header>
                        <Content transparent>
                            <Spinner/>
                        </Content>
                    </Container>
                }
            </View>
        )
    }

    getMagnetURI = () => {
        return this.createMagnetUrl();
    }
    addTracker = (url) => {
        return url+"&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969";
    }

    createMagnetUrl = (torrent, movie_name) => {
        let url = "magnet:?xt=urn:btih:"+torrent.hash+"&dn="+movie_name;
        return this.addTracker(url);
    }
}
