import React from 'react';
import { Container, Content, Spinner, Button, Text, View, Icon } from 'native-base';
import MovieCard from '../components/MovieCard';
import Tabs from '../components/Tabs';
import AppHeader from '../components/Header';
import { RefreshControl } from 'react-native';
import config from '../config/config';

export default class Home extends React.Component{

    constructor(props){
        super(props);
    }




    componentDidMount = () => {
        this.fetchMovies();
    }

    config = config;
    state = {
        movies : [],
        searchTerms : {
            query_text : '',
            genre : 'All',
            rating : 'All',
            sort_by : 'date_added'
        }, 
        loading : true,
        currentPage : 1
    }

    searchHandler = (appHeaderState, currentPage = 1) => {
        console.log(appHeaderState);
        let state = this.state;
        state.currentPage = currentPage;
        state.searchTerms.genre = appHeaderState.genre;
        state.searchTerms.rating = appHeaderState.minimum_rating;
        state.searchTerms.query_text = appHeaderState.query_string;
        state.searchTerms.sort_by = appHeaderState.sort_by;
        this.setState(state);
        this.fetchMovies(true);
    }

    render = () => {
        return (
            <Container>
                <AppHeader navigation={this.props.navigation} onStateChange = { ( appHeaderState ) => { this.searchHandler(appHeaderState) } } />
                <Content style={{ paddingBottom : 140 }} refreshControl={
                    <RefreshControl refreshing={this.state.loading} onRefresh={
                        () => {
                            let state = this.state;
                            state.loading = true;
                            this.setState(state);
                            this.fetchMovies();
                        }
                    }></RefreshControl>
                }>
                    {
                        this.state.movies.map(movie => {
                            return (
                                <MovieCard key={movie.id} movie={movie} onPress={ () => {
                                    this.props.navigation.navigate('details', { movie : movie });
                                } } />
                            );
                        })
                    }
                    {
                        this.renderLoading()
                    }
                    {
                        this.paginate()
                    }
                </Content>
                
                <Tabs />
            </Container>
        );
    }

    fetchMovies = (reload = false) => {
        let state = this.state;
        if(reload){
            state.loading = true;
            state.movies = [];
            this.setState(state);
        }
        let url = this.config.apiConfig.apiRootUrl;
        url+='?query_term='+this.state.searchTerms.query_text;
        url+='&minimum_rating='+this.state.searchTerms.rating;
        url+='&sort_by='+this.state.searchTerms.sort_by;
        url+='&order_by='+this.config.apiConfig.searchParams.order_by;
        url+='&limit='+this.config.apiConfig.searchParams.limit;
        if(this.state.searchTerms.genre != 'All'){
            url+='&genre='+this.state.searchTerms.genre;
        }
        if(this.state.currentPage != 1){
            url+='&page='+this.state.currentPage;
        }
        console.log(url);
        fetch(url).then(res => res.json()).then(json =>{
            console.log(json.data.movies);
            state.movies = (json.data.movies) ? (json.data.movies) : [];
            state.loading = false;    
            this.setState(state);
        }).catch(e => {
            
        });
    }

    renderLoading = () => {
        if(this.state.loading){
            return(
                <Spinner/>
            )
        }
        return null;
    }

    paginate = () => {
        return(
            <View style={{ display : 'flex', justifyContent : 'center' , flexDirection : 'row', margin : 10 }}>
                <Button small style={{ borderTopRightRadius : 0, borderBottomRightRadius : 0 }} disabled={ this.state.currentPage > 1 ? false : true } onPress={ () => {
                    this.previousPage();
                }}>
                    <Icon name="arrow-back"/>
                </Button>
                <Button small style={{ borderRadius : 0 }}> 
                    <Text>
                        {
                            this.state.currentPage
                        }
                    </Text>
                </Button>
                <Button small style={{ borderTopLeftRadius : 0, borderBottomLeftRadius : 0 }} disabled={ this.state.movies.length == this.config.apiConfig.searchParams.limit ? false : true } onPress={() => {
                    this.nextPage();
                } }>
                    <Icon name="arrow-forward"/>
                </Button>
            </View>
        )
    }

    previousPage = () => {
        const state = this.state;
        if(state.currentPage > 1){
            state.currentPage--;
        }
        this.setState(state);
        this.fetchMovies(true);
    }

    nextPage = () => {
        const state = this.state;
        state.currentPage++;
        this.setState(state);
        this.fetchMovies(true);
    }
}