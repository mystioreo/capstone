import React from 'react';
import { Linking, Text, Alert, Picker, View, ScrollView, Button, StyleSheet, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

export default class AboutScreen extends React.Component {
  render () {

    const githubLink = () => {
      Linking.openURL('https://github.com/mystioreo')
    }

    const wgerLink = () => {
      Linking.openURL('https://wger.de/en/')
    }

    const freePikLink = () => {
      Linking.openURL('http://www.freepik.com/')
    }

    const roundIconsLink = () => {
      Linking.openURL('https://www.roundicons.com/')
    }

    const flatIconLink = () => {
      Linking.openURL('https://www.flaticon.com/')
    }

    const creativeCommonsLink = () => {
      Linking.openURL('https://www.roundicons.com/')
    }


    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {`Six Pack \n\n`}
        </Text>
        <Text style={styles.attribution}>
          {`Created by: \n`}
            <Text style={styles.link} onPress={githubLink}>
              {`\n        mystioreo \n\n\n\n`}
          </Text>
          {`Exercise data courtesy of: \n`}
            <Text style={styles.link} onPress={wgerLink}>
              {`\n        wger | Workout Manager \n\n\n\n`}
            </Text>
          {`Icons made by: \n`}
            <Text style={styles.link} onPress={freePikLink}>
              {`\n        FreePik \n`}
            </Text>
            <Text style={styles.link} onPress={roundIconsLink}>
              {`\n        Roundicons \n\n`}
            </Text>
          {`from: \n`}
            <Text style={styles.link} onPress={flatIconLink}>
              {`\n        www.flaticon.com \n\n`}
            </Text>
          {`licensed by: \n`}
            <Text style={styles.link} onPress={creativeCommonsLink}>
              {`\n        Creative Commons BY 3.0 \n\n`}
            </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
  attribution: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 50
  },
  link: {
    flex: 1,
    color: '#429485',
  },
})
