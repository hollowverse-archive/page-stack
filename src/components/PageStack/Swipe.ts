export class Swipe {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  enableSwiping = (enable: boolean) => {
    this.element.style.overflow = enable ? 'scroll' : 'hidden';
  };

  onFinishedSwipingLeft = callback => {};

  onFinishedSwipingRight = callback => {};

  onFinishedTouchingButDidntSwipe = callback => {};
}
