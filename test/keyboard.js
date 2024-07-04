const robot = require('..');
const os = require('os');

describe('Keyboard', () => {
  afterEach(() => {
    robot.setKeyboardDelay(10);
  });

  it('taps a key.', function () {
    expect(() => robot.keyTap('a')).not.toThrow();
    expect(() => robot.keyTap('a', 'control')).not.toThrow();
    expect(() => robot.keyTap()).toThrowError(/Invalid number/);
  });

  it('taps a key with a delay.', function () {
    const delay = 250;
    robot.setKeyboardDelay(delay);

    const startTime = Date.now();
    robot.keyTap('a');
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay);
  });

  // This it won't fail if there's an issue, but it will help you identify an issue if ran locally.
  it('tap all keys.', function () {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890,./;\'[]\\'.split('');

    for (const char in chars) {
      expect(() => robot.keyTap(char)).not.toThrow();
    }
  });

  // This it won't fail if there's an issue, but it will help you identify an issue if ran locally.
  it('taps all numpad keys.', function () {
    const numpadKeys = ['lock'];
    numpadKeys.push(...('0123456789'.split(''))); // Numbers
    numpadKeys.push(...('+-*/.'.split(''))); // Specials

    for (const numpadKey in numpadKeys) {
      if (os.platform() === 'linux') {
        expect(() => robot.keyTap('numpad_' + numpadKey)).toThrowError(/Invalid key code/);
      } else {
        expect(() => robot.keyTap('numpad_' + numpadKey)).not.toThrow();
      }
    }
  });

  it('taps a Unicode character.', function () {
    expect(() => robot.unicodeTap("r".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ά".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ö".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ち".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("嗨".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ఝ".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap()).toThrowError(/Invalid character typed./);
  });

  it('toggles a key.', function () {
    expect(() => robot.keyToggle("a", "down")).not.toThrow();
    expect(() => robot.keyToggle("a", "up")).not.toThrow();

    expect(() => robot.keyToggle("ά", "down")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("ά", "up")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("嗨", "down")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("嗨", "up")).toThrowError(/Invalid key code specified./);
  });

  it('toggles a key with a delay.', function () {
    const delay = 250;
    robot.setKeyboardDelay(delay);
    const startTime = Date.now();
    robot.keyToggle("a", "down");
    robot.keyToggle("a", "up");
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay * 2); // Multiplied as we called it twice
  });

  it('types Ctrl+Shift+RightArrow.', function () {
    const modifiers = ['shift', 'control'];

    expect(() => robot.keyToggle("right", "down", modifiers)).not.toThrow();
    expect(() => robot.keyToggle("right", "up", modifiers)).not.toThrow();
  });

  it('types a string.', function () {
    expect(() => robot.typeString("Typed rάöち嗨ఝ 1")).not.toThrow();
    expect(() => robot.typeString()).toThrowError(/Invalid number of arguments./);
  });

  it('types a string with a delay.', function () {
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with delay 600 cpm", 600)).not.toThrow();
    expect(() => robot.typeStringDelayed()).toThrowError(/Invalid number of arguments./);
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with missing delay")).toThrowError(/Invalid number of arguments./);
  });
});
