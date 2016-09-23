import Transform = drawchat.Transform;
export class TransformContainer{

	private static ROUND_DIGITS = 5;
	private static ROUND_NUMBER = Math.pow(10,TransformContainer.ROUND_DIGITS);

	static TRANSFORM_DEFAULT:Transform = {
		a:1,
		b:0,
		c:0,
		d:1,
		x:0,
		y:0
	};

	private base:Transform = TransformContainer.TRANSFORM_DEFAULT;

	private now:Transform = TransformContainer.TRANSFORM_DEFAULT;

	setBaseTransform(
		transform?:Transform
	):void{
		this.base = (transform == null ) ? TransformContainer.TRANSFORM_DEFAULT : transform;
		// this.now = this.base;
	}
	resetNow(){
		this.now = TransformContainer.TRANSFORM_DEFAULT;
	}

	setTransform(
		context:CanvasRenderingContext2D,
		transform?:Transform
	){
		let transform1 = transform;
		if(!transform1){
			transform1 = TransformContainer.TRANSFORM_DEFAULT;
		}
		transform1 =  TransformContainer.concat(this.base,transform1);
		if(!TransformContainer.isChange(this.now,transform1)){
			// console.log(`transform noChange:${JSON.stringify(transform1)}`);
			return;
		}

		this.now = transform1;
		// console.log(`transform:${JSON.stringify(transform1)}`);
		context.setTransform(
			transform1.a,
			transform1.b,
			transform1.c,
			transform1.d,
			transform1.x,
			transform1.y
		);
	}

	static concat(
		transform1:Transform,
		transform2:Transform
	):Transform{

		// transform1 が初期値
		if(!TransformContainer.isChange(TransformContainer.TRANSFORM_DEFAULT,transform1)){
			return transform2;
		}
		// transform2 が初期値
		if(!TransformContainer.isChange(TransformContainer.TRANSFORM_DEFAULT,transform2)){
			return transform1;
		}
		let a1 = transform1.a;
		let b1 = transform1.b;
		let c1 = transform1.c;
		let d1 = transform1.d;
		let tx1 = transform1.x;
		let ty1 = transform1.y;

		//行列の積を求める
		// | a c tx |
		// | b d ty |
		// | 0 0 1  |
		return {
			a : TransformContainer.round(a1 * transform2.a + c1 * transform2.b),// + tx1 * 0;
			b : TransformContainer.round(b1 * transform2.a + d1 * transform2.b),// + ty1 * 0;
			c : TransformContainer.round(a1 * transform2.c + c1 * transform2.d),// + tx1 * 0;
			d : TransformContainer.round(b1 * transform2.c + d1 * transform2.d),// + ty1 * 0;
//			this.tx = round(a1 * transform2.tx + c1 * transform2.ty + tx1);// * 1;
//			this.ty = round(b1 * transform2.tx + d1 * transform2.ty + ty1);// * 1;
			x : TransformContainer.round(transform2.x + tx1),
			y : TransformContainer.round(transform2.y + ty1)
		}
	}

	private static round(number:number){
		var number1 = number * TransformContainer.ROUND_NUMBER;
		number1 = Math.round(number1);
		return number1/TransformContainer.ROUND_NUMBER;
	}

	private static isChange(t1:Transform,t2:Transform):boolean{
		return 	t1.a !== t2.a
			||	t1.b !== t2.b
			||	t1.c !== t2.c
			||	t1.d !== t2.d
			||	t1.x !== t2.x
			||	t1.y !== t2.y;
	}
}