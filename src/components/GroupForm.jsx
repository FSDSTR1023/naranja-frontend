/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useGroups } from '../context/GroupContext';


const GroupForm = () => {
    const { createGroup } = useGroups();
    const { allUsers, user } = useUser();
    const { handleSubmit, reset, register } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
    const [names, setNames] = useState([]);
    const handleClick = (e, contact) => {
        e.preventDefault();
        const id = contact._id;
        const name = contact.name;
        if (members.includes(id)) {
            const newMembers = members.filter((member) => member !== id);
            setMembers(newMembers);
            console.log(members, 'members')
        } else {
            setMembers([...members, id]);
            console.log(members, 'members')
        }

        if (names.includes(name)) {
            const newNames = names.filter((userName) => userName !== name);
            setNames(newNames);
            console.log(names, 'names');
        } else {
            setNames([...names, name]);
            console.log(names, 'names');
        }


    }

    const onSubmit = handleSubmit(async (data) => {
        data.members = members;
        const newGroup = {
            name: data.groupName,
            description: data.groupDescription,
            members: [...members, user._id],
            ownerUser : user._id
        }
        try {
            await createGroup(newGroup);
            setMembers([]);
            setNames([]);
            navigate('/profile-page');
            reset();
        } catch (error) {
            setError(error.message);
        }
    });

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold my-6'>Nuevo Grupo</h1>
            <form className='w-full max-w-lg' onSubmit={onSubmit} >
                <div className='flex flex-wrap'>
                    <input
                        {...register('groupName', { required: true })}
                        type="text"
                        autoComplete='on'
                        name='groupName'
                        placeholder='Nombre del grupo'
                        className='appearance-none block w-full bg-gray-200
               text-gray-700 border border-gray-200 rounded 
               py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500 my-2'/>
                </div>
                <div className='flex flex-wrap'>
                    <textarea
                        {...register('groupDescription', { required: true })}
                        autoComplete='on'
                        name='groupDescription'
                        placeholder='Descripcion del grupo'
                        className=' resize-none appearance-none block w-full h-32 bg-gray-200
                   text-gray-700 border border-gray-200 rounded 
                   py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                   focus:border-gray-500 my-2'
                    ></textarea>
                </div>
                <div className='flex flex-wrap'>
                    {console.log(allUsers)}
                    {allUsers.map((contact) => (
                        <button key={contact._id} onClick={(e) => handleClick(e, contact)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 
                            px-4 m-2 rounded focus:outline-none mt-2 focus:shadow-outline'> {contact.name} </button>
                    ))}
                </div>
                <div className='mb-4'>Members:</div>
                    <div className='my-1'>{names.map((name) => (
                        <span className='mx-2 py-1 rounded-lg border-2 border-gray-500 p-2' key={name}>{name}</span>
                    ))} </div>
                
                <div className='flex flex-wrap -mx-3'>
                    <div className='w-full px-3 text-center'>
                        <button
                            type='submit'
                            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 
              px-4 rounded focus:outline-none mt-2 focus:shadow-outline'>
                            Crear grupo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GroupForm;