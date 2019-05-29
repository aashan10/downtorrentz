import React from 'react';
import { Card, CardItem, Title, Text, Row, Col, Badge, Icon } from 'native-base';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DynamicImage from './DynamicImage';

export default class MovieCard extends React.Component{
    
    render = () => {
        return(
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
                <Card>
                    <CardItem header>
                        <Text>
                            {
                                this.props.movie.title
                            }
                        </Text>
                    </CardItem>
                    <DynamicImage uri={this.props.movie.medium_cover_image }/>
                    <CardItem>
                        <ScrollView horizontal style={{ minHeight : 30 }}>
                            {
                                this.props.movie.genres.map(genre => {
                                    return (
                                        <Badge key={ genre } primary style={{ borderRadius : 5, marginRight : 5 }}>
                                            <Text>
                                                {
                                                    genre
                                                }
                                            </Text>
                                        </Badge>
                                    );
                                })
                            }
                        </ScrollView>
                    </CardItem>
                    <CardItem bordered>
                        <Row>
                            <Col>
                                <Icon name="star" style={{ color : '#d99c2c' }}/>
                                <Text>
                                    {
                                        this.props.movie.rating
                                    }/10
                                </Text>
                            </Col>
                            <Col>
                                <Icon name="clock"/>
                                <Text>
                                    {
                                        this.props.movie.runtime
                                    } min
                                </Text>
                            </Col>
                            {
                                this.renderMPARating()
                            }
                        </Row>
                    </CardItem>

                    <CardItem>
                        <Text>
                            Synopsis { '\n' }
                            {
                                this.props.movie.synopsis
                            }
                        </Text>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    openMovieCard = (movie) => {
        console.log(movie);
    }

    renderMPARating = () => {
        return (this.props.movie.mpa_rating) != '' ?
         (
            <Col>
                <Badge style={{ borderRadius : 5 }}>
                    <Text>
                        {
                            this.props.movie.mpa_rating
                        }
                    </Text>
                </Badge>
            </Col>
        ) : null;
    }

}