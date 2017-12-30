import * as Rx from 'rxjs/Rx';

export class Swipe {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    const mapTouchEvent = (event: TouchEvent) => {
      const { clientX: x, clientY: y } = event.changedTouches[0];

      return { x, y, timestamp: Date.now() };
    };

    /*
    What is a swipe?

    We detect a swipe by monitoring `touchend` events. When a user touch ends,
    we start looking at the `scroll` event on our element for MONITOR_PERIOD of time.
    Based on where it is moving, we decide whether it was a swipe right or a swipe left.
    */

    this.element.addEventListener('touchstart', e => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      console.log('touchstart');
    });

    const touchEnd$ = Rx.Observable.fromEvent(this.element, 'touchend').do(
      () => {
        // console.log('touchend');
      },
    );
    const scroll$ = Rx.Observable.fromEvent(this.element, 'scroll').do(() => {
      console.log('scroll');
    });

    const swipe$ = touchEnd$
      .map(() => scroll$.takeUntil(Rx.Observable.interval(10).first()))
      // .switch()
      .map(x => x.count())
      .switch();

    swipe$.subscribe(e => {
      console.log('e', e);
    });
    // const completeTouches$ = touchStarts$
    //   .map(touchStart =>
    //     touchMoves$
    //       .do(() => {
    //         console.log('move');
    //       })
    //       .takeUntil(touchEnds$)
    //       .buffer(Rx.Observable.merge(Rx.Observable.interval(400), touchEnds$))
    //       .last(),
    //   )
    //   .switch();

    // completeTouches$.subscribe(e => {
    //   e.forEach(es => {
    //     console.log('e', es.x, es.timestamp);
    //   });
    // });

    // completeTouches$.subscribe(e => {
    //   console.log('e', e);
    // });

    // touchStarts$
    //   .switchMap(() =>
    //     touchMoves$.takeUntil(touchEnds$).reduce(
    //       (acc: any, change: any) => {
    //         acc.x = Math.abs(acc.x - change.x);
    //         acc.y = Math.abs(acc.y - change.y);

    //         return acc;
    //       },
    //       { x: 0, y: 0 },
    //     ),
    //   )
    //   .map(({ x, y }) => (x > y ? 'HORIZONTAL' : 'VERTICAL'))
    //   .subscribe(swipeType => {
    //     console.log('swipeType', swipeType);
    //     // if (swipeType === 'HORIZONTAL') {
    //     //   this.enableSwiping(true);
    //     // }
    //   });

    // const touchEvent = document.createEvent('TouchEvent')
    // document.createTouch

    // .concatMap(dragStartEvent => {
    //   return moves.takeUntil(ends).map(swipeEvent => {
    //     return swipeEvent;
    //   });
    // })
    // .forEach(console.log);
  }

  enableSwiping = (enable: boolean) => {
    this.element.style.overflow = enable ? 'scroll' : 'hidden';
  };

  onFinishedSwipingLeft = callback => {};

  onFinishedSwipingRight = callback => {};

  onFinishedTouchingButDidntSwipe = callback => {};
}
