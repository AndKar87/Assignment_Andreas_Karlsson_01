#version 300 es

layout (location = 0) in vec2 P;

out vec2 vsTexCoord;

void main()
{
	vsTexCoord  = (P * 0.5) + 0.5;
	gl_Position = vec4(P, 0.0, 1.0);
}
