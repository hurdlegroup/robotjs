/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('../../tools/targetPractice');
const os = require('os');

describe('Integration/Keyboard', () => {
  beforeAll(() => {
    robot.setMouseDelay(100); // Increase delay to help it reliability.
  });

  beforeEach((done) => {
    if (os.platform() === 'win32' || os.platform() === 'darwin') {
      pending('Win32 and Darwin platforms are flaky with integration tests');
      return;
    }

    robot.moveMouse(0, 0); // Reset mouse position
    targetPractice.once('ready', () => {
      done();
    });
    targetPractice.start();
  });

  afterEach(() => {
    targetPractice.stop();
  });

  it('types in an element', (done) => {
    const stringToType = 'hello world';

    // Currently Target Practice waits for the "user" to finish typing before sending the event.
    targetPractice.once('type', (element) => {
      expect(element.id).toEqual('input_1');
      expect(element.text).toEqual(stringToType);
      done();
    });

    const inputTarget = targetPractice.elements.input_1;
    robot.moveMouse(inputTarget.x, inputTarget.y);
    robot.mouseClick();
    robot.typeString(stringToType);
  });
});
