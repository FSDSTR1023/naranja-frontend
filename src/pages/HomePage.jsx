import { useState } from 'react';
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const HomePage = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className='bg-gradient-to-b from-yellow-100 via-blue-300 to-blue-700 w-screenorange h-screen'>
      <div className=" text-center">
        <h1 className='pt-40 pb-10 text-5xl tracking-normal leading-tight font-bold text-orange-500 max-w-6xl mx-auto'>
          Todo tu equipo en un grupo, para lograr la máxima eficiencia, rapidez y comodidad en la comunicación y el trabajo.
        </h1>
        <h2 className='text-xl text-gray-900 max-w-6xl mx-auto'>
          Con TaskTalk puedes tener un grupo con cada equipo con el que trabajas, en él podrás <span> </span>
          <span className="font-bold text-orange-600">chatear</span>, hacer <span className="font-bold text-orange-600"> videollamadas </span><br /> y tener un 
          <span className="font-bold text-orange-600"> dashboard de tareas </span>
          con el que poder visualizar el progreso en tu proyecto. Comunícate de forma efectiva y utiliza el dashboard de tareas para sacar el máximo partido a tu equipo.
        </h2>
        {isAuthenticated ? <button onClick={() => { navigate('/profile-page') }} className='bg-orange-600 mt-8 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800'>Ve a tu perfil</button> : <button onClick={() => { navigate('/register-page') }} className='bg-orange-600 mt-8 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800'>Regístrate aquí</button>}
        <br />
        <button onClick={toggleModal}>Abrir Modal</button>
        <Modal isVisible={isModalVisible} onClose={toggleModal}>
          <p>Prueba</p>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
