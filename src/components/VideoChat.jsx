/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

import { useUser } from '../context/UserContext';
import { BiLoaderAlt } from 'react-icons/bi';
import { getLiveKitToken } from '../api/message';

export const VideoChat = ({ room, audio, video }) => {
  const { user } = useUser();
  const [liveKitToken, setLiveKitToken] = useState('');

  useEffect(() => {
    if (!user?.name || !user?.surname) return;

    const username = `${user.name} ${user.surname}`;

    const connection = async () => {
      try {
        const resp = await getLiveKitToken(room, username);

        const data = await resp.data.videoToken;

        setLiveKitToken(data);
        console.log(liveKitToken, '<-- liveKitToken en VideoChat');
      } catch (error) {
        console.log(error);
      }
    };
    connection();
  }, [room, user?.name, user?.surname]);

  if (liveKitToken === '') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center '>
        <BiLoaderAlt className='h-7 w-7 animate-spin text-zinc-500 my-4 ' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      data-lk-theme='default'
      serverUrl='wss://team-chat-app-7keim926.livekit.cloud'
      token={liveKitToken}
      connect={true}
      video={video}
      audio={audio}>
      <VideoConference />
    </LiveKitRoom>
  );
};