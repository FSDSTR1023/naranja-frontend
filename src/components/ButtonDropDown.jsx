import { Dropdown } from 'keep-react';

const DropdownComponent = () => {
  return (
    <Dropdown
      label='Dropdown button'
      size='sm'
      type='primary'
      dismissOnClick={true}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
};
export default DropdownComponent;
