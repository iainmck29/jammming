import './App.css';
import React from 'react'
import { SearchBar } from './SearchBar/SearchBar';
import { SearchResults } from './SearchResults/SearchResults';
import { Playlist } from './Playlist/Playlist';
import {spotify} from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistName: 'My Playlist',
      searchResults: [],
      playlistTracks: [],
      trackPlaying: ''
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.playSample = this.playSample.bind(this);
    this.pauseSample = this.pauseSample.bind(this);
  }

  // Add a track to the current playlist if it doesnt already exist
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

  // Remove track from playlist if it exists
  removeTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState(prevState => ({
        playlistTracks: prevState.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      }))
    }
  }

  // Change state to reflect onChange of playlist name
  updatePlaylistName(playlistName) {
    this.setState({
      playlistName
    })
  }

  // Saves the playlist to users spotify account by passing array of track uri's and playlist name
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.setState({
      playlistTracks: []
    })
    alert('Playlist successfully created')
  }

  // Allow the user to search the Spotify library using their API and the search bar provided
  async search(searchTerm) {
    const searchResults = await spotify.search(searchTerm);
    this.setState({
      searchResults
    })
  }

  // When button is clicked, play sample of track
  async playSample(track) {
    const trackPlaying = await spotify.playSample(track)
    this.setState({
      trackPlaying: track
    })
  }

  async pauseSample() {
    const pauseTrack = await spotify.pauseSample()
    this.setState({
      trackPlaying: ''
    })
  }

  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        
        <SearchResults 
        searchResults={this.state.searchResults}
        onAdd={this.addTrack}
        isPlaying={this.state.trackPlaying}
        playSample={this.playSample}
        pauseSample={this.pauseSample}/>
        
        <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist} />
      </div>
    </div>
  </div>
    )
  }

}

export default App;
