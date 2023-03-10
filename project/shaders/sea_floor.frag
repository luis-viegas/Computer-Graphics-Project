#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float texScale;

void main() {
	gl_FragColor = texture2D(uSampler, vTextureCoord*texScale) * (0.5 + texture2D(uSampler2, vTextureCoord));
}