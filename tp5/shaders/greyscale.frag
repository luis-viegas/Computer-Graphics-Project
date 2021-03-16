#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorGreyscale = color;
	colorGreyscale.r = color.r * 0.200 + color.g *0.587 + color.b * 0.114;
	colorGreyscale.g = color.r * 0.200 + color.g *0.587 + color.b * 0.114;
	colorGreyscale.b = color.r * 0.200 + color.g *0.587 + color.b * 0.114;

	gl_FragColor = colorGreyscale;
}