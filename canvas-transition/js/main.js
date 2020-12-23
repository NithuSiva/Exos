window.addEventListener("load", () => new Main());

class Main {

	/**
	 * quand on clique sur canvas
	 * récupérer les coordonnées du clic
	 * démarrer la boucle de frame
	 * lancer l'animation avec pour origine les coordonnées du clic
	 * calculer la distance de chaque carré par rapport aux coordonnées du clic
	 * appliquer un retard sur l'animation en fonction de la distance
	 * lorsque l'animation est terminée, stopper la boucle de frame
	 */

	constructor() {

		console.log("main");

		this._width = 1280;
		this._height = 720;

		this._picWidth = 3840;
		this._picHeight = 2160;

		this._ratio = this._picWidth / this._width;

		console.log(this._ratio);

		this._size = 100;
		this._tileX = this._width / this._size;
		this._tileY = this._height / this._size;

		console.log("size", this._size, "tileX", this._tileX, "tileY", this._tileY)

		this._canvas = document.createElement("canvas");
		this._canvas.width = this._width;
		this._canvas.height = this._height;

		this._ctx = this._canvas.getContext("2d");

		this._ctx.filter = "grayscale(10%)";

		document.body.appendChild(this._canvas);

		this._loop = null;

		this._pics = [];

		this._delays = [];

		this._frame = 0;

		this.mouseX = null;

		this.mouseY = null;

		this.img = 0;

		this.frequency = .4;

		this.delay = 0;

		this.lastTile = [0,0];

		this.lastedCenter = [false,false];

		this.cSizeData;

		this.finish = 0;

		this.running = 0;

		this.load();

		this._canvas.addEventListener("click", event => this.onClick(event));

	}

	onClick(event) {

		if(!this.running){

		this.finish = 0;

		this.cSizeData = Array.from(Array(Math.round(this._tileX)), () => new Array(Math.round(this._tileY)+1).fill(1));

		this.mouseX = event.clientX;

		this.mouseY = event.clientY;

		this.start();
		
		} else {

			console.log("En cours !");

		}

	}

	async load() {

		let urls = ["assets/3.jpg", "assets/4.jpg", ];
		for(let src of urls) this._pics.push(await this.pic(src));

		console.log("loaded");

		this.draw();

	}

	pic(url) {

		return new Promise(resolve => {

			let img = document.createElement("img");
			img.setAttribute("src", url);
			img.onload = () => resolve(img);

		});

	}

	start() {

		this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));

	}

	stop() {

		window.cancelAnimationFrame(this._loop);

	}

	loop(stamp) {

		this._loop = window.requestAnimationFrame(stamp => this.loop(stamp));

		this._frame++;

		this._ctx.clearRect(0, 0, this._width, this._height); // no memory leak

		this.draw();

	}

	draw() {

		this._ctx.drawImage(
			this._pics[!this.img ? 1:0], 
			0, 0,
			this._picWidth, this._picHeight,
			0, 0,
			this._width, this._height
		);

		if(this.mouseX && this.mouseY){
			
			this.running = 1

			let shift = 0;	

			for(let i = 0, j = 0; i < this._tileX; i++) {

				for(j = 0; j < this._tileY; j++) {

					let centerX = i * this._size + this._size / 2,
						centerY = j * this._size + this._size / 2;

					//Calcule la distance entre le carre ou se trouve la souris et le carre actuel

					let temp1 = Math.abs(this.mouseX - centerX),
						temp2 = Math.abs(this.mouseY - centerY);

					let t = Math.round(temp1/100),
						t2 = Math.round(temp2/100),
						t3 = (t + t2);


					let cSize;

					//On agrandit le carre actuel que lorsque le carre precedent est a 100%

					if((t3 - this.delay) == 0){

						if((this.cSizeData[i][j] <= 99.9) && (this.cSizeData[i][j] >= 0.0)){

							cSize = this._size * Math.sin(this.frequency * this._frame - shift);
							
						} else if(this.cSizeData[i][j] < 100){

							cSize = 100;
							this.delay++;
							this._frame = 1;

						}
						
					} else if((t3 - this.delay) <= 0){

						cSize = 100;

					} else {

						cSize = 0.1;
					}

					this.cSizeData[i][j] = cSize;

					let	tileX = centerX - cSize / 2, 
						tileY = centerY - cSize / 2,
						x = tileX * this._ratio,
						y = tileY * this._ratio;
					
					
 					//Si le carre le plus eloigner est a 100% alors on arrete la double boucle for

					if(((this.lastedCenter[0] == centerX) && (this.lastedCenter[1] == centerY)) && (this.cSizeData[i][j] == 100)){
							
							this.finish = 1;

							break;

					} else {

						let temp1 = Math.abs(this.mouseX - centerX),
							temp2 = Math.abs(this.mouseY - centerY);

						if((temp1 > this.lastTile[0]) || (temp2 > this.lastTile[1])){
							
							this.lastTile[0] = temp1;
							this.lastTile[1] = temp2;
							this.lastedCenter[0] = centerX;
							this.lastedCenter[1] = centerY;
						}
					
						this._ctx.drawImage(

							this._pics[this.img ? 1:0], 

							x, y,
							cSize * this._ratio, cSize * this._ratio,

							tileX, tileY,
							cSize, cSize

						);
					}

					if(this.finish)
						break;

				}

				if(this.finish)
					break;

			}

			if(this.finish) {  

				this._ctx.drawImage(
					this._pics[this.img ? 1:0], 
					0, 0,
					this._picWidth, this._picHeight,
					0, 0,
					this._width, this._height
				);

				this._frame = 0;

				this.finish = 0;

				this.delay = 0;

				this.running = 0;

				if(this.img){

					this.img = 0;

				} else {

					this.img = 1;

				}

				this.stop();

			}
		}
	}
}