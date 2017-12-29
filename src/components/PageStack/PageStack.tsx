import * as React from 'React';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

import './PageStack.scss';

export class PageStack extends React.Component<any, any> {
  render() {
    return (
      <div className="pageStack">
        <TransitionGroup>{this.props.children}</TransitionGroup>
      </div>
    );
  }
}
