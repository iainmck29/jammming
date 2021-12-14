import React from "react";
import './Track.css'

export class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playSample = this.playSample.bind(this);
        this.pauseSample = this.pauseSample.bind(this);
    }


    // Add the current track to playlist
    addTrack() {
        this.props.onAdd(this.props.track)
    }

    // Remove the track from the playlist
    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    // Play the track using Spotify Web Player
    playSample() {
        this.props.playSample(this.props.track.uri)
    }

    // Pause currently playing track
    pauseSample() {
        this.props.pauseSample()
    }

    render() {
        let buttonElement;
        let playElement;


        const { track, isRemoval, isPlaying } = this.props;

        if (isPlaying === track.uri) {
            playElement = <button className="transparent-button" onClick={this.pauseSample}>
                <img src="./pause2.png" alt="pause icon" className="play-action invert"/>
            </button>
        } else {
            playElement = <button className="transparent-button" onClick={this.playSample}>
                <img src="./play2.png" alt="play icon" className="play-action invert"/>
            </button>
        }

        if (isRemoval) {
            buttonElement = <button className="track-action" onClick={this.removeTrack}>-</button>
        } else {
            buttonElement = <button className="track-action" onClick={this.addTrack}>+</button>
        }
        return (
        <div className="Track">
            <div className="Track-info">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div className="button-container">
                {playElement}
                {buttonElement}
            </div>
        </div>
        )
    }
}