import * as React from 'react';
import { PageStacks } from './PageStacks/PageStacks';

import './styles.scss';

export class App extends React.Component {
  render() {
    return (
      <div className="apptsx">
        <div className="limitedWidthContainer">
          <div className="pageStack">
            <div className="page slideNone color1">
              <div className="pageContent">Some content</div>
              <div className="pageEmptySpace" />
            </div>

            <div className="page color2">
              <div className="pageContent">Slide me right</div>
              <div className="pageEmptySpace" />
            </div>
          </div>

          {/* <div className="coveringPage">
            <div className="visibleCoveringPage" />
            <div className="transparentCoveringPage" />
          </div> */}
        </div>
      </div>
    );
  }
}
