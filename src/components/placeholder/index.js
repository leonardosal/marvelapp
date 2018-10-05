import React, { Component } from 'react';

import { View, Image, Animated } from 'react-native';

export default class PlaceholderImage extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = event => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  render() {
    return (
      <View>
        <Image
          {...this.props}
          blurRadius={1}
          source={{uri: this.props.thumbnail}}
        />
        <Animated.Image
          {...this.props}
          style={[
            this.props.style,
            { position: 'absolute', opacity: this.state.opacity }
          ]}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}