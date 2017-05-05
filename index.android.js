'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Camera from 'react-native-camera';
import capture from './src/client/capture'

var io = require('socket.io-client')

var rnfs = require('react-native-fs');

class camera extends Component {

    constructor(props) {
        super(props)
        /*
        TODO:
        server ip needs to be set bt user ... somehow
        */
        var server_IP = '192.168.0.2'
        this.socket = io.connect('http://'+ server_IP +':3456')
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => { this.camera = cam; }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget={Camera.constants.CaptureTarget.memory}>
                        <Text style={styles.capture} onPress={() => this.bloop()}>bloop</Text>
                </Camera>
            </View>
        );
    }

    bloop() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                this.socket.emit('bloop',{image: data, message:'input image from camera client'})
            })
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('camera', () => camera);
