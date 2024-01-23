import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className='bg-orange-600 mt-4
       text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 
       mb-2'
        onClick={() => navigate('/create-group')}>
        Crear Grupo
      </button>
    </div>
  );
};

export default CreateGroupButton;
