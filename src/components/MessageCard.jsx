import { BsThreeDots } from 'react-icons/bs';
import EditPanel from './EditPanel';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const MessageCard = ({
  m,
  handleEdit,
  handleDelete,
  isEditing,
  setIsEditing,
  editedMessage,
  setEditedMessage,
  onSubmitEdit,
}) => {
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const { user } = useUser();
  const tooglePanel = () => {
    setEditPanelOpen(!editPanelOpen);
  };

  useEffect(() => {}, [editPanelOpen]);
  return (
    <div
      key={m._id}
      className={clsx(
        'w-fit p-2  rounded-md  max-w-[calc(50%-50px)] mb-2 min-w-[200px] relative',
        user._id === m.author || user._id === m.author._id
          ? 'bg-blue-200 self-end mr-2'
          : 'bg-green-200 self-start'
      )}>
      <div className='flex gap-1 items-center justify-center'>
        <p className='text-[13px] text-start w-full'>{m.authorName}</p>
        <button>
          {(user._id === m.author || user._id === m.author._id) && (
            <BsThreeDots onClick={tooglePanel} />
          )}
        </button>
      </div>
      {editPanelOpen ? (
        <EditPanel
          message={m}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          tooglePanel={tooglePanel}
        />
      ) : null}
      {isEditing === m._id ? (
        <form
          className='flex flex-col gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(null);
            onSubmitEdit();
          }}>
          <textarea
            className='text-[10px] w-full h-auto p-1 rounded-md border-2 border-gray-300 hover:border-gray-400 resize-none'
            type='text'
            rows={5}
            value={editedMessage}
            onChange={(e) => {
              setEditedMessage(e.target.value);
            }}
          />
          <button
            type='submit'
            className='w-full border-2 border-gray-500 rounded-md text-xs p-1 hover:bg-gray-500 hover:text-white'>
            Save
          </button>
        </form>
      ) : (
        <div className='flex flex-col flex-wrap max-w-md'>
          <hr className=' border-1 w-full rounded-md border-grey-600' />

          <p className='text-[12px] text-start mt-1 max-w-[190px] break-words'>
            {m.isDeleted ? (
              <em>{`(Message deleted)`}</em>
            ) : m.isEdited ? (
              <div className=''>
                <p>{m.body}</p>
                <em className='text-[10px] text-gray-500'>{`(edited)`}</em>
              </div>
            ) : (
              m.body
            )}
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
                className='scrollbar'
                src={m.fileAtt}
                height='auto'
                width='190px'></iframe>
            </>
          )}
        </div>
      )}
      <div>
        <p className='text-[10px] w-full text-end'>
          {format(new Date(m.time), 'p')}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
