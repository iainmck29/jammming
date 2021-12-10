class Spotify {
    constructor() {
        this.accessToken = '';
        this.clientID = '12095f1f520446eca4dd8b7bf05d42d2';
        this.expirationTime = '';
        this.redirectUri = 'http://jammmingwithiain.surge.sh'

        this.getAccessToken = this.getAccessToken.bind(this);
        this.search = this.search.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    getAccessToken() {
        let url = window.location.href;
        if (this.accessToken) {
            return this.accessToken;
        } else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)){
            this.accessToken = url.match(/access_token=([^&]*)/)[1];
            this.expirationTime = Number(url.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(() => this.accessToken, this.expirationTime*1000);
            window.history.pushState('Access Token', null, '/');
            return this.accessToken;
        } else {
            url = 'https://accounts.spotify.com/authorize?'
            url += 'client_id=' + this.clientID
            url += '&response_type=token';
            url += '&scope=playlist-modify-public playlist-modify-private'
            url += '&redirect_uri=' + this.redirectUri
            window.location = url
        }
    }


    async search(term) {
        const accessToken = this.getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        const jsonResponse = await response.json()
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        }
    
    async savePlaylist(playlistName, trackURIs) {
        // Check params aren't empty
        if (!playlistName || !trackURIs) {
            return;
        }

        // Make initial request to obtain users ID
        const headers = {
            Authorization: `Bearer ${this.accessToken}`
        }
        const response = await fetch('https://api.spotify.com/v1/me', {headers})
        const jsonResponse = await response.json()
        const userID = jsonResponse.id;

        // Make post request to create a new playlist and obtain new playlists ID
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {method: 'POST',
            headers,
            body: JSON.stringify({
                "name": playlistName,
                "public": false
        })})
        const playlistJSONResponse = await playlistResponse.json();
        let playlistID = playlistJSONResponse.id

        // Add items to playlist
        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                uris: trackURIs
            })
        })
    }
    
    
    }



export const spotify = new Spotify()