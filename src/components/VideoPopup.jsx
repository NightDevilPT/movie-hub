import React from 'react'
import ReactPlayer from 'react-player'

import {AiFillCloseSquare} from "react-icons/ai";

const VideoPopup = ({videoId,setVideoId,showVideoPopup,setShowVideoPopup}) => {
  return (
    <div className={`video-popup-section ${showVideoPopup&&'show-video-popup-section'}`}>
        <div className='video-player'>
            <AiFillCloseSquare className='close-video-popup-icon' onClick={e=>{
                setVideoId(null);
                setShowVideoPopup(false);
            }} />
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width={"100%"}
                height={"100%"}
                // playing={true}
            />
        </div>
    </div>
  )
}

export default VideoPopup