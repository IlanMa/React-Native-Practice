import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else { 
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  forceSwipe(direction) {
    const distance = direction === 'left' ?  -(SCREEN_WIDTH + 100) : SCREEN_WIDTH + 100;

    Animated.timing(this.state.position, {
      toValue: { x: distance + 50, y: 0},
      duration: 250
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { index } = this.state;
    const item = data[index];

    this.state.position.setValue({ x: 0, y: 0 });
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item); 

    if (index === data.length - 1) {
      this.setState({ index: 0});
    } else {
      this.setState({ index: index + 1});
    }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0}
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-45deg', '0deg', '45deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      const setMarginTop = { marginTop: index * 10 };

      if (index < this.state.index) {
        return null;
      } else if (index === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers} 
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <View key={item.id} style={[styles.cardStyle, setMarginTop]}>
          {this.props.renderCard(item)}
        </View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    zIndex: 0
  }
};

export default Deck;