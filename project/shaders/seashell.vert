attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float bumpScale;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;


void main() {

    vec3 vertexNormal = aVertexNormal * (vec3(texture2D(uSampler2, aTextureCoord)));
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + vertexNormal, 1.0);

	vTextureCoord = aVertexPosition.xy;
}

