import { Dropdown, TextInput } from 'keep-react';

const ButtonDropDown = () => {
  return (
    <Dropdown
      className='bg-orange-600 mt-4 text-white text-sm font-bold rounded-md hover:bg-orange-800 m-2'
      label='Dropdown button'
      type='primary'
      size='sm'
      dismissOnClick={true}>
      <div className='px-5 pt-3 pb-2'>
        <TextInput
          id='#id-z3rxdy'
          placeholder='Search'
          color='gray'
          sizing='md'
        />
      </div>
      <Dropdown.Item>
        Dashboard
        <span className='ml-auto'></span>
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
        <span className='ml-auto'></span>
      </Dropdown.Item>
      <Dropdown.Item>
        Earnings
        <span className='ml-auto'></span>
      </Dropdown.Item>
      <Dropdown.Item>
        Sign out
        <span className='ml-auto'></span>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ButtonDropDown;
