#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float texScale;
uniform float timeFactor;

void main() {
	vec2 time = vec2(timeFactor,timeFactor)*0.001;
	vec2 offset = (texture2D(uSampler2,vTextureCoord+time).rg - vec2(0.5,0.5)) * texScale;
	gl_FragColor = texture2D(uSampler, vTextureCoord + offset);
}