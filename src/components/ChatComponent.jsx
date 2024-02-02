import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { PaperClipIcon } from '@heroicons/react/solid';
import { PaperAirplaneIcon } from '@heroicons/react/solid';
import PDF from '../assets/PDF.png';
import { useUser } from '../context/UserContext';
import { uploadImage } from '../api/services';
import { useMessage } from '../context/MessagesContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useGroups } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaVideo } from 'react-icons/fa';
import { FaVideoSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { VideoChat } from '../components/VideoChat';

const ChatComponent = () => {
  const { user, socket } = useUser();
  const { getCurrentGroup, currentGroup } = useGroups();
  const { createMessage, getAllMessages, message, room, setMessage } =
    useMessage();
  const [chatMessage, setChatMessage] = useState('');
  const [uplodedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(room, '<-- room en ChatComponent');
    if (!user) {
      navigate('/');
    }
    socket.emit('join-room', room);

    const getInfo = async () => {
      const response = await getCurrentGroup(room);
      if (response) {
        await getAllMessages(room);
      }
    };

    getInfo();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', (data) => {
      console.log(data, '<-- data del receive-message');
      setMessage((list) => [...list, data]);
    });
    return () => socket.off('receive-message');
  }, [socket]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uplodedFile) {
      console.log(uplodedFile, '<-- uplodedFile');
      const response = await uploadImage(uplodedFile);
      const extencion = response.split('.').pop();
      if (extencion === 'pdf') {
        setPreviewImage(null);
        console.log('entro al pdf');
        const messageData = {
          group: room,
          room: room,
          body: chatMessage === '' ? 'PDF' : chatMessage,
          author: user._id,
          authorName: user.name,
          image: '',
          video: '',
          fileAtt: response,
          time: new Date(Date.now()),
        };
        setChatMessage('');
        setUploadedFile(null);
        await socket.emit('send-message', { room, messageData, user });
        await setMessage((list) => [...list, messageData]);

        createMessage(messageData);
      } else if (extencion !== 'pdf') {
        setPreviewImage(null);

        const messageData = {
          group: room,
          room: room,
          body: chatMessage === '' ? 'Image' : chatMessage,
          author: user._id,
          authorName: user.name,
          image: response,
          video: '',
          fileAtt: '',
          time: new Date(Date.now()),
        };
        setChatMessage('');
        setUploadedFile(null);
        await socket.emit('send-message', { room, messageData, user });
        await setMessage((list) => [...list, messageData]);

        createMessage(messageData);
      }
    } else if (chatMessage !== '') {
      const messageData = {
        group: room,
        room: room,
        body: chatMessage,
        author: user._id,
        authorName: user.name,
        image: null,
        video: '',
        fileAtt: '',
        time: new Date(Date.now()),
      };

      setChatMessage('');
      await socket.emit('send-message', { room, messageData, user });
      console.log(messageData, '<-- messageData en onSubmit');
      await setMessage((list) => [...list, messageData]);

      createMessage(messageData);
    }
  };

  const hendleVideoCall = () => {
    setIsVideo(!isVideo);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full  h-full'>
      <div className='w-full justify-center items-center flex flex-col'>
        <div
          className='flex flex-col border-2 border-gray-400 rounded-md 
        w-full p-2 h-screen'>
          <div className='flex items-center justify-between w-full bg-orange-500 text-white px-3 py-2 rounded-md'>
            <div className='flex items-center justify-center'>
              <p className='text-[14px] justify-center flex text-black mr-3'>
                {currentGroup?.name}
              </p>
            </div>
            <button
              className='p-2 rounded-md hover:bg-zinc-200 hover:text-gray-700 transition border-2 border-gray-300 '
              onClick={hendleVideoCall}>
              {!isVideo ? <FaVideo /> : <FaVideoSlash />}
            </button>
          </div>
          {isVideo && (
            <VideoChat
              room={room}
              video={true}
              audio={true}
            />
          )}
          <div className='flex scrollbar2 flex-col p-2 rounded-md  w-full  h-[calc(100vh-230px)] bg-grey-300'>
            <ScrollToBottom
              beheviour={'smooth'}
              className='no-scrollbar w-full h-full'>
              <div className='flex flex-col'>
                {message &&
                  message?.map((m) => (
                    <div
                      key={m._id}
                      className={clsx(
                        'w-fit p-2  rounded-md  max-w-[calc(50%-50px)] mb-2 min-w-[200px]',
                        m.author._id !== user?._id
                          ? 'bg-blue-200 self-end mr-2'
                          : 'bg-green-200 self-start'
                      )}>
                      <div className='flex gap-1 items-center justify-center'>
                        <p className='text-[13px] text-start w-full'>
                          {m.authorName}
                        </p>
                      </div>
                      <div className='flex flex-wrap max-w-md'>
                        <hr className=' border-1 w-full rounded-md border-grey-600' />
                        <p className='text-[14px] text-start flex mt-1 '>
                          {m.body}
                        </p>
                        {m.image && (
                          <img
                            className='w-[150px] m-2'
                            src={m.image}
                            alt='file'
                          />
                        )}
                        {m.fileAtt && (
                          <>
                            <a
                              className='w-[150px] m-2 text-sky-600 underline'
                              href={m.fileAtt}
                              target='_blank'
                              rel='noreferrer'>
                              <p className='text-[12px] text-start mt-1 max-w-[190px] break-words'>
                                {m.fileAtt}
                              </p>
                            </a>
                            <iframe
                              src={m.fileAtt}
                              height='auto'
                              width='190px'></iframe>
                          </>
                        )}
                      </div>
                      <div>
                        <p className='text-[10px] w-full text-end'>
                          {format(new Date(m.time), 'p')}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollToBottom>
          </div>
          <hr />
          <div className='flex flex-row justify-between rounded-md w-full p-1  border-gray-400'>
            <form
              className='flex flex-row justify-between rounded-md w-full p-1 items-center gap-2'
              onSubmit={(e) => onSubmit(e)}>
              <input
                type='text'
                placeholder='Mensaje...'
                value={chatMessage}
                className='border-none w-full rounded-md p-1'
                onChange={(e) => {
                  setChatMessage(e.target.value);
                }}
              />
              {previewImage && (
                <img
                  className='w-8 h-8 object-cover align-center m-2'
                  src={previewImage}
                  alt=''
                  onClick={() => {
                    URL.revokeObjectURL(previewImage);
                    setPreviewImage(null);
                  }}
                />
              )}
              <Dropzone
                acceptedFiles='.jpg, .png, .jpeg, .gif, .svg, .pdf'
                multiple={false}
                noClick={true}
                onDrop={(acceptedFiles) => {
                  setUploadedFile(acceptedFiles[0]);
                  console.log(acceptedFiles[0], '<-- acceptedFiles[0]');
                  if (acceptedFiles[0].type.includes('pdf' || 'PDF')) {
                    setPreviewImage(PDF);
                    return;
                  }
                  setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
                }}>
                {({ getRootProps, getInputProps, open }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className='flex gap-2'>
                      <input {...getInputProps()} />

                      <PaperClipIcon
                        className='h-8 w-8 cursor-pointer border-2 border-gray-300 px-2 py-1 rounded-md
                       hover:border-gray-400'
                        onClick={open}
                      />
                    </div>
                  </section>
                )}
              </Dropzone>

              <PaperAirplaneIcon
                className='h-8 w-8 
      cursor-pointer border-2 border-gray-300 p-1 rounded-md hover:border-gray-400 rotate-90'
                type='submit'
                onClick={(e) => onSubmit(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
