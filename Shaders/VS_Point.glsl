#version 300 es

uniform ViewParameters
{
	mat4  worldToClip;
	vec4  P;
	vec4  X;
	float near;
	float pixToFilm;
} view;

layout (location = 0) in vec4 P;
layout (location = 1) in vec3 color;

out vec3 vsColor;

void main()
{
	vsColor      = color;
	gl_PointSize = P.w;
	gl_Position  = view.worldToClip * vec4(P.xyz, 1.0);
}
