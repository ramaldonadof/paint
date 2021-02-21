export class Ellipse
{
    private _a_X: number;
    private _a_Y: number;
    private _b_X: number;
    private _b_Y: number;
    private _c_X: number;
    private _c_Y: number;

    constructor(a_X: number, a_Y: number, b_X: number, b_Y: number, c_X: number, c_Y: number)
    {
        this._a_X = a_X;
        this._a_Y = a_Y;

        this._b_X = b_X;
        this._b_Y = b_Y;

        this._c_X = c_X;
        this._c_Y = c_Y;
    }

    
    public get a_X() : number {
        return this._a_X;
    }

    public get a_Y() : number {
        return this._a_Y;
    }

    public get b_X() : number {
        return this._b_X;
    }

    public get b_Y() : number {
        return this._b_Y;
    }

    public get c_X() : number {
        return this._c_X;
    }

    public get c_Y() : number {
        return this._c_Y;
    }
    
    
    public set a_X(v : number) {
        this._a_X = v;
    }

    public set a_Y(v : number) {
        this._a_Y = v;
    }

    public set b_X(v : number) {
        this._b_X = v;
    }
    
    public set b_Y(v : number) {
        this._b_Y = v;
    }

    public set c_X(v : number) {
        this._c_X = v;
    }
    
    public set c_Y(v : number) {
        this._c_Y = v;
    }
}
