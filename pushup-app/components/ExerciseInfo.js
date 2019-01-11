import React, { Component } from "react";
import PropTypes from "prop-types";
import * as firebase from 'firebase';
import { AsyncStorage, Alert, View, ScrollView, Image, Button, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';
import HTMLView from 'react-native-htmlview';



class ExerciseInfo extends Component {


  render() {

  const { name, description } = { ...this.props.exercise };

    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.description}>
          <HTMLView
            value={description}
          />
        </View>
      </ScrollView>




    );
  }
}

ExerciseInfo.propTypes = {
  exercise: PropTypes.object,
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

export default ExerciseInfo;
