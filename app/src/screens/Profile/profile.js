import React, { Component } from 'react';
import {
  View,
  Button,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { Card, ProfileHeader } from "../../components";
import { getPosts, likePost } from '../../actions/user/posts';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class Profile extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: DEVICE_HEIGHT * 0.2,
      backgroundColor: '#F04A58',
      alignContent: 'flex-start'
    },
    headerTitle: <ConnectedProfileHeader justPreview={true} toSettings={() => navigation.push('Settings')} isOwnProfile={true}/>,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  })

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.getPosts();
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.error && !prevProps.error) {
      // Handle error
      console.log(this.props.errorMessage);
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => 
            <Card 
              {...item} 
              onDetails={() => this.props.navigation.navigate('Detail', {post: item})}
              onLike={() => this.props.likePost(item._id)}
              isLoggedIn={this.props.isLoggedIn}
            />
          }
          keyExtractor={(item) => item._id}
          refreshing={this.props.fetching}
          onRefresh={this.props.getPosts}
        />
      </View>
    )
  }
}

const _mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const _mapDispatchToProps = dispatch => ({
  updatePhoto: (photo) => {
    dispatch(updatePhoto(photo));
  }
});

const ConnectedProfileHeader = connect(_mapStateToProps,_mapDispatchToProps)(ProfileHeader)

const mapStateToProps = ({ user, auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  posts: user.posts.posts,
  fetching: user.posts.fetching,
  error: user.posts.error,
  errorMessage: user.posts.errorMessage,
});
const mapDispatchToProps = dispatch => ({
  getPosts: () => {
    dispatch(getPosts());
  },
  likePost: id => {
    dispatch(likePost(id))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);