import { useForm } from 'react-hook-form';

const FormsTaskCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Titulo'
        />
        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'></textarea>
        <input
          type='date'
          placeholder='Fecha de Entrega'
        />
        <input
          type='date'
          placeholder='Fecha de Inicio'
        />
        <button type='submit'>Crear</button>
        <select
          name='status'
          id='status'>
          <option value='En Proceso'>En Proceso</option>
          <option value='Pendiente'>Pendiente</option>
          <option value='Finalizada'>Finalizada</option>
        </select>
        <select
          name='Group'
          id='Group'>
          {/* {aca va el map de los grupos} */}
        </select>
      </form>
    </div>
  );
};

export default FormsTaskCreate;
