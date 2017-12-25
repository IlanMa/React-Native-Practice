import React, { Component } from 'react';
import { View } from 'react-native';
import AlbumDetail from './AlbumDetail'

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ albums: responseData });
      })
  }

  renderAlbums() {
    console.log(this.state.albums)
    return this.state.albums.map(album => 
      <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    return (
      <View>
        {this.renderAlbums()}
      </View>
    );
  }
}

export default AlbumList;