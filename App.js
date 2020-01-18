import React from 'react';
import { SafeAreaView, View, Text, Button, } from 'react-native';
import Loudness from 'react-native-loudness';

export default class AppView extends React.Component {
  constructor(){
    super();

    this.state = {
      loudness: 0,
      isRecording: false,
    }

    this.loudnessGetter = null
  }

  onPress = () => {
    if (!this.state.isRecording){
      // Loudness.start();
      Loudness.start('test');

      this.loudnessGetter = setInterval(() => {
        Loudness.getLoudness((l) => {
          if (!isFinite(l)) return;
          this.setState({loudness: l});
        });
      }, 100);

      this.setState({isRecording: true});
    } else {
      Loudness.stop();
      clearInterval(this.loudnessGetter);
      this.loudnessGetter = null;
      this.setState({isRecording: false,loudness: 0});
    }
  }

  render(){
    return(
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>{'Loudness: '+ this.state.loudness.toFixed(2)}</Text>
        <Button
          title = {this.state.isRecording?'Stop':'Start'}
          onPress = {this.onPress}/>
      </View>
      );
  }
}
