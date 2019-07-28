import { Subject } from "rxjs";
import { scan } from "rxjs/operators";

const subject = new Subject();

const keepTrack = subject.pipe(
  scan((acc, curr) => {
    acc.push(curr);
    if (acc.length >= 3) {
        acc.shift();
    }
    return acc;
  }, [])
);

export const graphService = {
  sendData: node => {
    subject.next(node);
  },
  getData: () => {
    return keepTrack;
  }
};
