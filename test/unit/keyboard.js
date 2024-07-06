const robot = require('../..');
const os = require('os');
const jasmine = require('jasmine');

// TODO: To test F1-24 keys, audio keys, keyboard light keys, referenced in keycode.h

describe('Keyboard', () => {
  afterEach(() => {
    robot.setKeyboardDelay(10); // Reset the delay
  });

  it('taps a key.', () => {
    expect(() => robot.keyTap('a')).not.toThrow();
    expect(() => robot.keyTap('a', 'control')).not.toThrow();
    expect(() => robot.keyTap()).toThrowError(/Invalid number of arguments/);
  });

  it('taps a key with a delay.', () => {
    const delay = 250;
    robot.setKeyboardDelay(delay);

    const startTime = Date.now();
    robot.keyTap('a');
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay);
  });

  it('taps all keys.', () => {
    // Creates an array of all visible characters, excluding first (SP/32) and last (DEL/127), 93 characters
    const standardKeys = [...Array(93).keys()].map(i => String.fromCharCode(i + 33));

    for (const key of standardKeys) {
      expect(() => robot.keyTap(key)).withContext(`key ${key}`).not.toThrow();
    }
  });

  it('taps all numpad keys.', () => {
    const numpadKeys = Array.from('0123456789+-*/.');

    if (os.platform() !== 'darwin') {
      numpadKeys.push('lock');
    }

    for (const key of numpadKeys) {
      if (os.platform() === 'linux') {
        expect(() => robot.keyTap('numpad_' + key)).withContext(`key ${key}`).toThrowError(/Invalid key code specified/);
      } else {
        expect(() => robot.keyTap('numpad_' + key)).withContext(`key ${key}`).not.toThrow();
      }
    }
  });

  it('taps a Unicode character.', () => {
    const unicodeChars = ["r", "ά", "ö", "ち", "嗨", "ఝ"];

    for (const char of unicodeChars) {
      expect(() => robot.unicodeTap(char.charCodeAt(0))).withContext(`unicode ${char}`).not.toThrow();
    }

    expect(() => robot.unicodeTap(0)).toThrowError(/Invalid character typed/);
    expect(() => robot.unicodeTap()).toThrowError(/Invalid number of arguments/);
  });

  it('toggles a key.', () => {
    expect(() => robot.keyToggle("a", "down")).not.toThrow();
    expect(() => robot.keyToggle("a", "up")).not.toThrow();

    expect(() => robot.keyToggle("ά", "down")).toThrowError(/Invalid key code specified/);
    expect(() => robot.keyToggle("ά", "up")).toThrowError(/Invalid key code specified/);
    expect(() => robot.keyToggle("嗨", "down")).toThrowError(/Invalid key code specified/);
    expect(() => robot.keyToggle("嗨", "up")).toThrowError(/Invalid key code specified/);
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

  it('toggles all keys.', () => {
    // Creates an array of all visible characters, excluding first (SP/32) and last (DEL/127), 93 characters
    const standardKeys = [...Array(93).keys()].map(i => String.fromCharCode(i + 33));

    for (const key of standardKeys) {
      expect(() => robot.keyToggle(key, 'down')).withContext(`key ${key}`).not.toThrow();
      expect(() => robot.keyToggle(key, 'up')).withContext(`key ${key}`).not.toThrow();
    }
  });

  it('toggles all numpad keys.', () => {
    const numpadKeys = Array.from('0123456789+-*/.');

    if (os.platform() !== 'darwin') {
      numpadKeys.push('lock');
    }

    for (const key of numpadKeys) {
      if (os.platform() === 'linux') {
        expect(() => robot.keyToggle('numpad_' + key, 'down')).withContext(`key ${key}`).toThrowError(/Invalid key code specified/);
        expect(() => robot.keyToggle('numpad_' + key, 'up')).withContext(`key ${key}`).toThrowError(/Invalid key code specified/);
      } else {
        expect(() => robot.keyToggle('numpad_' + key, 'down')).withContext(`key ${key}`).not.toThrow();
        expect(() => robot.keyToggle('numpad_' + key, 'up')).withContext(`key ${key}`).not.toThrow();
      }
    }
  });

  it('types Ctrl+Shift+RightArrow.', () => {
    const modifiers = ['shift', 'control'];

    expect(() => robot.keyToggle("right", "down", modifiers)).not.toThrow();
    expect(() => robot.keyToggle("right", "up", modifiers)).not.toThrow();
  });

  it('types a string.', () => {
    expect(() => robot.typeString("Typed rάöち嗨ఝ 1")).not.toThrow();
    expect(() => robot.typeString()).toThrowError(/Invalid number of arguments/);
  });

  it('types a string with a delay.', () => {
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with delay 600 cpm", 600)).not.toThrow();
    expect(() => robot.typeStringDelayed()).toThrowError(/Invalid number of arguments/);
    expect(() => robot.typeStringDelayed("Typed rάöち嗨ఝ with missing delay")).toThrowError(/Invalid number of arguments/);
  });
});
