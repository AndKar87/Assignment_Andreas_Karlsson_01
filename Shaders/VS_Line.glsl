#version 300 es

uniform ViewParameters
{
	mat4  worldToClip;
	vec4  P;
	vec4  X;
	float near;
	float pixToFilm;
} view;

// Vertex
layout (location = 0) in vec2 vertP;

// Instance
layout (location = 1) in vec3 P0;
layout (location = 2) in vec3 P1;
layout (location = 3) in vec4 color; // rgb + pixel width

out vec3 vsColor;

void main()
{
	vsColor  = color.rgb;
	vec3  vP   = view.P.xyz;
	vec3  vX   = view.X.xyz;
	float extf = color.w * 0.5 * view.pixToFilm;
	vec3  T    = P1 - P0;
	vec3  D0   = P0 - vP;
	vec3  D1   = P1 - vP;
	vec3  B    = normalize(cross(D0, T));
	float z0   = dot(D0, vX);
	float z1   = dot(D1, vX);
	float e0   = (z0 * extf) / view.near;
	float e1   = (z1 * extf) / view.near;
	vec3  Pw   = mix(P0, P1, vertP.y) + (vertP.x * B * mix(e0, e1, vertP.y));
	
	gl_Position = view.worldToClip * vec4(Pw, 1.0);
}
