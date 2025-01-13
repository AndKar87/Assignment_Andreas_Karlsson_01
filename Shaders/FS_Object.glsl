#version 300 es

precision highp float;

#define SUN_DIR   normalize(vec3(-1.0, 1.0, 1.0))
#define SUN_COLOR vec3(1.0, 1.0, 1.0)
#define SUN_POWER 4.0
#define ENV_POWER 2.0

#define PI 3.14159265358979323846

#define MulAdd(t, m, a) (((t) * (m)) + (a))
#define SmoothT(t) ((t) * (t) * (3.0 - (2.0 * (t))))

vec3 Reflect(vec3 V, vec3 N)
{
	return (2.0 * N * dot(N, V)) - V;
}

#define U32AsF32(u) uintBitsToFloat(u)

// https://www.reedbeta.com/blog/hash-functions-for-gpu-rendering/
uint PCGHash(uint id)
{
	uint state = (id * 0x2C9277B5u) + 0xAC564B05u;
	uint word  =  state >> 28u;
	word      =  word   + 4u;
	word      =  state >> word;
	word      =  word   ^ state;
	word      =  word   * 0x108EF2D9u;
	return word;
}

#define WordF32(u) (U32AsF32(((u) & 0x007FFFFFu) | 0x3F800000u))
#define WordV3( u) (vec3(WordF32((u)), WordF32((u) >> 3), WordF32((u) >> 6)) - 1.0)

#define I3ID(I) uint((I.z << 26) + ((I.y << 13) + I.x))

vec3 Random33(ivec3 P)
{
	uint id    = I3ID(P);
	uint word  = PCGHash(id);
	return WordV3(word);
}

float Gradient31(vec3 P)
{
	vec3 Pf   = floor(P);
	ivec3 iMin = ivec3(Pf);
	ivec3 iMax = iMin + 1;
	
	//   7----6
	//  /|   /|
	// 4----5 2
	// |/   |/
	// 0----1
	
	vec3 R0 = Random33(iMin);
	vec3 R1 = Random33(ivec3(iMax.x, iMin.y, iMin.z));
	vec3 R2 = Random33(ivec3(iMax.x, iMax.y, iMin.z));
	vec3 R3 = Random33(ivec3(iMin.x, iMax.y, iMin.z));
	vec3 R4 = Random33(ivec3(iMin.x, iMin.y, iMax.z));
	vec3 R5 = Random33(ivec3(iMax.x, iMin.y, iMax.z));
	vec3 R6 = Random33(iMax);
	vec3 R7 = Random33(ivec3(iMin.x, iMax.y, iMax.z));
	
	R0 = MulAdd(R0, 2.0, -1.0);
	R1 = MulAdd(R1, 2.0, -1.0);
	R2 = MulAdd(R2, 2.0, -1.0);
	R3 = MulAdd(R3, 2.0, -1.0);
	R4 = MulAdd(R4, 2.0, -1.0);
	R5 = MulAdd(R5, 2.0, -1.0);
	R6 = MulAdd(R6, 2.0, -1.0);
	R7 = MulAdd(R7, 2.0, -1.0);
	
	vec3 T0 = fract(P);
	vec3 T6 = T0 - 1.0;
	vec3 T  = SmoothT(T0);
	
	float d0 = dot(R0, T0);
	float d1 = dot(R1, vec3(T6.x, T0.y, T0.z));
	float d2 = dot(R2, vec3(T6.x, T6.y, T0.z));
	float d3 = dot(R3, vec3(T0.x, T6.y, T0.z));
	float d4 = dot(R4, vec3(T0.x, T0.y, T6.z));
	float d5 = dot(R5, vec3(T6.x, T0.y, T6.z));
	float d6 = dot(R6, T6);
	float d7 = dot(R7, vec3(T0.x, T6.y, T6.z));
	
	return mix(mix(mix(d0, d1, T.x), mix(d3, d2, T.x), T.y),
				mix(mix(d4, d5, T.x), mix(d7, d6, T.x), T.y), T.z);
}
uniform ViewParameters
{
	mat4  worldToClip;
	vec4  P;
	vec4  X;
	float near;
	float pixToFilm;
} view;
uniform ObjectParameters
{
	mat4  localToWorld;
	vec4  color;
	float roughness;
	float metallic;
	float random;
} obj;

in  vec3 vsNormal;
in  vec3 vsPosition;
in  vec3 vsLocalPosition;

out vec4 fsColor;

// Normalised distribution function
// GGX
float NDF(float cosm, float a)
{
	float a2    = a * a;
	float cosm2 = cosm * cosm;
	float denom = ((a2 - 1.0) * cosm2) + 1.0;
	denom     = PI * denom * denom;
	return a2 / denom;
}

// Masking/Shadowing function
// Smoth model
float G1(float cosw, float a)
{
	float a2    = a * a;
	float sinw  = sqrt(1.0 - (cosw * cosw));
	float tanw  = sinw / cosw;
	float tanw2 = tanw * tanw;
	float G     = 2.0 / (1.0 + sqrt(1.0 + (a2 * tanw2)));
	return G;
}

// Fresnel term
// Schlick approximation
vec3 Fresnel(vec3 baseColor, float metallic, float cosr)
{
	vec3  F0     = mix(vec3(0.04), baseColor, metallic);
	float icosr  = 1.0 - cosr;
	float icosr5 = icosr * icosr * icosr * icosr * icosr;
	vec3  F      = F0 + ((1.0 - F0) * icosr5);
	return F;
}

// Diffuse BRDF
// Disney
vec3 BRDF_Diffuse(vec3 baseColor, float roughness, float metallic, float cosi, float cosv, float cosr)
{
	float cosr2   = cosr * cosr;
	float icosi   = 1.0 - cosi;
	float icosv   = 1.0 - cosv;
	float icosi5  = icosi * icosi * icosi * icosi * icosi;
	float icosv5  = icosv * icosv * icosv * icosv * icosv;
	float Fd90    = 0.5 + (2.0 * roughness * cosr2);
	float Fd90i   = Fd90 - 1.0;
	vec3  result  = (baseColor / PI) * (1.0 + (Fd90i * icosi5)) * (1.0 + (Fd90i * icosv5));
	result     *= 1.0 - metallic;
	return result;
}

vec3 Band3(vec3 C0, vec3 C1, vec3 C2, float t)
{
	t      *= 2.0;
	float t0  = max(1.0 - t, 0.0);
	float t1  = max(1.0 - abs(t - 1.0), 0.0);
	float t2  = 1.0 - (t0 + t1);
	
	return (C0 * t0) + (C1 * t1) + (C2 * t2);
}

vec3 SunLight()
{
	return SUN_COLOR * SUN_POWER;
}

vec3 EnvironmentLight(vec3 I)
{
	vec3 groundC = vec3(0.2, 0.15, 0.05);
	vec3 horizC  = vec3(0.3, 0.3, 0.2);
	vec3 skyC    = vec3(0.2, 0.6, 0.7);
	
	float t = max(I.z, 0.0);
	
	return Band3(groundC, horizC, skyC, t) * ENV_POWER;
}

void main()
{
	// Procedural texture
	vec3  P  = vsLocalPosition;
	float f0 = Gradient31((P + obj.random) * 4.0);
	float f1 = smoothstep(0.0, 0.1, abs(f0));
	
	vec3  baseColor = mix(vec3(1.0), obj.color.rgb, f1);
	float roughness = clamp(obj.roughness, 0.01, 0.95);
	float metallic  = obj.metallic;
	
	// I - Incoming direction
	// V - View direction
	// N - Geometry normal
	// M - Microfacet normal
	
	vec3 I = SUN_DIR;
	vec3 N = normalize(vsNormal);
	vec3 V = normalize(view.P.xyz - vsPosition);
	vec3 M = normalize(I + V);
	
	float cosi = dot(I, N);
	float cosv = dot(V, N);
	float cosm = dot(M, N);
	float cosr = dot(V, M);
	
	float cf = 1.0 / abs(4.0 * cosi * cosv);
	
	cosi = max(cosi, 0.0);
	cosv = max(cosv, 0.0);
	cosm = max(cosm, 0.0);
	cosr = max(cosr, 0.0);
	
	// Direct sunlight
	float a  = roughness * roughness;
	float D  = NDF(cosm, a);
	float Gm = G1 (cosv, a);
	float Gs = G1 (cosi, a);
	float G  = Gm * Gs;
	vec3  F  = Fresnel(baseColor, metallic, cosr);
	
	vec3 spec    = F * D * G * cf;
	vec3 diffuse = (1.0 - F) * BRDF_Diffuse(baseColor, roughness, metallic, cosi, cosv, cosr);
	
	vec3 L0 = SunLight();
	
	vec3 light = (diffuse + spec) * L0 * cosi;
	
	// Ambient light
	I = normalize(mix(Reflect(V, N), N, roughness));
	M = normalize(I + V);
	
	cosi = dot(I, N);
	cosv = dot(V, N);
	cosm = dot(M, N);
	cosr = dot(V, M);
	
	cf = 1.0 / abs(4.0 * cosi * cosv);
	
	cosi = max(cosi, 0.0);
	cosv = max(cosv, 0.0);
	cosm = max(cosm, 0.0);
	cosr = max(cosr, 0.0);
	
	D  = NDF(cosm, a);
	Gs = G1 (cosi, a);
	Gm = G1 (cosv, a);
	G  = Gs * Gm;
	F  = Fresnel(baseColor, metallic, cosr);
	
	spec    = F * G * cf;
	diffuse = (1.0 - F) * BRDF_Diffuse(baseColor, roughness, metallic, cosi, cosv, cosr);
	
	vec3 L1 = EnvironmentLight(I);
	
	light += (diffuse + spec) * L1 * cosi;
	
	light = sqrt(light);
	
	fsColor = vec4(light, 1.0);
}
