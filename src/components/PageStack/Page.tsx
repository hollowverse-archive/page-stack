import * as React from 'React';
import Transition from 'react-transition-group/Transition';
import { Swipe } from './Swipe';
const { tween } = require('shifty');

const DURATION = 200;

export class Page extends React.Component<any, any> {
  private pageRef: HTMLDivElement | null;
  private swipe: Swipe;

  getRef = (ref: HTMLDivElement) => {
    this.pageRef = ref;
  };

  componentDidMount() {
    const pageRef = this.pageRef as HTMLDivElement;

    this.swipe = new Swipe(pageRef);

    // When the component mounts, we disable swiping to keep things from moving
    // unintentionally
    // this.swipe.enableSwiping(false);

    if (this.props.index > 0) {
      this.swipe.onFinishedSwipingLeft(() => {
        this.slide('in');
      });

      this.swipe.onFinishedSwipingRight(() => {
        this.slide('out');
      });

      this.swipe.onFinishedTouchingButDidntSwipe(() => {
        this.ensurePageIsSlidEitherAllTheWayInOrOut();
      });
    }
  }

  ensurePageIsSlidEitherAllTheWayInOrOut = () => {
    return 'ok';
  };

  handleEnter = () => {
    if (this.props.index !== 0) {
      const pageRef = this.pageRef as HTMLDivElement;

      pageRef.scrollLeft = 0;

      this.slide('in');
    }
  };

  handleExit = () => {
    if (this.props.index !== 0) {
      this.slide('out');
    }
  };

  slide = (direction: 'in' | 'out') => {
    const pageRef = this.pageRef as HTMLDivElement;
    const { scrollLeft, scrollWidth } = pageRef;
    const pageWidth = scrollWidth / 2;
    const to = direction === 'in' ? pageWidth : 0;
    const scrollDistance = Math.abs(to - scrollLeft);
    const scrollDistanceToPageWidth = scrollDistance / pageWidth;
    const duration = scrollDistanceToPageWidth * DURATION;

    tween({
      from: { x: scrollLeft },
      to: { x: to },
      duration,
      easing: 'easeOutQuad',
      step: ({ x }: any) => {
        pageRef.scrollLeft = x;
      },
    });
  };

  render() {
    const props = this.props;

    return (
      <Transition
        {...props}
        timeout={DURATION}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
      >
        {() => {
          return (
            <div className="page" ref={this.getRef}>
              <div className="pageContent" style={{ background: props.color }}>
                <button onClick={props.onPush}>Push page</button>
                {props.index > 0 && (
                  <button onClick={() => props.onPop(props.index)}>
                    Pop page
                  </button>
                )}
              </div>
              <div className="pageEmptySpace" />
            </div>
          );
        }}
      </Transition>
    );
  }
}
