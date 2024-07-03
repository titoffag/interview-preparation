/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import Room from 'components/Room';

describe('RoomComponent', function () {
  it('should have exact number of children', function () {
    const RoomComponent = createComponent(Room);
    expect(RoomComponent.props.children.length).to.equal(25);
  });
});
