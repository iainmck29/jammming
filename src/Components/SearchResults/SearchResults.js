import React from 'react'
import './SearchResults.css'
import { TrackList } from '../TrackList/TrackList'

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList
                    tracklist={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                    isPlaying={this.props.isPlaying}
                    playSample={this.props.playSample}
                    pauseSample={this.props.pauseSample}/>
            </div>
        )
    }
}