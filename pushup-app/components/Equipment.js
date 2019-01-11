import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View, Text, StyleSheet } from 'react-native';

class Equipment extends Component {

  render() {

    const equipmentLegend = {
                              1: "Barbell",
                              2: "SZ-Bar",
                              3: "Dumbbell",
                              4: "Gym mat",
                              5: "Swiss Ball",
                              6: "Pull-up bar",
                              7: "none (bodyweight exercise)",
                              8: "Bench",
                              9: "Incline bench",
                              10: "Kettlebell",
                            }
    const equipmentImage = {
      1: require('../assets/images/barbell.png'),
      2: require('../assets/images/sz-bar.png'),
      3: require('../assets/images/dumbbell.png'),
      4: require('../assets/images/gym-mat.png'),
      5: require('../assets/images/swiss-ball.png'),
      6: require('../assets/images/pull-up-bar.png'),
      7: require('../assets/images/none.png'),
      8: require('../assets/images/bench.png'),
      9: require('../assets/images/incline-bench.png'),
      10: require('../assets/images/kettlebell.png'),

    }

    const equipmentItems = [];
    Object.keys(this.props.equipment).forEach((index) => {
      const number = this.props.equipment[index];
      equipmentItems.push(
        <Image
          key={index}
          style={styles.stretch}
          source={equipmentImage[number]}
          accessibilityLabel={equipmentLegend[number]}
        />
        );
    });

    return (
        <View style={styles.imageContainer}>
          {equipmentItems}
        </View>

    );
  }
}

Equipment.propTypes = {
  equipment: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',

  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
  },
  description: {
    margin: 30,
  },
  stretch: {
    width: 30,
    height: 30,
  }

});

export default Equipment;
