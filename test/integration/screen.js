/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('@ingstory/targetpractice/index.js');

describe('Integration/Screen', () => {
  const targetPracticeDelay = 3000;
  let elements, target = undefined;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL += targetPracticeDelay;
  });

  beforeEach((done) => {
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

  it('gets a specific pixel color', (done) => {
    const expected = 'c0ff33';
    const color_1 = elements.color_1;
    const sleepTime = robot.getPixelColor(color_1.x, color_1.y) === expected ? 0 : targetPracticeDelay

    setTimeout(() => {
      const color = robot.getPixelColor(color_1.x, color_1.y);
      expect(color).toEqual(expected);
      done();
    }, sleepTime);
  });
});
