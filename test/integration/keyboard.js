/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('@ingstory/targetpractice/index.js');

describe('Integration/Keyboard', () => {
  const targetPracticeDelay = 3000;
  let target, elements = undefined;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL += targetPracticeDelay;
    robot.setMouseDelay(100); // Increase delay to help it reliability.
  });

  beforeEach((done) => {
    robot.moveMouse(0, 0); // Reset mouse position
    target = targetPractice.start();
    target.once('elements', (message) => {
      elements = message;
      done();
    });
  });

  afterEach(() => {
    targetPractice.stop();
    target = undefined;
  });

  it('types in an element', (done) => {
    const stringToType = 'hello world';

    // Currently Target Practice waits for the "user" to finish typing before sending the event.
    target.once('type', element => {
      expect(element.id).toEqual('input_1');
      expect(element.text).toEqual(stringToType);
      done();
    });

    const inputTarget = elements.input_1;
    robot.moveMouse(inputTarget.x, inputTarget.y);
    robot.mouseClick();
    robot.typeString(stringToType);
  });
});
