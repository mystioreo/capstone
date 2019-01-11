import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Equipment from './Equipment';

class ExerciseInfo extends Component {


  render() {

  const { name, description, equipment, muscles } = { ...this.props.exercise };

    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Equipment equipment={equipment} />
        <Text style={styles.intro}> Unless otherwise specified, one set is 10 repetitions or a 30-second hold. </Text>
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
  intro: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  description: {
    margin: 30,
  }

});

export default ExerciseInfo;
