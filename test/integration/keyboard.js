/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('../../tools/targetPractice');

describe('Integration/Keyboard', () => {
  beforeAll(() => {
    robot.setMouseDelay(100); // Increase delay to help it reliability.
  });

  beforeEach((done) => {
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
