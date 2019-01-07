import React, { Component } from "react";
import PropTypes from "prop-types";



import { Alert, View, Image, Button, Text, StyleSheet } from 'react-native';


class Assignment extends Component {
  render() {

    //consider defining this elsewhere

    const drinks = {
      beer: require('../assets/images/beer.png'),
      wine: require('../assets/images/wine.png'),
      cider: require('../assets/images/cider.png'),
      spirit: require('../assets/images/spirit.png'),
      cocktail: require('../assets/images/cocktail.png'),
    }

    const markComplete = () => { Alert.alert('You clicked the button!')};

    return (

      <View style={styles.container}>
          <View>
           <Image
             style={{width: 30, height: 30}}
             source={drinks[this.props.drink]}
             accessibilityLabel={this.props.drink}
           />
           <Text> Yesterday </Text>
         </View>

         <View>
           <Image
             style={{width: 50, height: 50}}
             source={require('../assets/images/push-up.png')}
             accessibilityLabel="Drink"
           />
          <Text> Push-ups </Text>

         </View>
         <Button
           onPress={markComplete}
           title="✓"
           color="#841584"
           accessibilityLabel="Mark Complete"
         />
      </View>


    );
  }
}

Assignment.propTypes = {
  drink: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    padding: 15,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

export default Assignment;
