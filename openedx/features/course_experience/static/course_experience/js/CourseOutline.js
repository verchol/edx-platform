import * as constants from 'edx-ui-toolkit/src/js/utils/constants';

export class CourseOutline {
  constructor(root) {
    document.querySelector(root).addEventListener('keydown', (event) => {
      const focusable = [...document.querySelectorAll('.outline-item.focusable')];
      const currentFocusIndex = focusable.indexOf(event.target);

      switch (event.keyCode) {  // eslint-disable-line default-case
      case constants.keyCodes.down:
        event.preventDefault();
        focusable[Math.min(currentFocusIndex + 1, focusable.length - 1)].focus();
        break;
      case constants.keyCodes.up:
        event.preventDefault();
        focusable[Math.max(currentFocusIndex - 1, 0)].focus();
        break;
      }
    });
  }
}
