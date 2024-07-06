/* jshint esversion: 6 */
const robot = require('../..');
const targetPractice = require('../../tools/targetPractice');
const os = require('os');

describe('Integration/Mouse', () => {
  beforeAll(() => {
    robot.setMouseDelay(100); //Increase delay to help it reliability.
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

	it('clicks an element', (done) => {
    targetPractice.once('click', (e) => {
			expect(e.id).toEqual('button_1');
			expect(e.type).toEqual('click');
			done();
		});

		const buttonTarget = targetPractice.elements.button_1;
		robot.moveMouse(buttonTarget.x, buttonTarget.y);
		robot.mouseClick();
	});

	it('scrolls vertically in an element', (done) => {
    targetPractice.once('scroll', (element) => {
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
			expect(element.scroll_y).toBeGreaterThanOrEqual(expectedScroll);
			done();
		});

		const textAreaTarget = targetPractice.elements.textarea_1;
		robot.moveMouse(textAreaTarget.x, textAreaTarget.y);
		robot.mouseClick();
		robot.scrollMouse(0, -10);
	});

	it('scrolls horizontally in an element', (done) => {
    targetPractice.once('scroll', (element) => {
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
			expect(element.scroll_x).toBeGreaterThanOrEqual(expectedScroll);
			done();
		});

    const textAreaTarget = targetPractice.elements.textarea_1;
		robot.moveMouse(textAreaTarget.x, textAreaTarget.y);
		robot.mouseClick();
		robot.scrollMouse(-10, 0);
	});
});
