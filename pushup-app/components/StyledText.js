import React from 'react';
import { Text } from 'react-native';

import Colors from '../constants/Colors';


export class MonoText extends React.Component {
  render() {
    return <Text {...this.props}
      color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
