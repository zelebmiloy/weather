/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    Text, ScrollView,
    View, Switch

} from 'react-native';

export default class AwesomeProject extends Component {
    constructor() {
        super()
        this.state = {
            name: 'there',
            data: '',
            isCelciusOrNot: false

        };
    }

    _handleName(event) {
        console.log('It\'s works !')
        var name = event.nativeEvent.text
        var date = new Date().getTime() / 1000;
        var iconImg = 'http://openweathermap.org/img/w/'
        const appid = 'd4d5e07957b5ea3fb5afa802405ea00e'
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + appid)
            .then(
            (response) => response.json()
            )
            .then(
            (responseJSON) => {
                console.log(responseJSON)
                this.setState({ data: responseJSON })


            }
            )
            .catch((error) => {
                console.warn(error);
            });
    }
    _onPressIn(event) {
        this.setState({ pressing: true })
    }
    _onPressOut(event) {
        this.setState({ pressing: false })
    }
    isCelcius(value) {

        return (
            <View>
                <Text>Max Temperature: {this.state.data.list[j].temp_max}</Text>
                <Text>Min Tempurature: {this.state.data.list[j].temp_min}</Text>
            </View>
        )
    }
    render() {
        var forecastDay = [];
        try {

            for (let i = 0; i < 5; i++) {
                let j = i * 8;
                forecastDay.push(
                    <View key={i}>
                        <View>
                            <Text>{this.state.data.list[j].dt_txt}</Text>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: 'http://openweathermap.org/img/w/' + this.state.data.list[j].weather[0].icon + '.png' }} />
                            <Text style={{ fontSize: 10 }}>
                                Weather: {this.state.data.list[j].weather[0].main}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                Description: {this.state.data.list[j].weather[0].description}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                Max Temperature : {
                                    this.state.isCelciusOrNot ?
                                        parseFloat(this.state.data.list[j].main.temp_max - 273.15).toFixed(2) + ' °C' :
                                        parseFloat(((this.state.data.list[j].main.temp_max * 9) / 5) - 459.67).toFixed(2) + ' °F'}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                Min Temperature : {
                                    this.state.isCelciusOrNot ?
                                        parseFloat(this.state.data.list[j].main.temp_min - 273.15).toFixed(2) + ' °C' :
                                        parseFloat(((this.state.data.list[j].main.temp_min * 9) / 5) - 459.67).toFixed(2) + ' °F'}
                            </Text>
                        </View>
                    </View>

                )
            }
        }
        catch (error) {

            forecastDay.push(

                <View key={0}>
                    <Text>Ex.Lamphun, Bangkok, Lampang and...etc.</Text>
                </View>)
        }

        return (
            <ScrollView >
                <View style={styles.appContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ height: 40, width: 200 }}
                                placeholder="Please, input your city!"
                                onSubmitEditing={(text) => this._handleName(text)}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                            <Text>°F</Text>
                            <Switch
                                onValueChange={(value) => this.setState({ isCelciusOrNot: value })}
                                style={{ marginBottom: 10 }} tintColor="#e6e6fa" onTintColor="#e6e6fa" thumbTintColor="#333333"
                                value={this.state.isCelciusOrNot} />
                            <Text>°C</Text>
                        </View>

                    </View>

                    <View>

                    </View>
                    <View>
                        <Text>
                        {this.state.data == '' ? '' : this.state.data.city.name+', '+this.state.data.city.country}
                        </Text>
                    </View>
                    <View style={styles.fiveDay}>

                        {forecastDay}


                    </View>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    appContainer: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,

        resizeMode: 'cover',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }, button: {
        width: 100,
        height: 100,
        borderRadius: 100,
        color: 'white'
    },
    fiveDay: {
        flexDirection: 'column'
    },
    oneDay: {

    }

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
