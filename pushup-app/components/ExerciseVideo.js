
import React from 'react';
import PropTypes from "prop-types";
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Audio, Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

class ExerciseVideo extends React.Component {
  state = {
      mute: false,
      fullScreen: false,
      shouldPlay: true,
  }
  async componentDidMount() {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
            shouldDuckAndroid: false,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
        })
        await Audio.setIsEnabledAsync(true)
        const sound = new Audio.Sound()
        await sound.loadAsync({ uri: 'silence.mp3' })
        sound.playAsync()
        sound.setIsMutedAsync(true)
        sound.setIsLoopingAsync(true)
    }

    handlePlayAndPause = () => {
      this.setState(prevState => ({
        shouldPlay: !prevState.shouldPlay
      }));
    }

    handleVolume = () => {
      this.setState(prevState => ({
        mute: !prevState.mute,
      }));
    }

    render() {
      let { width } = Dimensions.get('window');
      width *= 0.8;

      return (
        <View style={styles.container}>
          <View>
            <Video
                source={{ uri: this.props.exercise.uri }}
                shouldPlay={this.state.shouldPlay}
                resizeMode="cover"
                style={{ width, height: 220 }}
                isMuted={this.state.mute}
                ignoreSilentSwitch={"ignore"}
            />
            <View style={styles.controlBar}>
              <MaterialIcons
                name={this.state.shouldPlay ? "pause" : "play-arrow"}
                size={45}
                color="#c9a991"
                onPress={this.handlePlayAndPause}
              />
              <MaterialIcons
                name={this.state.mute ? "volume-mute" : "volume-up"}
                size={45}
                color="#c9a991"
                onPress={this.handleVolume}
              />
          </View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
      marginBottom: 40,
    },
      controlBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
  });


ExerciseVideo.propTypes = {
  exercise: PropTypes.object,
};

export default ExerciseVideo;
