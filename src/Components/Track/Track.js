import React from "react";
import './Track.css'

export class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    addTrack() {
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    render() {
        let buttonElement;
        const { track, isRemoval } = this.props;

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
            <div>
                {buttonElement}
            </div>
        </div>
        )
    }
}