import * as React from 'react';

import './Tracks.scss';

export class Tracks extends React.Component {
  render() {
    return (
      <div className="tracks" style={{ zIndex: 2, position: 'fixed' }}>
        {this.props.children}
      </div>
    );
  }
}
