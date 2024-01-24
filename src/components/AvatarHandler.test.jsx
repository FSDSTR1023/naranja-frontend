import { describe, test, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import ToolTip from './ToolTip';

describe('AvatarHandler', () => {
  test('True should be true', () => {
    expect(true).toBe(true);
  });
  test('rendern component should render', () => {
    render(<ToolTip />);
    screen.debug();
  });
});
