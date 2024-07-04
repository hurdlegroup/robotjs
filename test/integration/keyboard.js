/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('@ingstory/targetpractice/index.js');

describe('Integration/Keyboard', () => {
  let target, elements = undefined;

  beforeAll(() => {
    //Increase delay to help it reliability.
    robot.setMouseDelay(100);
  });

  beforeEach((done) => {
    target = targetPractice.start();
    target.once('elements', message => {
      elements = message;
      done();
    });
  });

  afterEach(() => {
    targetPractice.stop();
    target = undefined;
  });

  it('types in an element', done => {
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
