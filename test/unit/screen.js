const robot = require('../..');
const os = require('os');

// TODO: Linux check if no display is set, we fail silently with error on stderr

describe('Screen', () => {
  it('gets the pixel color.', () => {
    expect(() => robot.getPixelColor(5, 5)).not.toThrow();
    const pixelColor = robot.getPixelColor(5, 5);
    expect(pixelColor).toBeDefined();
    expect(pixelColor.length).toEqual(6);
    expect(/^[0-9A-F]{6}$/i.test(pixelColor)).toBeTruthy();

    expect(() => robot.getPixelColor(9999999999999, 9999999999999)).toThrowError(/outside the main screen/);
    expect(() => robot.getPixelColor(-1, -1)).toThrowError(/outside the main screen/);
    expect(() => robot.getPixelColor(0)).toThrowError(/Invalid number of arguments/);
    expect(() => robot.getPixelColor(1, 2, 3)).toThrowError(/Invalid number of arguments/);
  });

  it('gets the screen size.', () => {
    expect(() => robot.getScreenSize()).not.toThrow();
    const screenSize = robot.getScreenSize();
    expect(screenSize).toBeDefined();
    expect(screenSize.width).toBeDefined();
    expect(screenSize.height).toBeDefined();
  });

  if (os.platform() === 'win32') {
    it('updates the screen metrics.', () => {
      // Anyway to test this better?
      expect(() => robot.updateScreenMetrics()).not.toThrow();
    });
  }
});
