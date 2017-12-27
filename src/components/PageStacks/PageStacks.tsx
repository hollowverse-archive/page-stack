import * as React from 'React';
import { Tracks } from './Tracks';
import './PageStacks.scss';

export class PageStacks extends React.Component {
  private domNode: HTMLDivElement | null;

  componentDidMount() {
    let height;
    let width;

    if (this.domNode) {
      const { parentElement } = this.domNode;

      if (parentElement) {
        height = parentElement.offsetHeight;
        width = parentElement.offsetWidth;
      }
    }

    console.log('height', height);
    console.log('width', width);
  }

  render() {
    return (
      <div className="pageStacks" ref={ref => (this.domNode = ref)}>
        <div className="firstPage" style={{ zIndex: 1, position: 'fixed' }} />

        <div className="secondPage" style={{ zIndex: 2, position: 'fixed' }}>
          <div className="visibleContent">Maroon content</div>
          <div className="empty" />
        </div>
      </div>
    );
  }
}
