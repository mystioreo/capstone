import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

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

    const equipmentItems = [];
    Object.keys(this.props.equipment).forEach((index) => {
      const number = this.props.equipment[index];
      equipmentItems.push(equipmentLegend[number]);
    });

    return (
        <View>
          <Text>Equipment: {equipmentItems}</Text>
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
  title: {
    alignSelf: 'center',
    fontSize: 20,

  },
  description: {
    margin: 30,
  }

});

export default Equipment;
