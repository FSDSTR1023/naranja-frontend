import { describe, test, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import { UserContext } from '../context/UserContext';
import AvatarHandler from './AvatarHandler';

describe('AvatarHandler', () => {
  test('True should be true', () => {
    expect(true).toBe(true);
  });
  test('rendern component should render', () => {
    render(
      <UserContext.Provider
        value={{
          user: {
            _id: '1234',
            name: 'test',
            avatar: 'test',
            isOnline: 'Online',
          },
        }}>
        <AvatarHandler />
      </UserContext.Provider>
    );
    screen.debug();
  });
});
