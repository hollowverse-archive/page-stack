import * as React from 'React';
import { debounce } from 'lodash';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

const { tween } = require('shifty');

import './PageStack.scss';

const DURATION = 200;

export class Page extends React.Component<any, any> {
  private pageRef: HTMLDivElement | null;
  private pageContentRef: HTMLDivElement | null;

  getRef = (ref: HTMLDivElement) => {
    this.pageRef = ref;
  };

  getPageContentRef = (ref: HTMLDivElement) => {
    this.pageContentRef = ref;
  };

  animate = (animationType: 'in' | 'out') => {
    const pageRef = this.pageRef as HTMLDivElement;
    const pageContentRef = this.pageContentRef as HTMLDivElement;

    if (this.props.index !== 0) {
      if (animationType === 'in') {
        pageRef.scrollLeft = 0;
      }

      const { width } = pageContentRef.getBoundingClientRect();

      tween({
        from: { x: pageRef.scrollLeft },
        to: { x: animationType === 'out' ? 0 : width },
        duration: DURATION,
        easing: 'easeOutQuad',
        step: (state: any) => {
          pageRef.scrollLeft = state.x;
        },
      });
    }
  };

  animateIn = () => {
    this.animate('in');
  };

  animateOut = () => {
    this.animate('out');
  };

  render() {
    const props = this.props;

    return (
      <Transition
        {...props}
        timeout={DURATION}
        onEnter={this.animateIn}
        onExit={this.animateOut}
      >
        {() => {
          return (
            <div className="page" ref={this.getRef}>
              <div
                className="pageContent"
                style={{ background: props.color }}
                ref={this.getPageContentRef}
              >
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

export class PageStack extends React.Component<any, any> {
  render() {
    return (
      <div className="pageStack">
        <TransitionGroup>{this.props.children}</TransitionGroup>
      </div>
    );
  }
}
