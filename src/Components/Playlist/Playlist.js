import React from 'react'
import './Playlist.css'
import { TrackList } from '../TrackList/TrackList'

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemoval: false,
        }
    }
    render() {
        return (
            <div className="Playlist">
                <input defaultValue="New Playlist" />
                <TrackList isRemoval={this.state.isRemoval} tracklist={this.props.playlistTracks}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}