/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('./targetPractice');

describe('Integration/Screen', () => {
  beforeEach((done) => {
    targetPractice.once('ready', () => {
      done();
    });
    targetPractice.start();
  });

  afterEach(() => {
    targetPractice.stop();
  });

  it('gets a specific pixel color', () => {
    const color_1 = targetPractice.elements.color_1;
    expect(robot.getPixelColor(color_1.x, color_1.y)).toEqual('c0ff33');
  });
});
