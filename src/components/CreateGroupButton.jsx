import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className='bg-orange-500 text-white rounded-md font-medium hover:bg-orange-500 hover:border-orange-500 whitespace-nowrap text-xs py-3.5 px-4 border-2 border-orange-500'
        onClick={() => navigate('/create-group')}>
        Crear Grupo
      </button>
    </div>
  );
};

export default CreateGroupButton;
