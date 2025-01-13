#version 300 es

precision mediump float;

in  vec3 vsColor;

out vec4 fsColor;

void main()
{
	fsColor = vec4(sqrt(vsColor), 1.0);
}
