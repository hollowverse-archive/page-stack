import * as React from 'React';
import { debounce } from 'lodash';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

const { tween } = require('shifty');

import './PageStack.scss';

export class Page extends React.Component<any, any> {
  private pageRef: HTMLDivElement | null;
  private pageContentRef: HTMLDivElement | null;

  getRef = (ref: HTMLDivElement) => {
    this.pageRef = ref;
  };

  getPageContentRef = (ref: HTMLDivElement) => {
    this.pageContentRef = ref;
  };

  // componentWillMount() {
  //   console.log('this.pageRef', this.pageRef);
  // }

  exit = (element: HTMLElement) => {
    console.log('element', element);

    const { pageRef, pageContentRef } = this;

    if (pageRef && pageContentRef) {
      if (this.props.index !== 0) {
        const {
          top,
          left,
          right,
          bottom,
          width,
          height,
        } = pageContentRef.getBoundingClientRect();

        tween({
          from: { x: pageRef.scrollLeft },
          to: { x: 0 },
          duration: 200,
          easing: 'easeOutQuad',
          step: (state: any) => {
            // console.log('state.x', state.x);
            pageRef.scrollLeft = state.x;
          },
        });
      }
    }
  };

  componentDidMount() {
    const { pageRef, pageContentRef } = this;

    if (pageRef && pageContentRef) {
      if (this.props.index !== 0) {
        pageRef.style.display = 'block';
        pageRef.scrollLeft = 0;

        const {
          top,
          left,
          right,
          bottom,
          width,
          height,
        } = pageContentRef.getBoundingClientRect();

        tween({
          from: { x: pageRef.scrollLeft },
          to: { x: width },
          duration: 200,
          easing: 'easeOutQuad',
          step: (state: any) => {
            pageRef.scrollLeft = state.x;
          },
        });
      }

      // pageRef.addEventListener(
      //   'scroll',
      //   debounce(event => {
      //     if (pageContentRef) {
      //       const {
      //         top,
      //         left,
      //         right,
      //         bottom,
      //         width,
      //         height,
      //       } = pageContentRef.getBoundingClientRect();

      //       console.log(
      //         'top, left, right, bottom, width, height',
      //         '\n',
      //         top,
      //         left,
      //         right,
      //         bottom,
      //         width,
      //         height,
      //       );
      //     }
      //   }, 500),
      // );
    }
  }

  render() {
    const props = this.props;

    return (
      <Transition timeout={300} {...props} onExit={this.exit}>
        {(state: any) => {
          return (
            <div
              className="page"
              ref={this.getRef}
              style={{ display: props.index === 0 ? 'block' : 'none' }}
            >
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
  // private domNode: HTMLDivElement | null;

  // componentDidMount() {
  //   let height;
  //   let width;

  //   if (this.domNode) {
  //     const { parentElement } = this.domNode;

  //     if (parentElement) {
  //       height = parentElement.offsetHeight;
  //       width = parentElement.offsetWidth;
  //     }
  //   }

  //   console.log('height', height);
  //   console.log('width', width);
  // }

  render() {
    return (
      <div className="pageStack">
        <TransitionGroup>{this.props.children}</TransitionGroup>
      </div>
    );
  }
}
