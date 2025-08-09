//This file is automatically rebuilt by the Cesium build process.
export default "//\n\
// Vertex shader for Gaussian splats.\n\
\n\
// The splats are rendered as quads in view space. Splat attributes are loaded from a texture with precomputed 3D covariance.\n\
\n\
// Passes local quad coordinates and color to the fragment shader for Gaussian evaluation. \n\
//\n\
// Discards splats outside the view frustum or with negligible screen size.\n\
//\n\
\n\
// Transforms and projects splat covariance into screen space and extracts the major and minor axes of the Gaussian ellipsoid\n\
// which is used to calculate the vertex position in clip space.\n\
vec4 calcCovVectors(vec3 viewPos, mat3 Vrk) {\n\
    vec4 t = vec4(viewPos, 1.0);\n\
    float focal = czm_viewport.z * czm_projection[0][0];\n\
\n\
    float J1 = focal / t.z;\n\
    vec2 J2 = -J1 / t.z * t.xy;\n\
    mat3 J = mat3(\n\
        J1, 0.0, J2.x,\n\
        0.0, J1, J2.y,\n\
        0.0, 0.0, 0.0\n\
    );\n\
\n\
    mat3 R = mat3(czm_modelView);\n\
\n\
    //transform our covariance into view space\n\
    //ensures orientation is correct\n\
    mat3 Vrk_view = R * Vrk * transpose(R);\n\
    mat3 cov = transpose(J) * Vrk_view * J;\n\
\n\
    float diagonal1 = cov[0][0] + .3;\n\
    float offDiagonal = cov[0][1];\n\
    float diagonal2 = cov[1][1] + .3;\n\
\n\
    float mid = 0.5 * (diagonal1 + diagonal2);\n\
    float radius = length(vec2((diagonal1 - diagonal2) * 0.5, offDiagonal));\n\
    float lambda1 = mid + radius;\n\
    float lambda2 = max(mid - radius, 0.1);\n\
\n\
    vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));\n\
\n\
    return vec4(\n\
        min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector,\n\
        min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x)\n\
    );\n\
}\n\
\n\
highp vec4 discardVec = vec4(0.0, 0.0, 2.0, 1.0);\n\
\n\
void main() {\n\
    uint texIdx = uint(a_splatIndex);\n\
    ivec2 posCoord = ivec2((texIdx & 0x3ffu) << 1, texIdx >> 10);\n\
    vec4 splatPosition = vec4( uintBitsToFloat(uvec4(texelFetch(u_splatAttributeTexture, posCoord, 0))) );\n\
\n\
    vec4 splatViewPos = czm_modelView * vec4(splatPosition.xyz, 1.0);\n\
    vec4 clipPosition = czm_projection * splatViewPos;\n\
\n\
    float clip = 1.2 * clipPosition.w;\n\
    if (clipPosition.z < -clip || clipPosition.x < -clip || clipPosition.x > clip ||\n\
        clipPosition.y < -clip || clipPosition.y > clip) {\n\
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\
        return;\n\
    }\n\
\n\
    ivec2 covCoord = ivec2(((texIdx & 0x3ffu) << 1) | 1u, texIdx >> 10);\n\
    uvec4 covariance = uvec4(texelFetch(u_splatAttributeTexture, covCoord, 0));\n\
\n\
    gl_Position = clipPosition;\n\
\n\
    vec2 u1 = unpackHalf2x16(covariance.x) ;\n\
    vec2 u2 = unpackHalf2x16(covariance.y);\n\
    vec2 u3 = unpackHalf2x16(covariance.z);\n\
    mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);\n\
\n\
    vec4 covVectors = calcCovVectors(splatViewPos.xyz, Vrk);\n\
\n\
    if (dot(covVectors.xy, covVectors.xy) < 4.0 && dot(covVectors.zw, covVectors.zw) < 4.0) {\n\
        gl_Position = discardVec;\n\
        return;\n\
    }\n\
\n\
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.;\n\
\n\
    gl_Position += vec4((corner.x * covVectors.xy + corner.y * covVectors.zw) / czm_viewport.zw * gl_Position.w, 0, 0);\n\
    gl_Position.z = clamp(gl_Position.z, -abs(gl_Position.w), abs(gl_Position.w));\n\
\n\
    v_vertPos = corner ;\n\
    v_splatColor = vec4(covariance.w & 0xffu, (covariance.w >> 8) & 0xffu, (covariance.w >> 16) & 0xffu, (covariance.w >> 24) & 0xffu) / 255.0;\n\
\n\
    v_splitDirection = u_splitDirection;\n\
}";
