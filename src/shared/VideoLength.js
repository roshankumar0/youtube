import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
    let videoLengthInSeconds = moment()
        .startOf("day")
        .seconds(time)
        .format("H:mm:ss");
    if (videoLengthInSeconds.startsWith("0:")) {
        videoLengthInSeconds = videoLengthInSeconds.substring(3);
    }

    return (
        <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {videoLengthInSeconds}
        </span>
    );
};

export default VideoLength;