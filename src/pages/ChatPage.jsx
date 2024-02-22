/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaVideo } from 'react-icons/fa';
import { FaVideoSlash } from 'react-icons/fa';
import { VideoChat } from '../components/VideoChat';
import MessageCard from '../components/MessageCard';

const ChatPage = () => {
  const { user, selectedUser, socket } = useUser();
  const { getGroupById, currentGroup } = useGroups();
  const {
    createMessage,
    getAllMessages,
    message,
    room,
    setMessage,
    editMessage,
    deleteMessage,
  } = useMessage();
  const [chatMessage, setChatMessage] = useState('');
  const [uplodedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editPanel, setEditPanel] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedMessageId, setEditedMessageId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    socket.emit('join-room', room);
    const groupToGet = {
      groupId: room,
      name: user?.name + selectedUser?.name,
      description: 'chat-privado',
      ownerUser: user?._id,
      members: [user?._id, selectedUser?._id],
    };

    const getInfo = async () => {
      const response = await getGroupById(groupToGet);

      if (response) {
        await getAllMessages(response._id);
      }
    };

    if (
      selectedUser.name === undefined ||
      selectedUser.name === null ||
      room === ''
    ) {
      return;
    } else {
      getInfo();
    }
  }, [room]);

  useEffect(() => {
    if (!socket) {
      console.log('no hay socket');
      return;
    }
    socket.on('receive-message', recibeMessage);

    return () => {
      socket.off('receive-message');
    };
  }, []);

  const recibeMessage = (data) => {
    setMessage((list) => [...list, data]);
  };

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
          group: currentGroup._id,
          room: room,
          body: chatMessage === '' ? 'PDF' : chatMessage,
          author: user._id,
          authorName: user.name,
          image: '',
          video: '',
          fileAtt: response,
          time: new Date(Date.now()),
        };
        await setMessage((list) => [...list, messageData]);
        setChatMessage('');
        setUploadedFile(null);
        await socket.emit('send-message', { room, messageData, user });
        setIsLoading(false);

        createMessage(messageData);
      } else if (extencion !== 'pdf') {
        setPreviewImage(null);

        const messageData = {
          group: currentGroup._id,
          room: room,
          body: chatMessage === '' ? 'Image' : chatMessage,
          author: user._id,
          authorName: user.name,
          image: response,
          video: '',
          fileAtt: '',
          time: new Date(Date.now()),
        };
        await setMessage((list) => [...list, messageData]);
        setChatMessage('');
        setUploadedFile(null);
        await socket.emit('send-message', { room, messageData, user });
        setIsLoading(false);

        createMessage(messageData);
      }
    } else if (chatMessage !== '') {
      const messageData = {
        group: currentGroup._id,
        room: room,
        body: chatMessage,
        author: user._id,
        authorName: user.name,
        image: null,
        video: '',
        fileAtt: '',
        time: new Date(Date.now()),
      };

      await setMessage((list) => [...list, messageData]);
      await socket.emit('send-message', { room, messageData, user });
      console.log(messageData, '<-- messageData en onSubmit');
      createMessage(messageData);

      setChatMessage('');
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
    <div className='grid grid-cols-12 justify-center items-center w-full mt-4'>
      <div className='col-span-12 w-full justify-center items-center flex flex-co'>
        <div
          className='flex flex-col border-2 border-gray-400 rounded-md 
        w-[calc(100%-15px)] p-2 h-[calc(100vh-135px)] justify-between bg-white'>
          <div className='flex items-center justify-between w-full bg-orange-500 text-white px-3 py-2 rounded-md'>
            {room && selectedUser?.name ? (
              <div className='flex items-center justify-center'>
                <img
                  className='w-6 h-6 rounded-full mr-3'
                  src={selectedUser?.avatar}
                  alt='avatar'
                />

                <p className='text-[14px] justify-center flex text-black mr-3'>
                  {selectedUser?.name} {selectedUser?.surname}
                </p>
                {selectedUser?.isOnline === 'Online' ? (
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                ) : selectedUser?.isOnline === 'Busy' ? (
                  <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                ) : (
                  <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                )}
              </div>
            ) : (
              <div className='flex items-center justify-center'>
                <p className='text-[14px] justify-center flex text-white mr-3'>
                  No hay usuario seleccionado
                </p>
              </div>
            )}
            <button
              className='p-2 rounded-md hover:bg-zinc-200 hover:text-gray-700 transition border-2 border-gray-300'
              onClick={hendleVideoCall}
              disabled={room ? false : true}>
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
          <div className='flex flex-col p-2 rounded-md overflow-auto w-full h-full scrollbar'>
            <ScrollToBottom
              beheviour={'smooth'}
              className='no-scrollbar w-full h-full '>
              <div className='flex flex-col'>
                {message &&
                  message?.map((m) => (
                    <MessageCard
                      key={m._id}
                      m={m}
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
          <div className='flex flex-row justify-between rounded-md w-full p-1  border-gray-400'>
            <form
              className='flex flex-row justify-between rounded-md w-full p-1 items-center gap-2'
              onSubmit={(e) => onSubmit(e)}>
              <input
                disabled={room ? false : true}
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
                  className='w-12 h-12 object-cover align-center m-2'
                  src={PDF}
                  alt=''
                  onClick={() => {
                    URL.revokeObjectURL(previewImage);
                    setUploadedFile(null);
                    setPreviewImage(null);
                    setIsLoading(true);
                  }}
                />
              )}
              {isLoading && (
                <div className='w-full h-full flex items-center justify-center'>
                  <i className='fas fa-spinner fa-spin text-6xl text-gray-800'></i>
                </div>
              )}
              <Dropzone
                disabled={room ? false : true}
                acceptedFiles='.jpg, .png, .jpeg, .gif, .svg, .pdf'
                multiple={false}
                noClick={true}
                onDrop={(acceptedFiles) => {
                  setUploadedFile(acceptedFiles[0]);
                  console.log(acceptedFiles[0], '<-- acceptedFiles[0]');
                  if (acceptedFiles[0].type.includes('pdf')) {
                    setPreviewImage(PDF);
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
                        className='h-9 w-9 cursor-pointer border-2 border-gray-200 px-2 py-1 rounded-md
                       hover:border-gray-400 text-black'
                        onClick={open}
                      />
                    </div>
                  </section>
                )}
              </Dropzone>

              <PaperAirplaneIcon
                disabled={room ? false : true}
                className='h-9 w-9 cursor-pointer border-2 border-gray-200 px-2 py-1 rounded-md
                hover:border-gray-400 text-black rotate-90'
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

export default ChatPage;
