import React from 'react';
import { Card, View, Button, Text, Header, Left, Icon, Body, Title, Content, Container, Col, Toast } from 'native-base';
import MovieCard from '../components/MovieCard';
import { PermissionsAndroid, Linking } from 'react-native';
const downloadManager = require("react-native-simple-download-manager");


export default class MovieDetails extends React.Component{
    
    static navigationOptions = {
        drawerLabel : () => null,
        drawerIcon: () => null,
        title : 'Movie Details'
    }

    state = {
        movie : null
    }

    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        const movie = navigation.getParam('movie', null);
        if(this.state.movie != movie){
            this.setState({movie : movie});
        }
    }
    componentDidUpdate = () => {
        const { navigation } = this.props;
        const movie = navigation.getParam('movie', null);
        if(this.state.movie != movie){
            this.setState({movie : movie});
        }
    }

    render = () => {
        if(this.state.movie){
            return(
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={ () => {
                                this.props.navigation.goBack();
                            } }>
                                <Icon name="arrow-round-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>
                                {
                                    this.state.movie.title
                                }
                            </Title>
                        </Body>
                    </Header>
                    <Content>
                        <MovieCard movie={ this.state.movie } onPress={ () => {} }/>
                    </Content>
                    <Card>
                        {
                            this.state.movie.torrents.length > 0 ? this.state.movie.torrents.map(torrent => {
                                return this.renderTorrentOptions(torrent);
                            }) : null
                        }
                    </Card>

                </Container>
            )
        }
        return null;    
    }
    
    renderTorrentOptions = (torrent) => {
        return (
            <View key={torrent.hash} style={{ display : 'flex', flexDirection : 'row', paddingLeft : 10, paddingRight : 10, paddingTop : 5, paddingBottom : 5 }}>
                <Col style={{ justifyContent : 'center' }}>
                    <Text>
                        {
                            torrent.quality
                        }/{
                            torrent.size
                        }
                    </Text>
                </Col>
                <Col style={{ flexDirection : 'row', justifyContent : 'space-around' }}>
                    <Button success rounded onPress = { () => {
                        this.downloadTorrentFile(torrent);
                    } } style={{ marginBottom : 5 }}>
                        <Icon name="download"/>
                    </Button>
                    <Button danger rounded onPress = { () => {
                        this.createMagnetLink(torrent);
                    } } style={{ marginBottom : 5 }}>
                        <Icon name="magnet"/>
                    </Button>
                    <Button rounded onPress = { () => {
                        this.streamTorrent(torrent);
                    } } style={{ marginBottom : 5 }}>
                        <Icon name="play"/>
                    </Button>
                </Col>
            </View>
        )
    }

    streamTorrent = (torrent) => {
        this.props.navigation.navigate('play', { torrent : torrent });
    }

    downloadTorrentFile = (torrent) => {
        const hasPermission = this.requestStoragePermission();

        if(!hasPermission){
            alert('You need to give the permission to write the storage in order to download the file.');
        }else{
            const url = torrent.url;
            const config = {
                downloadTitle: this.state.movie.title+ " (" + torrent.quality +").torrent",
                downloadDescription: this.state.movie.synopsis,
                saveAsName: this.state.movie.title + torrent.quality + '.torrent',
                allowedInRoaming: true,
                allowedInMetered: true,
                showInDownloads: true,
                external: true, //when false basically means use the default Download path (version ^1.3)
                path: "Download/" //if "external" is true then use this path (version ^1.3)
            };

            downloadManager.download(url, {}, config).then(response => {
                console.log(response);
                alert("The file has been saved as "+ response.reason.split('///')[1].replace('%20', ' '));
            }).catch(err => {
                console.log(err);
            })
        }

    }

    createMagnetLink = (torrent) => {
        const trackers = [
            'udp://open.demonii.com:1337/announce',
            'udp://tracker.openbittorrent.com:80',
            'udp://tracker.coppersurfer.tk:6969',
            'udp://glotorrents.pw:6969/announce',
            'udp://tracker.opentrackr.org:1337/announce',
            'udp://torrent.gresille.org:80/announce',
            'udp://p4p.arenabg.com:1337',
            'udp://tracker.leechers-paradise.org:6969'
        ];
        let link = 'magnet:?xt=urn:btih'+torrent.hash+'&dn='+this.state.movie.slug;
        trackers.map(tracker => {
            link+= ('&tr='+tracker);
        });
        console.log(link);
        Linking.openURL(link);
    }

    async requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            return granted;
        } catch (err) {
            return false;
        }
    }

}