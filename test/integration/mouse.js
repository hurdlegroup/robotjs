/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('@ingstory/targetpractice/index.js');
const os = require('os');

describe('Integration/Mouse', () => {
  const targetPracticeDelay = 3000;
  let target, elements = undefined;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL += targetPracticeDelay;
    robot.setMouseDelay(100); //Increase delay to help it reliability.
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

	it('clicks an element', (done) => {
		target.once('click', (e) => {
			expect(e.id).toEqual('button_1');
			expect(e.type).toEqual('click');
			done();
		});

		const buttonTarget = elements.button_1;
		robot.moveMouse(buttonTarget.x, buttonTarget.y);
		robot.mouseClick();
	});

	it('scrolls vertically in an element', (done) => {
		target.once('scroll', element => {
			/**
			 *  TODO: This is gross! The scroll distance is different for each OS. I want
			 *  to look into this further, but at least these numbers are consistent.
			 */
			let expectedScroll = 10;
			switch(os.platform()) {
				case 'linux':
					expectedScroll = 180;
					break;
				case 'win32':
					expectedScroll = 8;
					break;
			}

			expect(element.id).toEqual('textarea_1');
			expect(element.scroll_y).toEqual(expectedScroll);
			done();
		});

		const textAreaTarget = elements.textarea_1;
		robot.moveMouse(textAreaTarget.x, textAreaTarget.y);
		robot.mouseClick();
		robot.scrollMouse(0, -10);
	});

	it('scrolls horizontally in an element', (done) => {
		target.once('scroll', element => {
			/**
			 *  TODO: This is gross! The scroll distance is different for each OS. I want
			 *  to look into this further, but at least these numbers are consistent.
			 */
			let expectedScroll = 10;
			switch(os.platform()) {
				case 'linux':
					expectedScroll = 530;
					break;
				case 'win32':
					expectedScroll = 8;
					break;
			}

			expect(element.id).toEqual('textarea_1');
			expect(element.scroll_x).toEqual(expectedScroll);
			done();
		});

    const textAreaTarget = elements.textarea_1;
		robot.moveMouse(textAreaTarget.x, textAreaTarget.y);
		robot.mouseClick();
		robot.scrollMouse(-10, 0);
	});
});
