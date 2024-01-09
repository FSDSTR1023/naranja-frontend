import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { PaperClipIcon } from '@heroicons/react/solid';
import { PaperAirplaneIcon } from '@heroicons/react/solid';
import UserCard from '../components/UserCard';
import { useUser } from '../context/UserContext';
import { uploadImage } from '../api/services';
import { useMessage } from '../context/MessagesContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useGroups } from '../context/GroupContext';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { allUsers, user, selectedUser } = useUser();
  const { getAllGroups, getGroupById, currentGroup } = useGroups();
  const { socket, createMessage, getAllMessages, message, room, setMessage } =
    useMessage();
  const [chatMessage, setChatMessage] = useState('');
  const [uplodedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    socket.emit('join-room', room);
    const groupToGet = {
      groupId: room,
      name: user.name + selectedUser.name,
      description: 'chat-privado',
      ownerUser: user._id,
      members: [user._id, selectedUser._id],
    };
    const getInfo = async () => {
      await getGroupById(groupToGet);
      await getAllMessages(currentGroup._id);
      await getAllGroups(user._id);
    };
    getInfo();
  }, [room]);

  const onSubmit = async (e) => {
    console.log(uplodedFile, '<-- uplodedFile en onSubmit');
    e.preventDefault();
    if (uplodedFile) {
      const response = await uploadImage(uplodedFile);
      setPreviewImage(null);
      const messageData = {
        group: currentGroup._id,
        room: room,
        body: chatMessage,
        author: user._id,
        authorName: user.name,
        image: response,
        video: '',
        fileAtt: '',
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      setChatMessage('');
      setUploadedFile(null);
      await socket.emit('send-message', { room, messageData, user });
      await setMessage((list) => [...list, messageData]);
      createMessage(messageData);
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
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData);
      setChatMessage('');
      await socket.emit('send-message', { room, messageData, user });
      await setMessage((list) => [...list, messageData]);
      createMessage(messageData);
    }
  };
  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', (data) => {
      console.log(data, '<-- data del receive-message');
      setMessage((list) => [...list, data]);
    });
    return () => {
      socket.off('receive-message');
    };
  }, [socket]);

  return (
    <div className='flex flex-row justify-center items-center w-full'>
      <div className='w-full justify-center items-center flex flex-col'>
        <div
          className='flex flex-col  border-2 border-gray-400 rounded-md 
        w-[calc(100%-100px)] p-2 h-[calc(100vh-130px)]'>
          <div>
            <div className='flex items-center justify-center w-full bg-zinc-500/50 text-white p-6 rounded md'>
              <p className='text-[14px] justify-center flex text-black'>
                Este es el comienzo de tu conversacion con {selectedUser.name}{' '}
                {currentGroup._id}
                {currentGroup.name}
              </p>
            </div>
          </div>
          <ul className='flex flex-col p-2 rounded-md overflow-y-scroll no-scrollbar'>
            <ScrollToBottom className='overflow-y-scroll no-scrollbar w-full h-full'>
              {message && message?.[0] !== '' ? (
                message?.map((m, index) => (
                  <li
                    key={index}
                    className=' w-fit p-2 bg-blue-200 rounded-md self-end m-w-[calc(50%-50px)] mb-2'>
                    <div className='flex gap-1 items-center justify-center'>
                      <p className='text-[13px] text-start w-full'>
                        {m.authorName}
                      </p>
                    </div>
                    <div className='flex flex-wrap max-w-md'>
                      <hr className=' border-1 w-full rounded-md border-grey-600' />
                      <p className='text-[14px] text-start flex '>{m.body}</p>
                      {m.image && (
                        <img
                          className='w-[150px] m-2'
                          src={m.image}
                          alt='file'
                        />
                      )}
                    </div>
                    <div>
                      <p className='text-[10px] w-full text-end'>{m.time}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className='text-[14px] text-start flex '>No hay mensajes</p>
              )}
            </ScrollToBottom>
          </ul>
        </div>
        <div className='flex flex-row justify-between rounded-md w-[calc(100%-115px)] p-1 border-2 border-gray-400'>
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
                className='w-12 h-12 object-cover align-center m-2'
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
      <div className='flex flex-col w-fit justify-start items-start self-start'>
        {allUsers?.map((contact) => (
          <UserCard
            key={contact._id}
            contact={contact}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
