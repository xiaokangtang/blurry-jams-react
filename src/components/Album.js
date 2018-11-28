import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component{
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovering: false,
      isPaused: false,
      hoveredSong: album.songs[0],
      pausedSong: album.songs[0]
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(song) {
    this.audioElement.pause();
    this.setState({ isPlaying: false, isPaused: true, pausedSong: song});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  hover(song) {
    this.setState({ isHovering: true, hoveredSong: song });
  }

  unhover() {
    this.setState({ isHovering: false});
  }

  handleButton(song, index) {
    const isHoverSong = this.state.hoveredSong === song;
    const isPlayingSong = this.state.currentSong === song;
    ///const isPausedSong = this.state.pausedSong === song;
    if(this.state.isPlaying && isPlayingSong){
      return <span className="icon ion-md-pause"></span>
    } else if (this.state.isHovering && isHoverSong) {
      return <span className="icon ion-md-play"></span>
    } else if (this.state.isPaused && isPlayingSong) {
      return <span className="icon ion-md-play"></span>
    } else {
      return index+1;
    }
  }

  render(){
    return(
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={()=> this.hover(song)} onMouseLeave={() => this.unhover()}>
                  <td>{ this.handleButton(song, index) }</td>
                  <td>{song.title}</td>
                  <td>{song.duration} seconds</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
