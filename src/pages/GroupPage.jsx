import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { useGroups } from '../context/GroupContext';
import DragDropContext from '../components/DragDropContext';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';
import ToolTip from '../components/ToolTip';
import loadingGif from '../assets/loadingPage.png';
import { FiUserPlus } from 'react-icons/fi';
import ButtonDropDownGroup from '../components/ButtonDropDownGroup';
import Modal from '../components/Modal';

import { BiExit } from 'react-icons/bi';
import AddMemberForm from '../components/AddMemberForm';
import { useNavigate } from 'react-router-dom';

import ChatComponent from '../components/ChatComponent';

const GroupPage = () => {
  const [currentMember, setCurrentMember] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [addContainerInput, setAddContainerInput] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [containerName, setContainerName] = useState('');
  const { currentGroup, groups, deleteMemberFromGroup } = useGroups();
  const { user } = useUser();
  const { createNewTask, containers, setContainers, getAllTasks, pageLoading } =
    useTasks();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const filteredMembers = currentGroup?.members?.filter((member) => {
    return member._id !== user?._id;
  });

  useEffect(() => {
    getAllTasks(currentGroup?._id);
  }, [
    currentGroup?._id,
    isModalVisible === false,
    isConfirmationVisible === false,
  ]);

  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${uuidv4()}`;
    const newContainer = {
      id,
      title: containerName,
      groupId: currentGroup?._id,
      userId: user?._id,

      items: [],
    };
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        groupId: currentGroup?._id,
        userId: user?._id,

        items: [],
      },
    ]);
    setContainerName('');
    setAddContainerInput(!addContainerInput);
    createNewTask(newContainer);
  };

  const handleDeletMemberFromGroup = async (member) => {
    await deleteMemberFromGroup(currentGroup?._id, member);
    setIsConfirmationVisible(false);
  };

  return (
    <div className='flex flex-col bg-gray-500 w-full h-full'>
      <div className='flex flex-wrap w-full  bg-orange-500 items-center justify-center gap-3 box-border md:justify-between'>
        <div className='ml-3 flex flex-row gap-3 justify-center items-center'>
          <ButtonDropDownGroup groups={groups} />
          <h1 className='text-xs font-bold text-gray-700'>
            {currentGroup?.name}
          </h1>
        </div>

        {addContainerInput ? (
          <div className='flex flex-row w-[60%] justify-center items-center gap-3'>
            <button
              onClick={onAddContainer}
              className='bg-gray-200 p-2 text-center text-gray-700 text-[9px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto'>
              Add
            </button>
            <input
              className='border-2 border-gray-500 rounded-lg py-1 px-1 w-full mr-3'
              type='text'
              placeholder='Container Title'
              name='containername'
              onKeyDown={(e) =>
                (e.key === 'Escape' &&
                  setAddContainerInput(!addContainerInput)) ||
                (e.key === 'Enter' && onAddContainer())
              }
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
            />
          </div>
        ) : (
          <div className='mr-3 flex flex-row'>
            <button
              className='bg-gray-200 p-2 text-center text-gray-700 text-[9px]               
              font-bold rounded-md hover:bg-gray-300 m-2 whitespace-nowrap'
              onClick={() => setAddContainerInput(!addContainerInput)}>
              Añadir Tablero
            </button>
            <div className='relative flex flex-row mr-3 items-center justify-center ml-3'>
              {filteredMembers?.map((member) => (
                <ToolTip
                  key={member?._id}
                  label={member?.email}>
                  <img
                    onClick={() => {
                      user?._id === currentGroup?.ownerUser
                        ? (setIsConfirmationVisible(true),
                          setCurrentMember(member))
                        : null;
                    }}
                    key={member?._id}
                    className='w-6 h-6 rounded-full relative left-0 top-0 cursor-pointer'
                    src={member?.avatar}
                    alt='Avatar'
                  />
                  {isConfirmationVisible && (
                    <div className='z-20 fixed top-0 left-0 w-screen h-screen bg-gray-500/20'>
                      <div className='absolute top-36 right-56 bg-white p-6 rounded-md'>
                        <div className='flex flex-col items-center justify-center p-2 h-auto w-[250px]'>
                          <p className='text-sm font-bold text-gray-700'>
                            Are sure you want to delete{' '}
                            <em className='text-red-500'>
                              {currentMember?.email}{' '}
                            </em>
                            from this group ?
                          </p>
                          <div className='flex items-center justify-center p-2 mt-2 gap-6'>
                            <button
                              className='bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600'
                              onClick={() => setIsConfirmationVisible(false)}>
                              Cancel
                            </button>
                            <button
                              className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'
                              onClick={() =>
                                handleDeletMemberFromGroup(currentMember)
                              }>
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </ToolTip>
              ))}
            </div>

            <div className='flex gap-2 items-center justify-center'>
              {user?._id === currentGroup?.ownerUser ? (
                <button
                  onClick={() => toggleModal()}
                  className='bg-gray-200 p-2 text-center text-gray-700 text-[9px]  w-fit             
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-1'>
                    <FiUserPlus className=' text-gray-800 w-4 h-4 ' />{' '}
                    <span>Miembro</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    deleteMemberFromGroup(currentGroup?._id, user);
                    navigate('/profile-page');
                  }}
                  className='bg-gray-200 p-2 text-center text-gray-700 text-[9px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-1'>
                    <BiExit className=' text-gray-800 w-5 h-5 rounded-full' />{' '}
                    <span>Group</span>
                  </div>
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className='bg-gray-200 p-2 text-center text-gray-700 text-[9px]               
              font-bold rounded-md hover:bg-gray-300 m-2 pointer-events-auto whitespace-nowrap'>
                Open Chat
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}>
        <AddMemberForm toggleModal={toggleModal} />
      </Modal>
      {pageLoading ? (
        <div className='w-full h-full flex items-start justify-center transition '>
          <img
            className='w-[450px] h-[450px] ease-in-out animate-spin duration-500'
            src={loadingGif}
            alt='loading'
          />
        </div>
      ) : (
        <div className='flex flex-row h-full w-full '>
          <div className='h-[90%] w-full bg-gray-300 overflow-auto'>
            <DragDropContext
              containerName={containerName}
              setContainerName={setContainerName}
              containers={containers}
              setContainers={setContainers}
            />
          </div>

          <div
            className={clsx(
              'md:h-[87%] w-[90%] transition h-[82%]',
              !isOpen ? 'hidden' : null
            )}>
            <ChatComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
