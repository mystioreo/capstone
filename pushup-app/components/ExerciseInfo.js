import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Alert, View, ScrollView, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Equipment from './Equipment';

class ExerciseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exerciseImages: [],
    }
  }

  render() {

  const { name, description, equipment, muscles, id } = { ...this.props.exercise };


  const getExerciseImages = async () => {

    try {
      const response = await fetch(
        'https://wger.de/api/v2/exerciseimage?exercise=' + id
      );
      const responseJson = await response.json();
      const exerciseImages = [];

      responseJson["results"].forEach((result, i) => {
          exerciseImages.push(
            <Image
              key={i}
              style={styles.stretch}
              source={{uri: result["image"]}}
              accessibilityLabel={name}
            />
          );
      })
        this.setState({exerciseImages});
    } catch (error) {
      Alert.alert(`Exercise Database error: ${error}`);
    }

  }

  getExerciseImages();

    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>{name}{this.props.exercise.id}</Text>
        </View>
        <Equipment equipment={equipment} />
        <Text style={styles.intro}> Unless otherwise specified, one set is 10 repetitions or a 30-second hold. </Text>
        <View style={styles.description}>
          <HTMLView
            value={description}
            stylesheet={styles}
          />
        </View>
        <View style={styles.center}>
          {this.state.exerciseImages}
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
  intro: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  description: {
    margin: 30,
  },
  stretch: {
    flex: 1,
    width: 100,
    height: 100,
  },
  center: {
    alignItems: 'center',
  }


});

export default ExerciseInfo;
