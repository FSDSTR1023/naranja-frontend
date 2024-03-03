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
import { useNavigate, useParams } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import { FaVideoSlash } from 'react-icons/fa';
import { VideoChat } from '../components/VideoChat';
import MessageCard from './MessageCard';
import clsx from 'clsx';

const ChatComponent = () => {
  const { user, socket } = useUser();
  const { getCurrentGroup, currentGroup } = useGroups();
  const {
    createMessage,
    getAllMessages,
    message,
    setMessage,
    deleteMessage,
    editMessage,
  } = useMessage();
  const [chatMessage, setChatMessage] = useState('');
  const [uplodedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const [editPanel, setEditPanel] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedMessageId, setEditedMessageId] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const room = useParams().groupId;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    socket.emit('join-room', room);

    const getInfo = async () => {
      const response = await getCurrentGroup(room);
      console.log(response, '<-- response en getInfo');
      if (response) {
        await getAllMessages(room);
      }
    };

    getInfo();
  }, [room]);

  useEffect(() => {
    if (!socket) {
      console.log('no hay socket');
      return;
    }
    socket.on('receive-message', reciveMessage);
    socket.on('user-writing', (data) => {
      console.log(data, '<-- data');
      setUserName(data.user?.name);
      setIsWriting(true);
      setTimeout(() => {
        setIsWriting(false);
      }, 1000);
    });
    return () => {
      socket.off('receive-message');
      socket.off('user-writing');
    };
  }, [socket]);

  const reciveMessage = (data) => {
    setMessage((list) => [...list, data]);
  };
  const handleIsWriting = () => {
    socket.emit('userWriting', { room, user });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uplodedFile) {
      console.log(uplodedFile, '<-- uplodedFile');
      const response = await uploadImage(uplodedFile);
      const extencion = response.split('.').pop();
      if (extencion === 'pdf') {
        setPreviewImage(null);

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
        await setMessage((list) => [...list, messageData]);
        await socket.emit('send-message', { room, messageData, user });

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
        await setMessage((list) => [...list, messageData]);
        await socket.emit('send-message', { room, messageData, user });

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
      await setMessage((list) => [...list, messageData]);
      await socket.emit('send-message', { room, messageData, user });

      createMessage(messageData);
    }
  };

  const hendleVideoCall = () => {
    setIsVideo(!isVideo);
  };
  const handleEdit = (message) => {
    setEditPanel(false);
    setEditedMessage(message.body);
    setEditedMessageId(message._id);
    setIsEditing(message._id);
  };
  const handleDelete = async (messageToDelete) => {
    const messageFound = message.find((m) => m._id === messageToDelete._id);
    messageFound.isDeleted = true;
    setEditPanel(false);
    await deleteMessage(messageFound._id);
  };
  const onSubmitEdit = async () => {
    const messageData = {
      messageId: editedMessageId,
      body: editedMessage,
      isEdited: true,
    };
    const messageFound = message.find((m) => m._id === editedMessageId);
    messageFound.body = editedMessage;
    messageFound.isEdited = true;
    await editMessage(messageData);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full bg-white rounded-[7px]'>
      <div className='w-full justify-center items-center flex flex-col'>
        <div className='flex flex-col w-full p-1 '>
          <div className='flex items-center justify-between w-full bg-orange-500 text-white px-3 py-2 rounded-md'>
            <div className='relative flex flex-col w-full '>
              <p className='text-[14px] text-start text-white mr-3 w-full'>
                {currentGroup?.name}
              </p>
              <p
                className={clsx(
                  'absolute top-4 py-1 left-0 text-[10px] font-white text-gray-800 w-fit',
                  isWriting ? null : 'hidden'
                )}>
                {userName + ' Esta escribiendo ...'}
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

          <div>
          <div className='flex scrollbar2 flex-col p-2 rounded-md w-full h-[calc(100vh-280px)] bg-grey-300'>
            <ScrollToBottom
              beheviour={'smooth'}
              className='no-scrollbar w-full h-full'>
              <div className='flex flex-col'>
                {message &&
                  message?.map((m) => (
                    <MessageCard
                      m={m}
                      key={m._id}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      editedMessage={editedMessage}
                      setEditedMessage={setEditedMessage}
                      onSubmitEdit={onSubmitEdit}
                      editPanel={editPanel}
                    />
                  ))}
              </div>
            </ScrollToBottom>
          </div>
          <hr />
          <div className='flex flex-row justify-between rounded-md w-full p-1 border-gray-400'>
            <form
              className='flex flex-row justify-between rounded-md w-full p-1 items-center gap-2'
              onSubmit={(e) => onSubmit(e)}>
              <input
                type='text'
                placeholder='Mensaje...'
                value={chatMessage}
                className='border-none w-full rounded-md p-1 bg-gray-200'
                onChange={(e) => {
                  setChatMessage(e.target.value);
                }}
                onKeyUp={handleIsWriting}
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
    </div>
  );
};

export default ChatComponent;
