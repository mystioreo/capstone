import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Alert, View, ScrollView, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Equipment from './Equipment';
import ExerciseVideo from './ExerciseVideo';

class ExerciseInfo extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false;
    this.state = {
      exerciseImages: [],
    }
  }

  componentDidMount() {
    const getExerciseImages = async () => {

      try {
        const response = await fetch(
          'https://wger.de/api/v2/exerciseimage?exercise=' + this.props.exercise.id
        );
        const responseJson = await response.json();
        const exerciseImages = [];

        responseJson["results"].forEach((result, i) => {
            exerciseImages.push(
              <Image
                key={i}
                style={styles.stretch}
                source={{uri: result["image"]}}
                accessibilityLabel={this.props.exercise.name}
                resizeMode='contain'
              />
            );
        })
          this.setState({exerciseImages});
      } catch (error) {
        Alert.alert(`Exercise Database error: ${error}`);
      }

    }

    getExerciseImages();
  }



  render() {

  const { name, description, equipment } = { ...this.props.exercise };

    return (
      <ScrollView>
        <View style={styles.introContainer}>
          <View>
            <Text style={styles.title}>{name}</Text>
          </View>
          <Equipment equipment={equipment} />
        <Text style={styles.intro}> Unless otherwise specified, one set is 10 repetitions or a 30-second hold. </Text>
        {this.props.exercise.uri && <ExerciseVideo exercise={this.props.exercise}/>}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.description}>
            <HTMLView
              addLineBreaks={false}
              value={description}
              stylesheet={styles}
            />
          </View>
          <View style={styles.center}>
            {this.state.exerciseImages}
          </View>
        </View>

      </ScrollView>

    );
  }
}

ExerciseInfo.propTypes = {
  exercise: PropTypes.object,
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    marginHorizontal: 30,
    paddingTop: 30,
    backgroundColor: '#E4ECE5',
    borderRadius: 20,

  },

  detailsContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#E4ECE5',
    borderWidth: 10,

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
    marginHorizontal: 10,
    marginTop: 20,
  },
  stretch: {
    flex: 1,
    width: 200,
    height: 200,
  },
  center: {
    alignItems: 'center',
  }


});

export default ExerciseInfo;
