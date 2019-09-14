import React, { Component} from 'react'
import ReactPlayer from 'react-player'
import {TGData,refVideosInfo} from './handleData'
import {VideoEvidence} from './Types'



class App extends Component {

  //Configuration: chose the case id ()
  public chosenCaseNum:number = 10;

  renderVideoPlayer(url:string,elapsedSeconds:number){

    let player = React.createRef<ReactPlayer>();

    function handleVideoStart(){
      if (player.current){
        player.current.seekTo(elapsedSeconds)
      }
    }


    return <ReactPlayer 
            ref={player}
            url={url}
            playing={false} 
            controls={true}
            onStart={handleVideoStart}
            />    

  }

  // Function for getting an array of url in the format of 'http://www.facebook.com/video/yyyyyy?t=xxxx'.
  getCompiledURLs(arrVideoEvidence:VideoEvidence[]):string[]{

    var compiledURLs = arrVideoEvidence.map(function(iVideoEvidence:VideoEvidence){

        let iRefVideoCode:string = iVideoEvidence['refVideoCode'];
        let iCompiledURL:string = refVideosInfo[iRefVideoCode]['url'].concat('?t=', iVideoEvidence['elapsedSeconds'].toString());
        return iCompiledURL;

    });

    return compiledURLs;

  }
  render () {
    var iVideoEvidenceArray = TGData[this.chosenCaseNum-1]['allVideoEvidence'];
    return( 
      <div className="videosCol">
          {iVideoEvidenceArray.map(iVideoEvidence => {
            let iRefVideoCode:string = iVideoEvidence['refVideoCode'];
            let iURL:string = refVideosInfo[iRefVideoCode]['url'];
            let iElapsedSeconds:number = iVideoEvidence['elapsedSeconds'];
            return this.renderVideoPlayer(iURL, iElapsedSeconds)
          })}
      </div>

    );
  }

}

export default App