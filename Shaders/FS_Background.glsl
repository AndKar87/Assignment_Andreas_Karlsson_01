#version 300 es

precision mediump float;

in  vec2 vsTexCoord;

out vec4 fsColor;

void main()
{
	vec3 C0    = vec3(0.12, 0.14, 0.22);
	vec3 C1    = vec3(0.64, 0.65, 0.6);
	vec3 color = mix(C0, C1, vsTexCoord.y * vsTexCoord.y);
	color    = sqrt(color);
	fsColor  = vec4(color, 1.0);
}
