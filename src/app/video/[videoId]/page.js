'use client'
import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { Context } from "@/context/contextApi";
import fetchDataYoutube from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import VideoLength from "@/shared/VideoLength";
import Loader from "@/shared/loading";
const VideoId = ({ params: { videoId } }) => {
    const [video, setVideo] = useState()
    const [related, setRelated] = useState([])
    const { setLoading, loading } = useContext(Context)
    useEffect(() => {
        fetchRelatedaVidoes()
        DetailData();
    }, [videoId])
    const DetailData = () => {
        setLoading(true)
        fetchDataYoutube(`video/details/?id=${videoId}`).then((res) => {
            setVideo(res)
            setLoading(false)
        })
    }

    const fetchRelatedaVidoes = () => {
        setLoading(true);
        fetchDataYoutube(`video/related-contents/?id=${videoId}`).then((res) => {
            setRelated(res);
            setLoading(false);
        });
    };
    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            {loading && <Loader />}
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img height={200} width={200}
                                        className="h-full w-full object-cover"
                                        src={video?.thumbnails[0]?.url}
                                        alt="image"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                            <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                        )}
                                </div>
                                <div className="text-white/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-white mt-4 md:mt-0">
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                                <AiOutlineLike className="text-xl text-white mr-2" />
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Likes`}
                            </div>
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Views`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {related?.contents?.map((video, index) => {
                        if (video?.type !== "video") return false;
                        return (
                            <Link key={index} href={`/video/${video.video?.videoId}`}>
                                <div className="flex mb-3" >
                                    <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                                        <Image height={400} width={400}
                                            className="h-full w-full object-cover"
                                            src={video.video?.thumbnails[0]?.url}
                                            alt="image"
                                        />
                                        {video.video?.lengthSeconds && (
                                            <VideoLength time={video.video?.lengthSeconds} />
                                        )}
                                    </div>
                                    <div className="flex flex-col ml-3 overflow-hidden">
                                        <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                                            {video.video?.title}
                                        </span>
                                        <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                                            {video.video?.author?.title}
                                            {video.video?.author?.badges[0]?.type ===
                                                "VERIFIED_CHANNEL" && (
                                                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                                                )}
                                        </span>
                                        <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                                            <span>{`${abbreviateNumber(
                                                video.video?.stats?.views,
                                                2
                                            )} views`}</span>
                                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                                .
                                            </span>
                                            <span className="truncate">
                                                {video.video?.publishedTimeText}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link >
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default VideoId
