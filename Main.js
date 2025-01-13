
// Vector Math
//
class V2
{
	constructor (x = 0, y = 0)
	{
		this.x = x;
		this.y = y;
	}
}

class V3
{
	constructor (x = 0, y = 0, z = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class V4
{
	constructor (x = 0, y = 0, z = 0, w = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
}

class M3
{
	// Row x Column
	constructor (_00 = 1, _01 = 0, _02 = 0,
				 _10 = 0, _11 = 1, _12 = 0,
				 _20 = 0, _21 = 0, _22 = 1)
	{
		this._00 = 1; this._01 = 0; this._02 = 0;
		this._10 = 0; this._11 = 1; this._12 = 0;
		this._20 = 0; this._21 = 0; this._22 = 1;
	}
	
	XCol(){return new V3(this._00, this._10, this._20);}
	YCol(){return new V3(this._01, this._11, this._21);}
	ZCol(){return new V3(this._02, this._12, this._22);}
	
	static FromRows(X, Y, Z)
	{
		const out = new M3();
		out._00 = X.x;
		out._01 = X.y;
		out._02 = X.z;
		out._10 = Y.x;
		out._11 = Y.y;
		out._12 = Y.z;
		out._20 = Z.x;
		out._21 = Z.y;
		out._22 = Z.z;
		return out;
	}
	
	static FromCols(X, Y, Z)
	{
		const out = new M3();
		out._00 = X.x;
		out._01 = Y.x;
		out._02 = Z.x;
		out._10 = X.y;
		out._11 = Y.y;
		out._12 = Z.y;
		out._20 = X.z;
		out._21 = Y.z;
		out._22 = Z.z;
		return out;
	}
}

class M4
{
	// Row x Column
	constructor(_00 = 1, _01 = 0, _02 = 0, _03 = 0,
				_10 = 0, _11 = 1, _12 = 0, _13 = 0,
				_20 = 0, _21 = 0, _22 = 1, _23 = 0,
				_30 = 0, _31 = 0, _32 = 0, _33 = 1)
	{
		this._00 = _00; this._01 = _01; this._02 = _02; this._03 = _03;
		this._10 = _10; this._11 = _11; this._12 = _12; this._13 = _13;
		this._20 = _20; this._21 = _21; this._22 = _22; this._23 = _23;
		this._30 = _30; this._31 = _31; this._32 = _32; this._33 = _33;
	}
	
	PackTransposed(dest)
	{
		dest[ 0] = this._00;
		dest[ 1] = this._10;
		dest[ 2] = this._20;
		dest[ 3] = this._30;
		dest[ 4] = this._01;
		dest[ 5] = this._11;
		dest[ 6] = this._21;
		dest[ 7] = this._31;
		dest[ 8] = this._02;
		dest[ 9] = this._12;
		dest[10] = this._22;
		dest[11] = this._32;
		dest[12] = this._03;
		dest[13] = this._13;
		dest[14] = this._23;
		dest[15] = this._33;
	}
}

function Add21(A, b)
{
	return new V2(A.x + b, A.y + b);
}

function Add22(A, B)
{
	return new V2(A.x + B.x, A.y + B.y);
}

function Add31(A, b)
{
	return new V3(A.x + b, A.y + b, A.z + b);
}

function Add33(A, B)
{
	return new V3(A.x + B.x, A.y + B.y, A.z + B.z);
}

function Sub22(A, B)
{
	return new V2(A.x - B.x, A.y - B.y);
}

function Sub31(A, b)
{
	return new V3(A.x - b, A.y - b, A.z - b);
}

function Sub33(A, B)
{
	return new V3(A.x - B.x, A.y - B.y, A.z - B.z);
}

function Mul21(A, b)
{
	return new V2(A.x * b, A.y * b);
}

function Mul22(A, B)
{
	return new V2(A.x * B.x, A.y * B.y);
}

function Mul31(A, b)
{
	return new V3(A.x * b, A.y * b, A.z * b);
}

function Mul33(A, B)
{
	return new V3(A.x * B.x, A.y * B.y, A.z * B.z);
}

function Mul41(A, b)
{
	return new V4(A.x * b, A.y * b, A.z * b, A.w * b);
}

function Div21(A, b)
{
	return new V2(A.x / b, A.y / b);
}

function Div31(A, b)
{
	return new V3(A.x / b, A.y / b, A.z / b);
}

function Div33(A, B)
{
	return new V3(A.x / B.x, A.y / B.y, A.z / B.z);
}

function Lerp311(A, b, t)
{
	return Add33(A, Mul31(Sub31(A, b), t))
}

function Lerp333(A, B, T)
{
	return Add33(A, Mul33(Sub33(B, A), T));
}

function Clamp(a, min, max)
{
	return Math.min(Math.max(a, min), max);
}

function Min2(A)
{
	return Math.min(A.x, A.y);
}

function Min3(A)
{
	return Math.min(A.x, Math.min(A.y, A.z));
}

function Min31(A, b)
{
	return new V3(Math.min(A.x, b), Math.min(A.y, b), Math.min(A.z, b));
}

function Max2(A)
{
	return Math.max(A.x, A.y);
}

function Max3(A)
{
	return Math.max(A.x, Math.max(A.y, A.z));
}

function Min22(A, B)
{
	return new V2(Math.min(A.x, B.x), Math.min(A.y, B.y));
}

function Max22(A, B)
{
	return new V2(Math.max(A.x, B.x), Math.max(A.y, B.y));
}

function Min33(A, B)
{
	return new V3(Math.min(A.x, B.x), Math.min(A.y, B.y), Math.min(A.z, B.z));
}

function Max33(A, B)
{
	return new V3(Math.max(A.x, B.x), Math.max(A.y, B.y), Math.max(A.z, B.z));
}

function Abs2(A)
{
	return new V2(Math.abs(A.x), Math.abs(A.y));
}

function Flip3(A)
{
	return new V3(-A.x, -A.y, -A.z);
}

function Sign3(A)
{
	return new V3(Math.sign(A.x), Math.sign(A.y), Math.sign(A.z));
}

function Dot2(A, B)
{
	return (A.x * B.x) + (A.y * B.y);
}

function Dot3(A, B)
{
	return (A.x * B.x) + (A.y * B.y) + (A.z * B.z);
}

function MulAdd21(A, b, c)
{
	return Add21(Mul21(A, b), c);
}

function MulAdd22(A, B, C)
{
	return Add22(Mul22(A, B), C);
}

function MulAdd31(A, b, c)
{
	return Add31(Mul31(A, b), c);
}

function Length2(A)
{
	let l2 = Dot2(A, A);
	return Math.sqrt(l2);
}

function Length3(A)
{
	let l2 = Dot3(A, A);
	return Math.sqrt(l2);
}

function Distance2(A, B)
{
	return Length2(Sub22(A, B));
}

function Distance3(A, B)
{
	return Length3(Sub33(A, B));
}

function Normalize3(A)
{
	let l2 = Dot3(A, A);
	return Div31(A, Math.sqrt(l2));
}

function Cross3(A, B)
{
	return new V3((A.y * B.z) - (A.z * B.y),
				  (A.z * B.x) - (A.x * B.z),
				  (A.x * B.y) - (A.y * B.x));
}

function Mul3_33(A, B)
{
	return new V3((A.x * B._00) + (A.y * B._10) + (A.z * B._20),
				  (A.x * B._01) + (A.y * B._11) + (A.z * B._21),
				  (A.x * B._02) + (A.y * B._12) + (A.z * B._22));
}

function Mul33_3(A, B)
{
	return new V3((A._00 * B.x) + (A._01 * B.y) + (A._02 * B.z),
				  (A._10 * B.x) + (A._11 * B.y) + (A._12 * B.z),
				  (A._20 * B.x) + (A._21 * B.y) + (A._22 * B.z));
}

function Mul33_33(A, B)
{
	const out = new M3();
	
	out._00 = (A._00 * B._00) + (A._01 * B._10) + (A._02 * B._20);
	out._01 = (A._00 * B._01) + (A._01 * B._11) + (A._02 * B._21);
	out._02 = (A._00 * B._02) + (A._01 * B._12) + (A._02 * B._22);
	
	out._10 = (A._10 * B._00) + (A._11 * B._10) + (A._12 * B._20);
	out._11 = (A._10 * B._01) + (A._11 * B._11) + (A._12 * B._21);
	out._12 = (A._10 * B._02) + (A._11 * B._12) + (A._12 * B._22);
	
	out._20 = (A._20 * B._00) + (A._21 * B._10) + (A._22 * B._20);
	out._21 = (A._20 * B._01) + (A._21 * B._11) + (A._22 * B._21);
	out._22 = (A._20 * B._02) + (A._21 * B._12) + (A._22 * B._22);
	
	return out;
}

function Mul44_4(A, B)
{
	return new V4((A._00 * B.x) + (A._01 * B.y) + (A._02 * B.z) + (A._03 * B.w),
				  (A._10 * B.x) + (A._11 * B.y) + (A._12 * B.z) + (A._13 * B.w),
				  (A._20 * B.x) + (A._21 * B.y) + (A._22 * B.z) + (A._23 * B.w),
				  (A._30 * B.x) + (A._31 * B.y) + (A._32 * B.z) + (A._33 * B.w));
}

function Mul_44_44(A, B)
{
	const out = new M4();
	
	out._00 = (A._00 * B._00) + (A._01 * B._10) + (A._02 * B._20) + (A._03 * B._30);
	out._01 = (A._00 * B._01) + (A._01 * B._11) + (A._02 * B._21) + (A._03 * B._31);
	out._02 = (A._00 * B._02) + (A._01 * B._12) + (A._02 * B._22) + (A._03 * B._32);
	out._03 = (A._00 * B._03) + (A._01 * B._13) + (A._02 * B._23) + (A._03 * B._33);
	
	out._10 = (A._10 * B._00) + (A._11 * B._10) + (A._12 * B._20) + (A._13 * B._30);
	out._11 = (A._10 * B._01) + (A._11 * B._11) + (A._12 * B._21) + (A._13 * B._31);
	out._12 = (A._10 * B._02) + (A._11 * B._12) + (A._12 * B._22) + (A._13 * B._32);
	out._13 = (A._10 * B._03) + (A._11 * B._13) + (A._12 * B._23) + (A._13 * B._33);
	
	out._20 = (A._20 * B._00) + (A._21 * B._10) + (A._22 * B._20) + (A._23 * B._30);
	out._21 = (A._20 * B._01) + (A._21 * B._11) + (A._22 * B._21) + (A._23 * B._31);
	out._22 = (A._20 * B._02) + (A._21 * B._12) + (A._22 * B._22) + (A._23 * B._32);
	out._23 = (A._20 * B._03) + (A._21 * B._13) + (A._22 * B._23) + (A._23 * B._33);
	
	out._30 = (A._30 * B._00) + (A._31 * B._10) + (A._32 * B._20) + (A._33 * B._30);
	out._31 = (A._30 * B._01) + (A._31 * B._11) + (A._32 * B._21) + (A._33 * B._31);
	out._32 = (A._30 * B._02) + (A._31 * B._12) + (A._32 * B._22) + (A._33 * B._32);
	out._33 = (A._30 * B._03) + (A._31 * B._13) + (A._32 * B._23) + (A._33 * B._33);
	
	return out;
}

// Primitive Ray Tracing
//
function TracePlane(P, ray, planeP, N)
{
	const D  = Sub33(planeP, P);
	const d  = Dot3 (D, N);
	const t  = d / Dot3(ray, N);
	const Pp = Add33(P, Mul31(ray, t));
	
	return Pp;
}

function TraceAABB(P, ray, E)
{
	const ref1 = Mul33(E, Sign3(ray));
	const ref0 = Flip3(ref1);
	const T0   = Div33(Sub33(ref0, P), ray);
	const T1   = Div33(Sub33(ref1, P), ray);
	const t0   = Max3(T0);
	const t1   = Min3(T1);
	
	const out =
	{
		hit: t1 > t0,
		t0:  t0,
		t1:  t1,
	}
	
	return out;
}

// GLB Model Loading
//
// glTF constants
// 0x46546C67 = "glTF"
// 0x4E4F534A = "JSON"
// 0x004E4942 =  "BIN"

async function LoadGLB(uri)
{
	console.log("Attempt to read glb: " + uri);
	
	const resp = await fetch(uri);
	
	if (!resp.ok)
	{
		console.error("Failed to load: " + uri);
		return;
	}
	
	const fileData = await resp.arrayBuffer();
	const fileView = new DataView(fileData);
	
	// Evaluate header
	const magic = fileView.getUint32(0, true);
	
	if (magic !== 0x46546C67)
	{
		console.error("Invalid glb header.");
		return;
	}
	
	const version    = fileView.getUint32(4, true);
	const fileLength = fileView.getUint32(8, true);
	
	console.log("version: " + version + " size: " + fileLength + " bytes.");
	
	// Evaluate json
	const jsonLength = fileView.getUint32(12, true);
	const jsonType   = fileView.getUint32(16, true);
	
	if (jsonType !== 0x4E4F534A)
	{
		console.error("First chunk not json.");
		return;
	}
	
	// Evaluate binary
	const binHead   = 20 + jsonLength;
	const binLength = fileView.getUint32(binHead,     true);
	const binType   = fileView.getUint32(binHead + 4, true);
	
	if (binType !== 0x004E4942)
	{
		console.error("Second chunk not binary.");
		return;
	}
	
	// Parse json
	const jsonData = new Uint8Array (fileData, 20, jsonLength);
	const decoder  = new TextDecoder();
	const jsonSrc  = decoder.decode(jsonData);
	const json     = JSON.   parse (jsonSrc);
	
	if (!json)
	{
		console.error("Failed to parse json.");
		return;
	}
	
	// Evaluate mesh buffers
	let posLength   = 0;
	let normLength  = 0;
	let indexLength = 0;
	let posCount    = 0;
	let normCount   = 0;
	let indexCount  = 0;
	
	for (const node of json.nodes)
	{
		if (node.mesh != undefined)
		{
			const mesh = json.meshes[node.mesh];
			
			for (prim of mesh.primitives)
			{
				const posAcc   = json.accessors[prim.attributes.POSITION];
				const normAcc  = json.accessors[prim.attributes.NORMAL];
				const indexAcc = json.accessors[prim.indices];
				
				const posView   = json.bufferViews[posAcc.  bufferView];
				const normView  = json.bufferViews[normAcc. bufferView];
				const indexView = json.bufferViews[indexAcc.bufferView];
				
				posLength   += posView.  byteLength;
				normLength  += normView. byteLength;
				indexLength += indexView.byteLength;
				
				posCount   += posAcc.  count;
				normCount  += normAcc. count;
				indexCount += indexAcc.count;
			}
		}
	}
	
	console.log("Position count: " + posCount);
	console.log("Normal count:   " + normCount);
	console.log("Index count:    " + indexCount);
	
	console.log("Position bytes: " + posLength);
	console.log("Normal bytes:   " + normLength);
	console.log("Index bytes:    " + indexLength);
	
	if (posLength !== normLength)
	{
		console.error("Position and normal attribute buffers not the same size.");
		return;
	}
	
	// Read mesh data
	const binOffset  = binHead + 8;
	const posDest    = new ArrayBuffer(posLength);
	const normDest   = new ArrayBuffer(normLength);
	const indexDest  = new ArrayBuffer(indexLength);
	const posWrite   = new Float32Array(posDest);
	const normWrite  = new Float32Array(normDest);
	const indexWrite = new Uint16Array (indexDest);
	
	posCount     = 0;
	indexCount   = 0;
	let indexAdj = 0;
	
	let destMin = new V3( 1000,  1000,  1000);
	let destMax = new V3(-1000, -1000, -1000);
	
	for (const node of json.nodes)
	{
		if (node.mesh != undefined)
		{
			const mesh = json.meshes[node.mesh];
			
			for (prim of mesh.primitives)
			{
				const posAcc   = json.accessors[prim.attributes.POSITION];
				const normAcc  = json.accessors[prim.attributes.NORMAL];
				const indexAcc = json.accessors[prim.indices];
				
				const posView   = json.bufferViews[posAcc.  bufferView];
				const normView  = json.bufferViews[normAcc. bufferView];
				const indexView = json.bufferViews[indexAcc.bufferView];
				
				const numElems    = posAcc.count * 3;
				const posOffset   = binOffset + posView.  byteOffset;
				const normOffset  = binOffset + normView. byteOffset;
				const indexOffset = binOffset + indexView.byteOffset;
				
				const posRead   = new Float32Array(fileData, posOffset,   numElems);
				const normRead  = new Float32Array(fileData, normOffset,  numElems);
				const indexRead = new Uint16Array (fileData, indexOffset, indexAcc.count);
				
				posWrite.  set(posRead,   posCount);
				normWrite. set(normRead,  posCount);
				indexWrite.set(indexRead, indexCount);
				
				// Transform vertices
				readMin = new V3(posAcc.min[0], posAcc.min[1], posAcc.min[2]);
				readMax = new V3(posAcc.max[0], posAcc.max[1], posAcc.max[2]);
				
				if (node.translation != undefined)
				{
					const T = node.translation;
					
					for (let i = posCount; i < posCount + numElems; i += 3)
					{
						posWrite[i]   += T[0];
						posWrite[i+1] += T[1];
						posWrite[i+2] += T[2];
					}
					
					readMin.x += T[0];
					readMin.y += T[1];
					readMin.z += T[2];
					
					readMax.x += T[0];
					readMax.y += T[1];
					readMax.z += T[2];
				}
				
				// Adjust indices
				if (indexCount > 0)
				{
					for (let i = indexCount; i < indexCount + indexRead.length; i += 1)
					{
						indexWrite[i] += indexAdj;
					}
				}
				
				destMin = Min33(destMin, readMin);
				destMax = Max33(destMax, readMax);
				
				indexAdj   += posAcc.count;
				posCount   += numElems;
				indexCount += indexRead.length;
			}
		}
	}
	
	console.log("Min: " + destMin.x + ", " + destMin.y + ", " + destMin.z);
	console.log("Max: " + destMax.x + ", " + destMax.y + ", " + destMax.z);
	console.log("Glb file read was successful.");
	
	// Make mesh available to the scene.
	const mesh = new SceneMesh(posWrite, normWrite, indexWrite, destMin, destMax);
	State.meshes.push(mesh);
}

// Scene View
//
class View
{
	near    = .1;
	far     = 100;
	fov     = .1667 * Math.PI;
	filmExt = 1;
	yaw     = 0;
	pitch   = 0;
	
	dim     = new V2();
	halfDim = new V2();
	
	P       = new V3(-2, 0, 0);
	orbitP  = new V3();
	orbit   = 2;
	
	// World space orientation
	X = new V3(1, 0, 0);
	Y = new V3(0, 1, 0);
	Z = new V3(0, 0, 1);
	
	// Transform matrices
	worldToView = new M4();
	viewToClip  = new M4();
	worldToClip = new M4();
	
	UpdateViewPosition()
	{
		this.P = Sub33(this.orbitP, Mul31(this.X, this.orbit));
	}
	
	SetOrbit(d)
	{
		this.orbit = d;
		this.UpdateViewPosition();
	}
	
	SetOrbitPosition(P)
	{
		this.orbitP = P;
		this.UpdateViewPosition();
	}
	
	CalcOrientation()
	{
		const cy = Math.cos(this.yaw);
		const sy = Math.sin(this.yaw);
		const cp = Math.cos(this.pitch);
		const sp = Math.sin(this.pitch);
		
		this.X = new V3(cy * cp, sy * cp, sp);
		this.Y = new V3(-sy, cy, 0);
		this.Z = Cross3(this.X, this.Y);
		
		this.UpdateViewPosition();
	}
	
	CalcViewToClip(dim)
	{
		this.dim     = dim;
		this.halfDim = Mul21(this.dim, 0.5);
		
		const n      = this.near;
		const f      = this.far;
		const s      = Math.tan(this.fov);
		this.filmExt = n * s;
		
		const sy  = 1 / s;
		const r   = this.dim.y / this.dim.x;
		const rng = n - f;
		const fn  = n + f;
		const sz  = fn / rng;
		const oz  = ((n * fn) / rng) - n;
		const sx  = r * sy;
		
		this.viewToClip = new M4
		(sx,  0,  0, 0,
		 0,  sy,  0, 0,
		 0,   0, sz, oz,
		 0,   0, -1, 0);
	}
	
	CalcWorldToView()
	{
		// world    view
		//    z  x   y
		//    | /    |
		// y--+      +--x
		//          /
		//         z
		
		const X = this.X;
		const Y = this.Y;
		const Z = this.Z;
		const P = this.P;
		
		this.worldToView = new M4
		(-Y.x, -Y.y, -Y.z,  Dot3(P, Y),
		 Z.x,   Z.y,  Z.z, -Dot3(P, Z),
		 -X.x, -X.y, -X.z,  Dot3(P, X),
		 0,       0,    0,          1);
	}
	
	PixelToRay_View(Px)
	{
		// Normalized coordinates -1 to 1.
		let Pn = Div21(Sub22(Px, this.halfDim), this.halfDim.y);
		Pn.y   = -Pn.y;
		// Film coordinates.
		const Pf = Mul21(Pn, this.filmExt);
		// Ray in view space.
		const Rv = Normalize3(new V3(Pf.x, Pf.y, this.near));
		return Rv;
	}
	
	ViewRayToWorld(Rv)
	{
		// Ray in world space.
		const Xr = Mul31(this.X,  Rv.z);
		const Yr = Mul31(this.Y, -Rv.x);
		const Zr = Mul31(this.Z,  Rv.y);
		const R  = Add33(Xr, Add33(Yr, Zr));
		return R;
	}
	
	PixelToRay_World(Px)
	{
		const Rv = this.PixelToRay_View(Px);
		const Rw = this.ViewRayToWorld (Rv);
		return Rw;
	}
	
	WorldPositionToPixel(Pw)
	{
		const Pc = Mul44_4(this.worldToClip, new V4(Pw.x, Pw.y, Pw.z, 1));
		const Pn = Div21   (new V2(Pc.x, -Pc.y), Pc.w);
		const Px = MulAdd22(Pn, this.halfDim, this.halfDim);
		return Px;
	}
	
	PixelToWorldViewPlane(Px, refP)
	{
		const Rv = this.PixelToRay_View(Px);
		const d  = Dot3(Sub33(refP, this.P), this.X);
		const t  = d / Rv.z;
		const Rw = this.ViewRayToWorld(Rv);
		const Pw = Add33(this.P, Mul31(Rw, t));
		return Pw;
	}
	
	PixelDeltaToWorldOffset(dPx, refP)
	{
		dPx.x       = -dPx.x;
		dPx.y       = -dPx.y;
		const d     = Dot3 (this.X, Sub33(refP, this.P));
		const dPv   = Mul21(dPx, this.filmExt / this.halfDim.y);
		const dPw   = Mul21(Div21(dPv, this.near), d);
		const out   = Add33(Mul31(this.Y, dPw.x), Mul31(this.Z, dPw.y));
		
		return out;
	}
	
	PixelLengthToWorld(radius, refP)
	{
		const d     = Dot3(this.X, Sub33(refP, this.P));
		const rv    = (radius / this.halfDim.y) * this.filmExt;
		const rw    = d * (rv / this.near);
		return rw;
	}
}

// WebGL Wrapper
//
let canvas = null;
let gl     = null;

class GLAttrib
{
	constructor (type, numComp, numBytes)
	{
		this.type     = type;
		this.numComp  = numComp;
		this.numBytes = numBytes;
	}
	
	static V1(){return new GLAttrib(gl.FLOAT, 1,  4);}
	static V2(){return new GLAttrib(gl.FLOAT, 2,  8);}
	static V3(){return new GLAttrib(gl.FLOAT, 3, 12);}
	static V4(){return new GLAttrib(gl.FLOAT, 4, 16);}
}

function BeginShader(type, src)
{
	const shader = gl.createShader(type);
	
	gl.shaderSource (shader, src);
	gl.compileShader(shader);
	
	let status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	
	if (!status)
	{
		const s = gl.getShaderInfoLog(shader);
		console.error("Shader compilation failed.");
		console.log  (s);
		return null;
	}
	
	return shader;
}

function BeginProgram(vs, fs)
{
	const prog = gl.createProgram();
	
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram (prog);
	
	status = gl.getProgramParameter(prog, gl.LINK_STATUS);
	
	if (!status)
	{
		console.error("Program linking failed.");
		console.log(gl.getProgramInfoLog(prog));
		
		return null;
	}
	
	const out =
	{
		obj:  prog,
		bufs: [],
	}
	
	return out;
}

function SetParameterBuffer(prog, name, buf)
{
	let iBlock = gl.getUniformBlockIndex(prog.obj, name);
	
	if (iBlock == gl.INVALID_INDEX)
	{
		console.error("Could not find uniform block index.");
		return;
	}
	
	iBind = prog.bufs.length;
	prog.bufs.push(buf);
	
	gl.uniformBlockBinding(prog.obj, iBlock, iBind);
}

function BeginBuffer(numBytes, type, isIndexBuf)
{
	const buf    = gl.createBuffer();
	const target = isIndexBuf ? gl.ELEMENT_ARRAY_BUFFER : gl.COPY_WRITE_BUFFER;
	
	gl.bindBuffer(target, buf);
	gl.bufferData(target, numBytes, type);
	gl.bindBuffer(target, null);
	
	return buf;
}

function WriteBuffer(dest, src, destFirst, srcFirst, srcNum)
{
	gl.bindBuffer   (gl.COPY_WRITE_BUFFER, dest);
	gl.bufferSubData(gl.COPY_WRITE_BUFFER, destFirst, src, srcFirst, srcNum);
	gl.bindBuffer   (gl.COPY_WRITE_BUFFER, null);
}

function BeginVertexState()
{
	const out =
	{
		obj:        gl.createVertexArray(),
		numAttribs: 0,
	}
	return out;
}

function SetStateBuffer(state, buf, attribs, isInst)
{
	gl.bindVertexArray(state.obj);
	gl.bindBuffer     (gl.ARRAY_BUFFER, buf);
	
	let totBytes = 0;
	
	for (const attrib of attribs)
	{
		totBytes += attrib.numBytes;
	}
	
	let offset = 0;
	let i      = state.numAttribs;
	
	for (const attrib of attribs)
	{
		gl.enableVertexAttribArray(i);
		gl.vertexAttribPointer    (i, attrib.numComp, attrib.type, false, totBytes, offset);
		
		if (isInst)
		{
			gl.vertexAttribDivisor(i, 1);
		}
		
		i      += 1;
		offset += attrib.numBytes;
	}
	
	state.numAttribs = i;
	
	gl.bindVertexArray(null);
}

function SetVertexBuffer(state, buf, attribs)
{
	SetStateBuffer(state, buf, attribs, false);
}

function SetInstanceBuffer(state, buf, attribs)
{
	SetStateBuffer(state, buf, attribs, true);
}

function ClearFrameBufferColor(r, g, b, a)
{
	gl.clearColor(r, g, b, a);
	gl.clear     (gl.COLOR_BUFFER_BIT);
}

function ClearFrameBufferDepth(d = 1)
{
	gl.clearDepth(d);
	gl.clear     (gl.DEPTH_BUFFER_BIT);
}

function BindProgram(prog)
{
	gl.useProgram(prog.obj);
	
	let i = 0;
	for (const buf of prog.bufs)
	{
		gl.bindBufferBase(gl.UNIFORM_BUFFER, i, buf);
		i += 1;
	}
}

function DrawPoints(state, prog, firstVert, numVerts)
{
	BindProgram(prog);
	
	gl.bindVertexArray(state.obj);
	gl.drawArrays     (gl.POINTS, firstVert, numVerts);
}

function DrawTriangleStrip(state, prog, firstVert, numVerts)
{
	BindProgram(prog);
	
	gl.bindVertexArray(state.obj);
	gl.drawArrays     (gl.TRIANGLE_STRIP, firstVert, numVerts);
}

function DrawTriangleStrip_Instanced(state, prog, firstVert, numVerts, numInst)
{
	BindProgram(prog);
	
	gl.bindVertexArray    (state.obj);
	gl.drawArraysInstanced(gl.TRIANGLE_STRIP, firstVert, numVerts, numInst);
}

function DrawIndexTriangles(state, prog, indexBuf, offset, numIndices, type = gl.UNSIGNED_SHORT)
{
	BindProgram(prog);
	
	gl.bindVertexArray(state.obj);
	gl.bindBuffer     (gl.ELEMENT_ARRAY_BUFFER, indexBuf);
	gl.drawElements   (gl.TRIANGLES, numIndices, type, offset);
	gl.bindBuffer     (gl.ELEMENT_ARRAY_BUFFER, null);
}

// Gizmo Element - Free Drag Point
//
class DragPoint
{
	constructor (P = new V3(), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.prevP  = P;
		this.beginP = new V3();
		
		// Attributes
		this.radius    = 16;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Px = view.WorldPositionToPixel(this.P);
		const d  = Distance2(Pm, Px) - this.radius;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm    = new V2(ev.offsetX, ev.offsetY);
		this.prevP  = this.P;
		this.beginP = view.PixelToWorldViewPlane(Pm, this.P);
	}
	
	Update(view, ev)
	{
		const Pm     = new V2(ev.offsetX, ev.offsetY);
		const Pw     = view.PixelToWorldViewPlane(Pm, this.P);
		const offset = Sub33(Pw, this.beginP);
		this.P       = Add33(this.prevP, offset);
	}
	
	PushInstance(color)
	{
		State.pointBuf.PushPoint(this.P, this.radius, color);
	}
}

// Gizmo Element - Pull Point
//
class PullPoint
{
	constructor (P = new V3(), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.beginP = new V3();
		this.X      = new V3(1, 1, 1);
		this.m      = 1;
		
		// Attributes
		this.radius    = 16;
		this.length    = 100;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Px = view.WorldPositionToPixel(this.P);
		const d  = Distance2(Pm, Px) - this.radius;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm    = new V2(ev.offsetX, ev.offsetY);
		this.beginP = view.PixelToWorldViewPlane(Pm, this.P);
	}
	
	Update(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Pw = view.PixelToWorldViewPlane(Pm, this.beginP);
		const l  = view.PixelLengthToWorld(this.length, this.P);
		const D  = Sub33(Pw, this.beginP);
		const d  = Length3(D) / l;
		this.m   = 1 + d;
	}
	
	PushInstance(color)
	{
		State.pointBuf.PushPoint(this.P, this.radius, color);
	}
}

// Gizmo Element - Pull Segment
//
class PullSegment
{
	constructor (P = new V3(), X = new V3(1, 0, 0), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.beginP = new V3();
		this.X      = X;
		this.m      = 1;
		
		// Attributes
		this.radius    = 16;
		this.length    = 100;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		
		// End point
		const l = view.PixelLengthToWorld(this.length, this.P);
		const P = Add33(this.P, Mul31(this.X, l));
		
		// Circle SDF
		const Px = view.WorldPositionToPixel(P);
		const d  = Distance2(Pm, Px) - this.radius;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const T  = this.X;
		const B  = Cross3(T, view.X);
		const N  = Normalize3(Cross3(T, B));
		const Rw = view.PixelToRay_World(Pm);
		const Pw = TracePlane(view.P, Rw, this.P, N);
		this.beginP = Pw;
	}
	
	Update(view, ev)
	{
		// Projection plane basis
		const T = this.X;
		const B = Normalize3(Cross3(T, view.X));
		const N = Cross3(T, B);
		
		// Project pointer onto basis plane.
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Rw = view.PixelToRay_World(Pm);
		const Pw = TracePlane(view.P, Rw, this.P, N);
		
		// Project offset onto axis.
		const offset = Sub33(Pw, this.beginP);
		const l      = view.PixelLengthToWorld(this.length, this.P);
		this.m       = 1 + (Dot3(T, offset) / l);
	}
	
	PushInstance(color)
	{
		const view = State.view;
		const l    = view.PixelLengthToWorld(this.length, this.P);
		const P0   = this.P;
		const P1   = Add33(P0, Mul31(this.X, l * this.m));
		
		State.lineBuf. PushLine (P0, P1, 4, color);
		State.pointBuf.PushPoint(P1, this.radius, color);
	}
}

// Gizmo Element - Drag Segment
//
class DragSegment
{
	constructor (P = new V3(), X = new V3(1, 0, 0), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.prevP  = P;
		this.beginP = new V3();
		this.X      = X;
		
		// Attributes
		this.length    = 100;
		this.radius    = 16;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		
		// Project to pixel
		const P0x = view.WorldPositionToPixel(this.P);
		const l   = view.PixelLengthToWorld  (this.length, this.P);
		const P1x = view.WorldPositionToPixel(Add33(this.P, Mul31(this.X, l)));
		
		// Line segment SDF
		const L = Sub22  (P1x, P0x);
		const P = Sub22  (P0x, Pm);
		const t = Clamp  (Dot2(P, L) / Dot2(L, L), -1, 0);
		const D = Sub22  (P, Mul21(L, t));
		const d = Length2(D) - this.radius;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const T  = this.X;
		const B  = Cross3(T, Sub33(this.P, view.P));
		const N  = Normalize3(Cross3(T, B));
		const Rw = view.PixelToRay_World(Pm);
		const Pw = TracePlane(view.P, Rw, this.P, N);
		
		this.prevP  = this.P;
		this.beginP = Pw;
	}
	
	Update(view, ev)
	{
		// Projection plane basis
		const T = this.X;
		const B = Cross3(T, Sub33(this.prevP, view.P));
		const N = Normalize3(Cross3(T, B));
		
		// Project pointer onto basis plane.
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Rw = view.PixelToRay_World(Pm);
		const Pw = TracePlane(view.P, Rw, this.prevP, N);
		
		// Project offset onto axis.
		const offset = Mul31(T, Dot3(T, Sub33(Pw, this.beginP)));
		
		this.P = Add33(this.prevP, offset);
	}
	
	PushInstance(color)
	{
		const view = State.view;
		const l    = view.PixelLengthToWorld(this.length, this.P);
		const P0   = this.P;
		const P1   = Add33(P0, Mul31(this.X, l));
		
		State.lineBuf.PushLine(P0, P1, 4, color);
	}
}

// Gizmo Element - Turn Circle
//
class TurnCircle
{
	constructor (P = v3(), N = new V3(0, 0, 1), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.N      = N;
		this.beginX = new V3();
		this.curX   = new V3();
		
		// Attributes
		this.radius    = 100;
		this.thickness = 16;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		
		// Project pointer onto circle plane.
		const Rw = view.PixelToRay_World(Pm);
		const Pw = TracePlane(view.P, Rw, this.P, this.N);
		
		// Closest point on circle
		const r  = view.PixelLengthToWorld(this.radius, this.P);
		const D  = Mul31(Normalize3(Sub33(Pw, this.P)), r);
		const cP = Add33(this.P, D);
		
		// Project closest back to pixel.
		const Px = view.WorldPositionToPixel(cP);
		
		// Overlap test
		const d  = Distance2(Px, Pm) - this.thickness;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm    = new V2(ev.offsetX, ev.offsetY);
		const Rw    = view.PixelToRay_World(Pm);
		const Pw    = TracePlane(view.P, Rw, this.P, this.N);
		this.beginX = Normalize3(Sub33(Pw, this.P));
		this.curX   = this.beginX;
	}
	
	Update(view, ev)
	{
		const Pm  = new V2(ev.offsetX, ev.offsetY);
		// Project pointer onto circle plane.
		const Rw  = view.PixelToRay_World(Pm);
		const Pw  = TracePlane(view.P, Rw, this.P, this.N);
		this.curX = Normalize3(Sub33(Pw, this.P));
	}
	
	PushInstance(color)
	{
		const view = State.view;
		const r    = view.PixelLengthToWorld(this.radius, this.P);
		const N    = this.N;
		const ref  = new V3(this.N.y, this.N.z, this.N.x);
		const X    = Normalize3(Sub33(ref, Mul31(N, Dot3(N, ref))));
		const Y    = Cross3(X, N);
		
		const firstP = Add33(this.P, Mul31(X, r));
		let   prevP  = firstP;
		
		for (const P of State.circlePoints)
		{
			const curP = Add33(this.P, Add33(Mul31(X, P.x * r), Mul31(Y, P.y * r)));
			
			State.lineBuf.PushLine(prevP, curP, 4, color);
			
			prevP = curP;
		}
		
		if (State.active === this)
		{
			State.lineBuf.PushLine(this.P, Add33(this.P, Mul31(this.beginX, r)), 2, color);
			State.lineBuf.PushLine(this.P, Add33(this.P, Mul31(this.curX,   r)), 2, color);
		}
	}
}

// Gizmo Element - Turn Point
//
class TurnPoint
{
	constructor (P = new V3(), upColor, hovColor, downColor)
	{
		// State
		this.P      = P;
		this.beginX = new V3();
		this.curX   = new V3();
		
		// Attributes
		this.radius    = 16;
		this.length    = 100;
		this.upColor   = upColor;
		this.hovColor  = hovColor;
		this.downColor = downColor;
	}
	
	Hover(view, ev)
	{
		const Pm = new V2(ev.offsetX, ev.offsetY);
		const Px = view.WorldPositionToPixel(this.P);
		const d  = Distance2(Pm, Px) - this.radius;
		
		return d < 0;
	}
	
	Begin(view, ev)
	{
		const Pm    = new V2(ev.offsetX, ev.offsetY);
		const l     = view.PixelLengthToWorld(this.length, this.P);
		const Pw    = view.PixelToWorldViewPlane(Pm, Sub33(this.P, Mul31(view.X, l)));
		this.beginX = Normalize3(Sub33(Pw, this.P));
		this.curX   = this.beginX;
	}
	
	Update(view, ev)
	{
		const Pm  = new V2(ev.offsetX, ev.offsetY);
		const l   = view.PixelLengthToWorld(this.length, this.P);
		const Pw  = view.PixelToWorldViewPlane(Pm, Sub33(this.P, Mul31(view.X, l)));
		this.curX = Normalize3(Sub33(Pw, this.P));
	}
	
	PushInstance(color)
	{
		const view = State.view;
		const P0   = this.P;
		
		State.pointBuf.PushPoint(P0, this.radius, color);
		
		if (State.active === this)
		{
			const l    = view.PixelLengthToWorld(this.length, this.P);
			const P1   = Add33(P0, Mul31(this.curX, l));
			
			State.pointBuf.PushPoint(P1, this.radius * .5, color);
			State.lineBuf. PushLine (P0, P1, 4, color);
		}
	}
}

// Gizmos
//
class TranslationGizmo
{
	constructor (P, R)
	{
		this.freeXYZ = new DragPoint  (P,           Color.upC, Color.hovC, Color.downC);
		this.dragX   = new DragSegment(P, R.XCol(), Color.upX, Color.hovX, Color.downX);
		this.dragY   = new DragSegment(P, R.YCol(), Color.upY, Color.hovY, Color.downY);
		this.dragZ   = new DragSegment(P, R.ZCol(), Color.upZ, Color.hovZ, Color.downZ);
		
		State.guiElements = [this.freeXYZ, this.dragX, this.dragY, this.dragZ];
	}
	
	Update()
	{
		// Sync element positions
		const active = State.active;
		
		this.freeXYZ.P = active.P;
		this.dragX.P   = active.P;
		this.dragY.P   = active.P;
		this.dragZ.P   = active.P;
		
		// Apply translation to selection.
		State.selected.P = State.active.P;
	}
	
	Sync()
	{
		const obj = State.selected;
		
		this.dragX.X = obj.R.XCol();
		this.dragY.X = obj.R.YCol();
		this.dragZ.X = obj.R.ZCol();
		
		this.freeXYZ.P = obj.P;
		this.dragX.P   = obj.P;
		this.dragY.P   = obj.P;
		this.dragZ.P   = obj.P;
	}
	
	End()
	{
		this.Sync();
	}
}

class ScaleGizmo
{
	constructor (P, R)
	{
		this.freeXYZ = new PullPoint  (P,           Color.upC, Color.hovC, Color.downC);
		this.pullX   = new PullSegment(P, R.XCol(), Color.upX, Color.hovX, Color.downX);
		this.pullY   = new PullSegment(P, R.YCol(), Color.upY, Color.hovY, Color.downY);
		this.pullZ   = new PullSegment(P, R.ZCol(), Color.upZ, Color.hovZ, Color.downZ);
		
		State.guiElements = [this.freeXYZ, this.pullX, this.pullY, this.pullZ];
	}
	
	Update()
	{
		const active = State.active;
		const obj    = State.selected;
		
		// Apply scale to selection.
		switch (State.guiElements.indexOf(active))
		{
			case 0:
			obj.scale   = Mul31(State.beginScale, this.freeXYZ.m);
			break;
			
			case 1:
			obj.scale.x = State.beginScale.x * this.pullX.m;
			break;
			
			case 2:
			obj.scale.y = State.beginScale.y * this.pullY.m;
			break;
			
			case 3:
			obj.scale.z = State.beginScale.z * this.pullZ.m;
			break;
		}
	}
	
	Sync()
	{
		const obj = State.selected;
		
		this.pullX.X = obj.R.XCol();
		this.pullY.X = obj.R.YCol();
		this.pullZ.X = obj.R.ZCol();
		
		this.freeXYZ.P = obj.P;
		this.pullX.P   = obj.P;
		this.pullY.P   = obj.P;
		this.pullZ.P   = obj.P;
	}
	
	End()
	{
		this.Sync();
		
		State.active.m = 1;
	}
}

class RotationGizmo
{
	constructor (P, R)
	{
		this.freeXYZ = new TurnPoint (P,           Color.upC, Color.hovC, Color.downC);
		this.turnX   = new TurnCircle(P, R.XCol(), Color.upX, Color.hovX, Color.downX);
		this.turnY   = new TurnCircle(P, R.YCol(), Color.upY, Color.hovY, Color.downY);
		this.turnZ   = new TurnCircle(P, R.ZCol(), Color.upZ, Color.hovZ, Color.downZ);
		
		State.guiElements = [this.freeXYZ, this.turnX, this.turnY, this.turnZ];
	}
	
	Update()
	{
		// Calculate rotation matrix
		const active = State.active;
		const Z      =
			active == this.freeXYZ ? Normalize3(Cross3(active.curX, active.beginX)) : active.N;
		
		if (Dot3(Z, Z) <= .001)
		{
			return;
		}
		
		const X    = active.beginX;
		const Y    = Cross3(Z, X);
		const cosa = Dot3(X, active.curX);
		const sina = Dot3(Y, active.curX);
		const Xa   = Add33(Mul31(X,  cosa), Mul31(Y, sina));
		const Ya   = Add33(Mul31(X, -sina), Mul31(Y, cosa));
		const R0   = M3.FromRows(X,   Y, Z);
		const R1   = M3.FromCols(Xa, Ya, Z);
		const R    = Mul33_33(R1, R0);
		
		// Apply rotation to selection.
		State.selected.R = Mul33_33(R, State.beginRot);
	}
	
	Sync()
	{
		const obj = State.selected;
		
		this.turnX.N = obj.R.XCol();
		this.turnY.N = obj.R.YCol();
		this.turnZ.N = obj.R.ZCol();
		
		this.freeXYZ.P = obj.P;
		this.turnX.P   = obj.P;
		this.turnY.P   = obj.P;
		this.turnZ.P   = obj.P;
	}
	
	End()
	{
		this.Sync();
	}
}

// Local Rendering Resources
//
class VertexBuffer
{
	constructor (sizeInFloats)
	{
		this.num      = 0;
		this.numVerts = 0;
		this.data     = new Float32Array(sizeInFloats);
	}
	
	Reset()
	{
		this.num      = 0;
		this.numVerts = 0;
	}
	
	PushPoint(P, width, color)
	{
		// Point vertex layout
		// 0,1,2, position
		// 3,     width
		// 4,5,6, color
		
		const i       = this.num;
		this.numVerts += 1;
		this.num      += 7;
		
		this.data[i]   = P.x;
		this.data[i+1] = P.y;
		this.data[i+2] = P.z;
		this.data[i+3] = width;
		this.data[i+4] = color.x;
		this.data[i+5] = color.y;
		this.data[i+6] = color.z;
	}
	
	PushLine(P0, P1, width, color)
	{
		// Line insance layout
		// 0,1,2, P0
		// 3,4,5, P1
		// 6,7,8, color
		// 9      extent
		
		const i        = this.num;
		this.numVerts += 1;
		this.num      += 10;
		
		this.data[i]    = P0.x;
		this.data[i+ 1] = P0.y;
		this.data[i+ 2] = P0.z;
		this.data[i+ 3] = P1.x;
		this.data[i+ 4] = P1.y;
		this.data[i+ 5] = P1.z;
		this.data[i+ 6] = color.x;
		this.data[i+ 7] = color.y;
		this.data[i+ 8] = color.z;
		this.data[i+ 9] = width;
	}
	
	PushLineBox(points, width, color)
	{
		this.PushLine(points[0], points[1], width, color);
		this.PushLine(points[1], points[2], width, color);
		this.PushLine(points[2], points[3], width, color);
		this.PushLine(points[3], points[0], width, color);
		this.PushLine(points[4], points[5], width, color);
		this.PushLine(points[5], points[6], width, color);
		this.PushLine(points[6], points[7], width, color);
		this.PushLine(points[7], points[4], width, color);
		this.PushLine(points[0], points[4], width, color);
		this.PushLine(points[1], points[5], width, color);
		this.PushLine(points[2], points[6], width, color);
		this.PushLine(points[3], points[7], width, color);
	}
	
	PushGrid(cellDim, cellWidth, width, color)
	{
		const ext = cellWidth * cellDim * .5;
		let   P0  = new V3(-ext, -ext, 0);
		let   P1  = new V3( ext, -ext, 0);
		
		for (let y = 0; y <= cellDim; y += 1)
		{
			this.PushLine(P0, P1, width, color);
			
			P0.y += cellWidth;
			P1.y += cellWidth;
		}
		
		P0.x = -ext;
		P1.x = -ext;
		P0.y = -ext;
		P1.y =  ext;
		
		for (let x = 0; x <= cellDim; x += 1)
		{
			this.PushLine(P0, P1, width, color);
			
			P0.x += cellWidth;
			P1.x += cellWidth;
		}
	}
}

class SceneMesh
{
	constructor (posData, normData, indexData, min, max)
	{
		const glBuf_Pos   = BeginBuffer(posData.  byteLength, gl.STATIC_DRAW);
		const glBuf_Norm  = BeginBuffer(normData. byteLength, gl.STATIC_DRAW);
		const glBuf_Index = BeginBuffer(indexData.byteLength, gl.STATIC_DRAW, true);
		const glState     = BeginVertexState();
		
		SetVertexBuffer(glState, glBuf_Pos,  [GLAttrib.V3()]);
		SetVertexBuffer(glState, glBuf_Norm, [GLAttrib.V3()]);
		
		WriteBuffer(glBuf_Pos,   posData,   0, 0, posData.  length);
		WriteBuffer(glBuf_Norm,  normData,  0, 0, normData. length);
		WriteBuffer(glBuf_Index, indexData, 0, 0, indexData.length);
		
		this.min    = min;
		this.max    = max;
		this.ext    = Mul31(Sub33(max, min), .5);
		this.center = Mul31(Add33(max, min), .5);
		
		this.glState     = glState;
		this.glBuf_Pos   = glBuf_Pos;
		this.glBuf_Norm  = glBuf_Norm;
		this.glBuf_Index = glBuf_Index;
		
		this.posData   = posData;
		this.normData  = normData;
		this.indexData = indexData;
	}
}

// Scene
//
class SceneObject
{
	constructor (mesh, P = new V3(), color = new V3(1, 1, 1))
	{
		this.mesh  = mesh;
		this.P     = P;
		this.scale = new V3(1, 1, 1);
		this.R     = new M3();
		this.color = color;
		this.roughness = .5;
		this.metallic  = 0;
		this.random    = Math.random();
	}
	
	WorldPositionToLocal(Pw)
	{
		let Pl = Sub33(Pw, this.P);
		Pl     = Mul3_33(Pl, this.R);
		Pl     = Div33(Pl, this.scale);
		return Pl;
	}
	
	WorldDirectionToLocal(Dw)
	{
		let Dl = Mul3_33(Dw, this.R);
		Dl     = Div33(Dl, this.scale);
		Dl     = Normalize3(Dl);
		return Dl;
	}
	
	WorldBox()
	{
		const minl = Mul33(this.mesh.min, this.scale);
		const maxl = Mul33(this.mesh.max, this.scale);
		const out  = [minl,
					  new V3(maxl.x, minl.y, minl.z),
					  new V3(maxl.x, maxl.y, minl.z),
					  new V3(minl.x, maxl.y, minl.z),
					  new V3(minl.x, minl.y, maxl.z),
					  new V3(maxl.x, minl.y, maxl.z),
					  maxl,
					  new V3(minl.x, maxl.y, maxl.z)];
		
		for (let i = 0; i < out.length; i += 1)
		{
			out[i] = Mul33_3(this.R, out[i]);
			out[i] = Add33(out[i], this.P);
		}
		
		return out;
	}
}

// Application State
//
class Color
{
	static upX    = new V3( 1,  0,  0);
	static hovX   = new V3( 1, .2, .2);
	static downX  = new V3(.5,  0,  0);
	
	static upY    = new V3( 0,  1,  0);
	static hovY   = new V3(.4,  1, .4);
	static downY  = new V3( 0, .5,  0);
	
	static upZ    = new V3( 0,  0,  1);
	static hovZ   = new V3(.2, .2,  1);
	static downZ  = new V3( 0,  0, .5);
	
	static upC    = new V3( 1,  1,  0);
	static hovC   = new V3( 1,  1, .5);
	static downC  = new V3(.5, .5,  0);
	
	static select = new V3(1,  .5,  0);
	static grid   = new V3(.5, .5, .5);
	
	static HSVToRGB(h, s, v)
	{
		let out  = new V3();
		h       *= 6;
		out.x    = Math.max(2 - h, h - 4);
		out.y    = Math.min(h,     4 - h);
		out.z    = Math.min(h - 2, 6 - h);
		out      = Min31(out, 1);
		out      = Lerp311(out, 1, s);
		out      = Mul31(out, v);
		return out;
	}
}

class State
{
	static pointSt = null;
	static lineSt  = null;
	static gridSt  = null;
	static quadSt  = null;
	
	static quadVB  = null;
	static pointVB = null;
	static lineVB  = null;
	static lineIB  = null;
	static gridIB  = null;
	
	static viewPB  = null;
	static objPB   = null;
	
	static backProg  = null;
	static pointProg = null;
	static lineProg  = null;
	static objProg   = null;
	
	static view = new View();
	
	static shaders      = [];
	static objects      = [];
	static meshes       = [];
	static guiElements  = [];
	static circlePoints = [];
	
	static pointBuf = new VertexBuffer(1024);
	static lineBuf  = new VertexBuffer(2048);
	static gridBuf  = new VertexBuffer(1024);
	
	static updateView   = false;
	static updateScene  = false;
	static updateGui    = false;
	static frameRequest = false;
	static grid         = true;
	
	static beginScale = new V3();
	static beginRot   = new M3();
	
	static gizmo    = null;
	static selected = null;
	static active   = null;
	static hover    = null;
	
	static objSetting = null;
	static inColor    = null;
	static inRough    = null;
	static inMetal    = null;
	
	static RequestFrame()
	{
		if (State.frameRequest === false)
		{
			requestAnimationFrame(UpdateAndRender);
			State.frameRequest = true;
		}
	}
}

// Application Runtime
//
function Main_OnKeyDown(ev)
{
	if (ev.repeat)
	{
		return;
	}
	
	// Focus view on selection
	if (ev.key == "f" && State.selected)
	{
		State.view.SetOrbitPosition(State.selected.P);
		
		State.updateView  = true;
	}
	
	else if (State.selected)
	{
		// Translation Gizmo
		if (ev.key == "w")
		{
			const P = State.selected.P;
			const R = State.selected.R;
			
			State.gizmo     = new TranslationGizmo(P, R);
			State.updateGui = true;
		}
		
		// Scale gizmo
		else if (ev.key == "e")
		{
			const P = State.selected.P;
			const R = State.selected.R;
			
			State.gizmo     = new ScaleGizmo(P, R);
			State.updateGui = true;
		}
		
		// Rotation gizmo
		else if (ev.key == "r")
		{
			const P = State.selected.P;
			const R = State.selected.R;
			
			State.gizmo     = new RotationGizmo(P, R);
			State.updateGui = true;
		}
		
		// Delete scene object
		else if (ev.key == "Backspace")
		{
			const i = State.objects.indexOf(State.selected);
			State.objects.splice(i, 1);
			State.selected       = null;
			State.updateScene    = true;
			State.updateGui      = true;
			canvas.onpointermove = null;
			State.hover          = null;
			State.active         = null;
			State.objSettings.style.display = "none";
		}
	}
	
	if (State.updateView || State.updateGui || State.updateScene)
	{
		State.RequestFrame();
	}
}

function Main_OnWheel(ev)
{
	// Zoom
	State.view.SetOrbit(Math.max(State.view.orbit + (ev.deltaY * 0.01), 0));
	
	State.updateView = true;
	
	State.RequestFrame();
}

function OnInput_Color()
{
	if (State.selected)
	{
		State.selected.color = Color.HSVToRGB(State.inColor.valueAsNumber, .3, .6);
		State.updateScene    = true;
		
		State.RequestFrame();
	}
}

function OnInput_Roughness()
{
	if (State.selected)
	{
		State.selected.roughness = State.inRoughness.valueAsNumber;
		State.updateScene        = true;
		
		State.RequestFrame();
	}
}

function OnInput_Metallic()
{
	if (State.selected)
	{
		State.selected.metallic = State.inMetallic.valueAsNumber;
		State.updateScene       = true;
		
		State.RequestFrame();
	}
}

function Main_OnPointerDown(ev)
{
	const view = State.view;
	
	canvas.onpointerup     = Main_OnPointerUp;
	canvas.onpointercancel = Main_OnPointerUp;
	
	// View control mode.
	if (ev.altKey)
	{
		canvas.onpointermove = View_OnPointerMove_Down;
	}
	
	// Active ui element mode.
	else if (State.hover && ev.buttons == 1)
	{
		canvas.onpointermove = Gui_OnPointerMove_Down;
		const obj = State.selected;
		
		State.beginScale = new V3(obj.scale.x, obj.scale.y, obj.scale.z);
		State.beginRot   = State.selected.R;
		State.active     = State.hover;
		State.hover      = null;
		State.updateGui  = true;
		
		State.active.Begin(view, ev);
		
		State.RequestFrame();
	}
	
	// Update selection.
	else if (ev.buttons == 1)
	{
		const Pm   = new V2(ev.offsetX, ev.offsetY);
		let   sel  = null;
		let   tCur = view.far;
		
		for (const obj of State.objects)
		{
			// Trace world space oriented bounding box.
			const Rw     = view.PixelToRay_World(Pm);
			const Pl     = Sub33(obj.WorldPositionToLocal(view.P), obj.mesh.center);
			const Rl     = obj.WorldDirectionToLocal(Rw);
			const trace  = TraceAABB(Pl, Rl, obj.mesh.ext);
			
			// Pick closest hit.
			if (trace.hit && trace.t0 < tCur)
			{
				sel  = obj;
				tCur = trace.t0;
			}
		}
		
		State.selected    = sel;
		State.updateScene = true;
		State.updateGui   = true;
		
		if (State.selected)
		{
			if (State.gizmo)
			{
				State.gizmo.Sync();
			}
			
			canvas.onpointermove            = Gui_OnPointerMove_Up;
			State.objSettings.style.display = "flex";
			State.inColor.    value         = .5;
			State.inRoughness.value         = State.selected.roughness;
			State.inMetallic. value         = State.selected.metallic;
		}
		
		else
		{
			canvas.onpointermove = null;
			State.objSettings.style.display = "none";
		}
		
		State.RequestFrame();
	}
}

function AddSceneObject()
{
	if (State.meshes[0])
	{
		const color = Color.HSVToRGB(Math.random(), .3, .6);
		const obj = new SceneObject(State.meshes[0], new V3(), color);
		
		State.objects.push(obj);
		State.updateScene = true;
		
		State.RequestFrame();
	}
}

function ToggleGrid()
{
	State.grid      = State.grid ? false : true;
	State.updateGui = true;
	
	State.RequestFrame();
}

function ResetView()
{
	State.view = new View();
	
	State.view.CalcViewToClip(new V2(canvas.width, canvas.height));
	
	State.view.yaw   = -.25 * Math.PI;
	State.view.pitch = -.16 * Math.PI;
	
	State.view.CalcOrientation();
	State.view.SetOrbitPosition(new V3(0, 0, .75));
	
	State.updateView = true;
	
	State.RequestFrame();
}

function ResetPosition()
{
	if (State.selected)
	{
		State.selected.P  = new V3();
		State.updateScene = true;
		State.updateGui   = true;
		
		if (State.gizmo)
		{
			State.gizmo.Sync();
		}
		
		State.RequestFrame();
	}
}

function ResetScale()
{
	if (State.selected)
	{
		State.selected.scale = new V3(1, 1, 1);
		State.updateScene    = true;
		State.updateGui      = true;
		
		if (State.gizmo)
		{
			State.gizmo.Sync();
		}
		
		State.RequestFrame();
	}
}

function ResetRotation()
{
	if (State.selected)
	{
		State.selected.R  = new M3();
		State.updateScene = true;
		State.updateGui   = true;
		
		if (State.gizmo)
		{
			State.gizmo.Sync();
		}
		
		State.RequestFrame();
	}
}

// Event Callbacks
//
function Main_OnPointerUp()
{
	canvas.onpointermove   = State.selected ? Gui_OnPointerMove_Up : null;
	canvas.onpointerup     = null;
	canvas.onpointercancel = null;
	
	if (State.active)
	{
		State.gizmo.End();
		
		State.active    = null;
		State.updateGui = true;
		
		State.RequestFrame();
	}
}

function Gui_OnPointerMove_Up(ev)
{
	const view = State.view;
	
	// Hover test all elements
	for (const elem of State.guiElements)
	{
		if (elem.Hover(view, ev))
		{
			// Element was not previously hovered
			if (State.hover != elem)
			{
				State.hover     = elem;
				State.updateGui = true;
				
				State.RequestFrame();
			}
			
			return;
		}
	}
	
	// Clear previously hovered.
	if (State.hover)
	{
		State.hover     = null;
		State.updateGui = true;
		
		State.RequestFrame();
	}
}

function Gui_OnPointerMove_Down(ev)
{
	const active = State.active;
	
	active.Update(State.view, ev);
	
	State.gizmo.Update();
	
	State.updateGui   = true;
	State.updateScene = true;
	
	State.RequestFrame();
}

function View_OnPointerMove_Down(ev)
{
	const view = State.view;
	
	// Pan
	if (ev.buttons == 4)
	{
		const offset = view.PixelDeltaToWorldOffset(new V2(ev.movementX, ev.movementY), view.orbitP);
		
		view.SetOrbitPosition(Sub33(view.orbitP, offset));
		
		State.updateView = true;
	}
	
	// Rotate
	else if (ev.buttons == 1)
	{
		view.yaw   -= ev.movementX * 0.01;
		view.pitch -= ev.movementY * 0.01;
		
		view.CalcOrientation();
		
		State.updateView = true;
	}
	
	// Zoom
	else if (ev.buttons == 2)
	{
		const d = Math.max(view.orbit - (ev.movementX * 0.01), 0);
		draw    = true;
		
		view.SetOrbit(d);
		
		State.updateView = true;
	}
	
	State.RequestFrame();
}

function Main_OnResize(ev)
{
	const w = canvas.clientWidth;
	const h = canvas.clientHeight;
	
	canvas.width  = w;
	canvas.height = h;
	
	gl.   viewport(0, 0, w, h);
	State.view.CalcViewToClip(new V2(w, h));
	
	State.updateView = true;
	
	State.RequestFrame();
}

// Rendering
//
function UpdateAndRender(time)
{
	let draw = State.updateScene;
	
	// View
	if (State.updateView)
	{
		const view = State.view;
		
		view.CalcWorldToView();
		
		view.worldToClip = Mul_44_44(view.viewToClip, view.worldToView);
		
		const packed = new Float32Array(26);
		
		view.worldToClip.PackTransposed(packed);
		packed[16] = view.P.x;
		packed[17] = view.P.y;
		packed[18] = view.P.z;
		packed[19] = 0;
		packed[20] = view.X.x;
		packed[21] = view.X.y;
		packed[22] = view.X.z;
		packed[23] = 0;
		packed[24] = view.near;
		packed[25] = view.filmExt / view.halfDim.y;
		
		WriteBuffer(State.viewPB, packed, 0, 0, packed.length);
		
		draw = true;
	}
	
	// Gui render state
	if (State.updateGui || State.updateView)
	{
		State.pointBuf.Reset();
		State.lineBuf. Reset();
		
		if (State.selected)
		{
			// Selection box
			const boxPoints = State.selected.WorldBox();
			
			State.lineBuf.PushLineBox(boxPoints, 1, Color.select);
			
			// Gui elements
			for (const elem of State.guiElements)
			{
				let color = State.hover  === elem ? elem.hovColor  : elem.upColor;
				color     = State.active === elem ? elem.downColor : color;
				
				elem.PushInstance(color);
			}
			
		}
		
		WriteBuffer(State.pointVB, State.pointBuf.data, 0, 0, State.pointBuf.num);
		WriteBuffer(State.lineIB,  State.lineBuf.data,  0, 0, State.lineBuf.num);
		
		draw = true;
	}
	
	State.updateScene = false;
	State.updateView  = false;
	State.updateGui   = false;
	
	// Draw
	if (draw)
	{
		gl.disable(gl.DEPTH_TEST);
		
		// Background
		{
			DrawTriangleStrip(State.quadSt, State.backProg, 0, 4);
		}
		
		gl.enable(gl.DEPTH_TEST);
		
		// Scene
		{
			const params = new Float32Array(23);
			
			for (const obj of State.objects)
			{
				params[ 0] = obj.R._00 * obj.scale.x;
				params[ 1] = obj.R._10 * obj.scale.x;
				params[ 2] = obj.R._20 * obj.scale.x;
				params[ 3] = 0;
				
				params[ 4] = obj.R._01 * obj.scale.y;
				params[ 5] = obj.R._11 * obj.scale.y;
				params[ 6] = obj.R._21 * obj.scale.y;
				params[ 7] = 0;
				
				params[ 8] = obj.R._02 * obj.scale.z;
				params[ 9] = obj.R._12 * obj.scale.z;
				params[10] = obj.R._22 * obj.scale.z;
				params[11] = 0;
				
				params[12] = obj.P.x;
				params[13] = obj.P.y;
				params[14] = obj.P.z;
				params[15] = 1;
				
				params[16] = obj.color.x;
				params[17] = obj.color.y;
				params[18] = obj.color.z;
				params[19] = 0;
				
				params[20] = obj.roughness;
				params[21] = obj.metallic;
				params[22] = obj.random;
				
				WriteBuffer(State.objPB, params, 0, 0, params.length);
				
				const mesh = obj.mesh;
				DrawIndexTriangles(mesh.glState, State.objProg, mesh.glBuf_Index, 0, mesh.indexData.length);
			}
		}
		
		// GUI
		{
			if (State.grid)
			{
				DrawTriangleStrip_Instanced(State.gridSt, State.lineProg, 0, 4, State.gridBuf.numVerts);
			}
			
			ClearFrameBufferDepth();
			
			DrawTriangleStrip_Instanced(State.lineSt, State.lineProg, 0, 4, State.lineBuf.numVerts);
			
			DrawPoints(State.pointSt, State.pointProg, 0, State.pointBuf.numVerts);
		}
		
		gl.flush();
	}
	
	State.frameRequest = false;
}

// Mesh Primitives
//
// 3----1
// |    |
// 2----0
const quadVerts = new Float32Array
([1,  -1,
  1,   1,
  -1, -1,
  -1,  1]);

const lineVerts = new Float32Array
([1,   0,
  1,   1,
  -1,  0,
  -1,  1]);

// Application Initialization
//
class ShaderEntry
{
	constructor (id, type)
	{
		this.id   = id;
		this.type = type;
	}
}

class ButtonEntry
{
	constructor (id, callBack)
	{
		this.id       = id;
		this.callBack = callBack;
	}
}

function Init()
{
	canvas = document.getElementById("glCanvas");
	gl     = canvas.getContext("webgl2");
	
	if (!gl)
	{
		console.error("WebGL not available.");
		return;
	}
	
	const ShaderList =
	[new ShaderEntry("VS_Point",      gl.VERTEX_SHADER),
	 new ShaderEntry("VS_Line",       gl.VERTEX_SHADER),
	 new ShaderEntry("FS_Line",       gl.FRAGMENT_SHADER),
	 new ShaderEntry("VS_Object",     gl.VERTEX_SHADER),
	 new ShaderEntry("FS_Object",     gl.FRAGMENT_SHADER),
	 new ShaderEntry("VS_Background", gl.VERTEX_SHADER),
	 new ShaderEntry("FS_Background", gl.FRAGMENT_SHADER)];
	
	// Shaders
	for (const entry of ShaderList)
	{
		const src    = document.getElementById(entry.id).innerHTML;
		const shader = BeginShader(entry.type, src.trimStart());
		
		if (!shader)
		{
			console.error("Failed to compile: " + entry.id);
			return;
		}
		
		State.shaders.push(shader);
	}
	
	// Programs
	State.pointProg = BeginProgram(State.shaders[0], State.shaders[2]);
	State.lineProg  = BeginProgram(State.shaders[1], State.shaders[2]);
	State.objProg   = BeginProgram(State.shaders[3], State.shaders[4]);
	State.backProg  = BeginProgram(State.shaders[5], State.shaders[6]);
	
	// Geometry buffers
	State.lineVB  = BeginBuffer(lineVerts.byteLength,           gl.STATIC_DRAW);
	State.quadVB  = BeginBuffer(quadVerts.byteLength,           gl.STATIC_DRAW);
	State.pointVB = BeginBuffer(State.pointBuf.data.byteLength, gl.DYNAMIC_DRAW);
	State.lineIB  = BeginBuffer(State.lineBuf .data.byteLength, gl.DYNAMIC_DRAW);
	State.gridIB  = BeginBuffer(State.gridBuf .data.byteLength, gl.DYNAMIC_DRAW);
	
	WriteBuffer(State.quadVB, quadVerts, 0, 0, quadVerts.length);
	WriteBuffer(State.lineVB, lineVerts, 0, 0, lineVerts.length);
	
	State.pointSt = BeginVertexState();
	State.lineSt  = BeginVertexState();
	State.gridSt  = BeginVertexState();
	State.quadSt  = BeginVertexState();
	
	SetVertexBuffer  (State.lineSt, State.lineVB, [GLAttrib.V2()]);
	SetInstanceBuffer(State.lineSt, State.lineIB, [GLAttrib.V3(), GLAttrib.V3(), GLAttrib.V4()]);
	
	SetVertexBuffer  (State.gridSt, State.lineVB, [GLAttrib.V2()]);
	SetInstanceBuffer(State.gridSt, State.gridIB, [GLAttrib.V3(), GLAttrib.V3(), GLAttrib.V4()]);
	
	SetVertexBuffer(State.pointSt, State.pointVB, [GLAttrib.V4(), GLAttrib.V3()]);
	SetVertexBuffer(State.quadSt,  State.quadVB,  [GLAttrib.V2()]);
	
	// Parameter buffer
	State.viewPB = BeginBuffer(128, gl.DYNAMIC_DRAW);
	State.objPB  = BeginBuffer(256, gl.DYNAMIC_DRAW);
	
	// Program parameters
	SetParameterBuffer(State.pointProg, "ViewParameters",   State.viewPB);
	SetParameterBuffer(State.lineProg,  "ViewParameters",   State.viewPB);
	SetParameterBuffer(State.objProg,   "ViewParameters",   State.viewPB);
	SetParameterBuffer(State.objProg,   "ObjectParameters", State.objPB);
	
	// Initial view
	const w = canvas.clientWidth;
	const h = canvas.clientHeight;
	
	canvas.width  = w;
	canvas.height = h;
	gl.viewport(0, 0, w, h);
	
	ResetView();
	
	// Load test model
	LoadGLB("Assets/Dude.glb").then(AddSceneObject, null);
	
	// Precalculated circle points
	{
		const numSegments = 32;
		const aStep       = (Math.PI * 2) / numSegments;
		let   a           = aStep;
		
		for (let i = 0; i < numSegments; i += 1)
		{
			const cosa  = Math.cos(a);
			const sina  = Math.sin(a);
			a          += aStep;
			
			State.circlePoints.push(new V2(cosa, sina));
		}
	}
	
	// Event listeners
	canvas.addEventListener("contextmenu", ev => {ev.preventDefault();});
	canvas.onpointerdown = Main_OnPointerDown;
	canvas.onpointermove = Gui_OnPointerMove_Up;
	canvas.onwheel       = Main_OnWheel;
	
	window.addEventListener("keydown", Main_OnKeyDown);
	window.addEventListener("resize",  Main_OnResize);
	
	// HUD
	const buttonList =
	[new ButtonEntry("addObject", AddSceneObject),
	 new ButtonEntry("resetView", ResetView),
	 new ButtonEntry("resetPos",  ResetPosition),
	 new ButtonEntry("resetScl",  ResetScale),
	 new ButtonEntry("resetRot",  ResetRotation),
	 new ButtonEntry("grid",      ToggleGrid)];
	
	for (const entry of buttonList)
	{
		const button   = document.getElementById(entry.id);
		button.onclick = entry.callBack;
	}
	
	State.objSettings = document.getElementById("objSettings");
	State.inColor     = document.getElementById("inColor");
	State.inRoughness = document.getElementById("inRoughness");
	State.inMetallic  = document.getElementById("inMetallic");
	
	State.inColor.oninput     = OnInput_Color;
	State.inRoughness.oninput = OnInput_Roughness;
	State.inMetallic.oninput  = OnInput_Metallic;
	
	// Grid
	State.gridBuf.PushGrid(10, .5, 1, Color.grid);
	
	WriteBuffer(State.gridIB,  State.gridBuf.data,  0, 0, State.gridBuf.num);
	
	// First frame
	gl.enable(gl.CULL_FACE);
	
	State.updateView  = true;
	State.updateScene = true;
	State.updateGui   = true;
	
	State.RequestFrame();
}

window.addEventListener("load", Init);