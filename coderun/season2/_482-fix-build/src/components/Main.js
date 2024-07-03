require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import RoomComponent from './Room';

const starImage = require('../images/frame.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div id="container" className="index">
        <img src={starImage} />
        <p>Комната</p>
        <RoomComponent />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
