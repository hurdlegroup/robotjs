const robot = require('../..');
const os = require('os');

// TODO: To test F1-24 keys, audio keys, keyboard light keys, referenced in keycode.h

describe('Keyboard', () => {
  afterEach(() => {
    robot.setKeyboardDelay(10); // Reset the delay
  });

  it('taps a key.', () => {
    expect(() => robot.keyTap('a')).not.toThrow();
    expect(() => robot.keyTap('a', 'control')).not.toThrow();
    expect(() => robot.keyTap()).toThrowError(/Invalid number/);
  });

  it('taps a key with a delay.', () => {
    const delay = 250;
    robot.setKeyboardDelay(delay);

    const startTime = Date.now();
    robot.keyTap('a');
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay);
  });

  it('tap all keys.', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890,./;\'[]\\'.split('');

    for (const char in chars) {
      expect(() => robot.keyTap(char)).not.toThrow();
    }
  });

  it('taps all numpad keys.', () => {
    const numpadKeys = '0123456789+-*/.'.split('');
    numpadKeys.push('lock');

    for (const numpadKey in numpadKeys) {
      if (os.platform() === 'linux') {
        expect(() => robot.keyTap('numpad_' + numpadKey)).toThrowError(/Invalid key code/);
      } else {
        expect(() => robot.keyTap('numpad_' + numpadKey)).not.toThrow();
      }
    }
  });

  it('taps a Unicode character.', () => {
    expect(() => robot.unicodeTap("r".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ά".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ö".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ち".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("嗨".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap("ఝ".charCodeAt(0))).not.toThrow();
    expect(() => robot.unicodeTap(0)).toThrowError(/Invalid character/);
    expect(() => robot.unicodeTap()).toThrowError(/Invalid number/);
  });

  it('toggles a key.', () => {
    expect(() => robot.keyToggle("a", "down")).not.toThrow();
    expect(() => robot.keyToggle("a", "up")).not.toThrow();

    expect(() => robot.keyToggle("ά", "down")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("ά", "up")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("嗨", "down")).toThrowError(/Invalid key code specified./);
    expect(() => robot.keyToggle("嗨", "up")).toThrowError(/Invalid key code specified./);
  });

  it('toggles a key with a delay.', () => {
    const delay = 250;
    robot.setKeyboardDelay(delay);
    const startTime = Date.now();
    robot.keyToggle("a", "down");
    robot.keyToggle("a", "up");
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay * 2); // Multiplied as we called it twice
  });

  it('types Ctrl+Shift+RightArrow.', () => {
    const modifiers = ['shift', 'control'];

    expect(() => robot.keyToggle("right", "down", modifiers)).not.toThrow();
    expect(() => robot.keyToggle("right", "up", modifiers)).not.toThrow();
  });

  it('types a string.', () => {
    expect(() => robot.typeString("Typed rάöち嗨ఝ 1")).not.toThrow();
    expect(() => robot.typeString()).toThrowError(/Invalid number of arguments./);
  });

  it('types a string with a delay.', () => {
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with delay 600 cpm", 600)).not.toThrow();
    expect(() => robot.typeStringDelayed()).toThrowError(/Invalid number of arguments./);
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with missing delay")).toThrowError(/Invalid number of arguments./);
  });
});
