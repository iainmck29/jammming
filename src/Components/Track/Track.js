import React from "react";
import './Track.css'

export class Track extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRemoval: true
        }
    }
    
    addTrack(e) {
        this.props.addTrack()
    }

    render() {
        let buttonElement;
        const { track } = this.props;

        if (this.state.isRemoval) {
            buttonElement = <button className="track-action">-</button>
        } else {
            buttonElement = <button className="track-action" value={this.props.track} onClick={this.addTrack}>+</button>
        }
        return (
        <div className="Track">
            <div className="Track-info">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div>
                {buttonElement}
            </div>
        </div>
        )
    }
}