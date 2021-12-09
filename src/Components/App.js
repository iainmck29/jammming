import './App.css';
import React from 'react'
import { SearchBar } from './SearchBar/SearchBar';
import { SearchResults } from './SearchResults/SearchResults';
import { Playlist } from './Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistName: 'My Playlist',
      searchResults: [
        {
          id: 1,
          name: 'Tiny dancer',
          artist: 'Elton j',
          album: 'madmad across the water'
        },
        {
          id: 2,
          name: 'Tiny dancer',
          artist: 'Elton j',
          album: 'madmad across the water'
        },
        {
          id: 3,
          name: 'Tiny dancer',
          artist: 'Elton j',
          album: 'madmad across the water'
        }
      ],


      playlistTracks: [
        {
          id: 3,
          name: 'Tiny dancer',
          artist: 'Elton j',
          album: 'madmad across the water'
        },
        {
          id: 5,
          name: 'Tiny man',
          artist: 'Ellie j',
          album: 'mudmud across the sea'
        }
      ],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
  }

  addTrack(track) {
    const trackID = track.id;
    for (let song of this.state.playlistTracks) {
      if (trackID === song.id) {
        alert('song already added')
        return;
      }
    }
    this.setState(prevState => ({
      playlistTracks: [...prevState.playlistTracks, track]
    }))
  }

  removeTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState(prevState => ({
        playlistTracks: prevState.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      }))
    }
  }

  updatePlaylistName(playlistName) {
    this.setState({
      playlistName
    })
  }

  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName} />
      </div>
    </div>
  </div>
    )
  }

}

export default App;
