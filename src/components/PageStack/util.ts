// calculateDuration = (to: number): number => {
//   const pageRef = this.pageRef as HTMLDivElement;
//   const { velocity } = this;
//   const scrollDistance = Math.abs(to - pageRef.scrollLeft);

//   return 1;
// };

// private velocity: Velocity = {
//   scrollLeftChange: 0,
//   timestampChange: 0,
//   direction: 'stationary',
// };

// type FrameSnapshot = { scrollLeft: number; timestamp: number } | null;
// type Velocity = {
//   scrollLeftChange: number;
//   timestampChange: number;
//   direction: 'left' | 'right' | 'stationary';
// };

// requestAnimationFrame((timestamp: number) => {
//   const { firstFrameSnapshot: ffs, secondFrameSnapshot: sfs } = this;

//   if (ffs === null) {
//     this.firstFrameSnapshot = {
//       scrollLeft: pageRef.scrollLeft,
//       timestamp,
//     };
//   }

//   if (sfs === null && ffs) {
//     if (timestamp - ffs.timestamp < 50) {
//       this.secondFrameSnapshot = {
//         scrollLeft: pageRef.scrollLeft,
//         timestamp,
//       };
//     } else {
//       this.firstFrameSnapshot = null;
//     }
//   }

//   if (ffs && sfs) {
//     if (ffs.scrollLeft > sfs.scrollLeft) {
//       this.velocity.direction = 'right';
//       this.velocity.scrollLeftChange = ffs.scrollLeft - sfs.scrollLeft;
//       this.velocity.timestampChange = ffs.timestamp - sfs.timestamp;
//     } else if (sfs.scrollLeft > ffs.scrollLeft) {
//       this.velocity.direction = 'left';
//       this.velocity.scrollLeftChange = sfs.scrollLeft - ffs.scrollLeft;
//       this.velocity.timestampChange = ffs.timestamp - sfs.timestamp;
//     } else {
//       this.velocity.direction = 'stationary';
//       this.velocity.scrollLeftChange = 0;
//       this.velocity.timestampChange = 0;
//     }

//     this.firstFrameSnapshot = null;
//     this.secondFrameSnapshot = null;
//   }
// });
