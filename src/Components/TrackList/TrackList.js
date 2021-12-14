import React from 'react'
import './TrackList.css'
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracklist.map((track, index) => {
                    return <Track
                                key={index}
                                track={track}
                                onAdd={this.props.onAdd}
                                isRemoval={this.props.isRemoval}
                                onRemove={this.props.onRemove}
                                updatePlaylistName={this.props.updatePlaylistName}
                                isPlaying={this.props.isPlaying}
                                playSample={this.props.playSample}
                                pauseSample={this.props.pauseSample}/>
                })}

            </div>
        )
    }
}