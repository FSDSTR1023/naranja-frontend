import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className='bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 whitespace-nowrap text-sm py-3.5 px-4 border border-orange-600'
        onClick={() => navigate('/create-group')}>
        Crear Grupo
      </button>
    </div>
  );
};

export default CreateGroupButton;
