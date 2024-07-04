const robot = require('../..');

describe('Mouse', () => {
  beforeAll(() => {
    robot.setMouseDelay(100); //Increase delay to help it reliability.
  });

  beforeEach(() => {
    robot.moveMouse(0, 0); // Reset mouse position
  });

  it('gets the mouse position.', () => {
    expect(() => robot.getMousePos()).not.toThrow();
    const mousePosition = robot.getMousePos();
    expect(mousePosition).toBeDefined();
    expect(mousePosition.x).toBeDefined();
    expect(mousePosition.y).toBeDefined();
  });

  it('moves the mouse immediately.', () => {
    expect(() => robot.moveMouse(100, 100)).not.toThrow();
    const currentPos = robot.getMousePos();
    expect(currentPos.x).toEqual(100);
    expect(currentPos.y).toEqual(100);

    expect(() => robot.moveMouse(0, 1, 2, 3)).toThrowError(/Invalid number of arguments./);
    expect(() => robot.moveMouse(0)).toThrowError(/Invalid number of arguments./);
  });

  it('moves the mouse smoothly.', (done) => {
    expect(() => robot.moveMouseSmooth(0, 1, 2, 3)).toThrowError(/Invalid number of arguments./);
    expect(() => robot.moveMouseSmooth(0)).toThrowError(/Invalid number of arguments./);

    const smoothDelay = 100;
    expect(() => robot.moveMouseSmooth(0, 0)).not.toThrow();
    expect(() => robot.moveMouseSmooth(100, 100)).not.toThrow();

    setTimeout(() => {
      const currentPos = robot.getMousePos();
      expect(currentPos.x).toEqual(100);
      expect(currentPos.y).toEqual(100);
      done();
    }, smoothDelay);
  });

  it('clicks the mouse.', () => {
    expect(() => robot.mouseClick()).not.toThrow();
    expect(() => robot.mouseClick("left")).not.toThrow();
    expect(() => robot.mouseClick("middle")).not.toThrow();
    expect(() => robot.mouseClick("right")).not.toThrow();
    expect(() => robot.mouseClick("left", true)).not.toThrow();

    expect(() => robot.mouseClick("party")).toThrowError(/Invalid mouse/);
    expect(() => robot.mouseClick("0")).toThrowError(/Invalid mouse/);
    expect(() => robot.mouseClick("left", 0, "it")).toThrowError(/Invalid number of arguments./);
  });

  it('drags the mouse.', () => {
    expect(() => robot.dragMouse(5, 5)).not.toThrow();

    expect(() => robot.dragMouse(0)).toThrowError(/Invalid number of arguments./);
    expect(() => robot.dragMouse(1, 1, "left", 5)).toThrowError(/Invalid number of arguments./);
    expect(() => robot.dragMouse(2, 2, "party")).toThrowError(/Invalid mouse/);
  });

  it('scrolls the mouse.', () => {
    expect(() => robot.mouseClick()).not.toThrow();
    expect(() => robot.scrollMouse(0, 120)).not.toThrow();
    expect(() => robot.scrollMouse(0, 20 * 120)).not.toThrow();
    expect(() => robot.scrollMouse(0, -5 * 120)).not.toThrow();
    expect(() => robot.scrollMouse(120, 0)).not.toThrow();
    expect(() => robot.scrollMouse(20 * 120, 0)).not.toThrow();
    expect(() => robot.scrollMouse(-5 * 120, 0)).not.toThrow();
    expect(() => robot.scrollMouse(-5 * 120, -5 * 120)).not.toThrow();

    expect(() => robot.scrollMouse()).toThrowError(/Invalid number of arguments./);
  });

  it('toggles the mouse buttons.', () => {
    expect(() => robot.mouseToggle('up', 'right')).not.toThrow();
  });
});
