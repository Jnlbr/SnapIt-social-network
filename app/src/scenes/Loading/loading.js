import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   ActivityIndicator,
   Text,
} from 'react-native';
import Authenticate from '../../api/isAuth';

class Loading extends Component {
   constructor(props) {
      super(props);

      this.isAuthenticated();
   }

   isAuthenticated = async () => {
      const user = await Authenticate();
      this.props.navigation.navigate(user ? 'UserStack' : 'InvitedStack');
   }

   render() {

      return (
         <View style={styles.container}>
            <ActivityIndicator size="large" color="#F04A58"/>
            <Text>Loading</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   }
})

export default Loading