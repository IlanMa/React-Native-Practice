import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View style={styles.viewStyle}>
          <Button
            buttonStyle={styles.button}
            raised
            title='Leggo!'
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View style={[styles.slide, { backgroundColor: slide.color }]} key={slide.text}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  slide: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0288D1',
  },
  viewStyle: {
    marginTop: 15
  }
}

export default Slides