/**
 * @format
 */

import 'react-native';
import React from 'react';
import { VotePage } from 'page';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('VotePage', () => {
  it('renders without crash', () => {
    renderer.create(<VotePage />);
  });
});

