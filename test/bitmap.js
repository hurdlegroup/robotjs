const robot = require('..');

describe('Bitmap', () => {
  const paramTypeMap = {
		'width': 'number',
		'height': 'number',
		'byteWidth': 'number',
		'bitsPerPixel': 'number',
		'bytesPerPixel': 'number',
		'image': 'object'
	};

	it('gets a bitmap and checks the parameters.', function() {
		const img = robot.screen.capture();

		for (const param in paramTypeMap)
		{
			expect(typeof img[param]).toEqual(paramTypeMap[param]);
		}
	});

	it('gets a bitmap of a specific size.', function()
	{
		const captureSize = 10;
		const img = robot.screen.capture(0, 0, captureSize, captureSize);

		const captureRatio = img.width / captureSize;
		const actualSize = captureSize * captureRatio;

		expect(img.height).toEqual(actualSize);
		expect(img.width).toEqual(actualSize);
	});

	it('gets a bitmap and make sure the colorAt works as expected.', function()
	{
		const img = robot.screen.capture();
		const hex = img.colorAt(0, 0);

		expect(hex).toMatch(/^[0-9A-F]{6}$/i);

		const screenSize = robot.getScreenSize();
		const captureRatio = img.width / screenSize.width;
		const width = screenSize.width * captureRatio;
		const height = screenSize.height * captureRatio;

		expect(() => img.colorAt(0, height)).toThrowError(/are outside the bitmap/);
		expect(() => img.colorAt(0, height-1)).not.toThrow();
		expect(() => img.colorAt(width, 0)).toThrowError(/are outside the bitmap/);
		expect(() => img.colorAt(9999999999999, 0)).toThrowError(/are outside the bitmap/);
		expect(() => img.colorAt(0, 9999999999999)).toThrowError(/are outside the bitmap/);
	});
});
