const width = 800;
const height = 500;

let legos;

function loadImage(ctx) {
	legos = new Image();
	//legos.crossOrigin = 'anonymous'
	legos.src = './lego.png';
	legos.onload = () => {
		ctx.drawImage(legos, 0, 0, width, height)
	}
}

function setup() {
	const ctx = document.getElementById('canvas').getContext('2d');
	size(width, height, 'black');
	loadImage(ctx)
}

function draw() {
	const ctx = document.getElementById('canvas').getContext('2d');
	const imageData = ctx.getImageData(0, 0, width, height)
	const data = imageData.data

	for (let i = 0 ; i < data.length; i += 4) {
		const red = data[i]
		const green = data[i + 1] 
		const blue = data[i + 2]
		// MARK: -- Quantizing
		const factor = 1

		const newRed = Math.round(factor * red / 255) * (255/factor);
		const newGreen = Math.round(factor * green / 255) * (255/factor);
		const newBlue = Math.round(factor * blue / 255) * (255/factor);

		data[i] = newRed
		data[i + 1] = newGreen
		data[i + 2] = newRed

		const errorR = red - newRed
		const errorG = green - newGreen
		const errorB = blue - newBlue

		// MARK: -- Error Diffusion
		data[i    ] = red + errorR * 3/16
		// data[i + 1] = errorG + errorG * 3/16
		data[i + 2] = blue + errorB * 3/16
	}
	ctx.putImageData(imageData, 0, 0);
}

function main() {
	setup()
	setTimeout(() => {
		draw()
	}, 3000)
}


main();