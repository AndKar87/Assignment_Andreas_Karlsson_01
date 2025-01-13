#version 300 es

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

layout (location = 0) in vec3 P;
layout (location = 1) in vec3 N;

out vec3 vsNormal;
out vec3 vsPosition;
out vec3 vsLocalPosition;

void main()
{
	vsNormal        = normalize((obj.localToWorld * vec4(N, 0.0)).xyz);
	vec4 Pw           = obj.localToWorld * vec4(P, 1.0);
	vsPosition      = Pw.xyz;
	vsLocalPosition = P;
	gl_Position     = view.worldToClip * Pw;
}
