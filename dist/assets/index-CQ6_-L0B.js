import{r as P,j as i,C as Xe,E as ke,O as Ge,u as ce,H as Ye,R as F,c as Ve}from"./three-w2SprxK5.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const u of t)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&d(f)}).observe(document,{childList:!0,subtree:!0});function l(t){const u={};return t.integrity&&(u.integrity=t.integrity),t.referrerPolicy&&(u.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?u.credentials="include":t.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function d(t){if(t.ep)return;t.ep=!0;const u=l(t);fetch(t.href,u)}})();const We=()=>{const o=document.getElementById("fluid");oe();let a={SIM_RESOLUTION:128,DYE_RESOLUTION:1440,DENSITY_DISSIPATION:.5,VELOCITY_DISSIPATION:3,PRESSURE:.1,PRESSURE_ITERATIONS:20,CURL:3,SPLAT_RADIUS:.2,SPLAT_FORCE:6e3,SHADING:!0,COLOR_UPDATE_SPEED:10};function l(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}const d=[];d.push(new l);const{gl:t,ext:u}=f(o);u.supportLinearFiltering||(a.DYE_RESOLUTION=256,a.SHADING=!1);function f(e){const n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=e.getContext("webgl2",n);const s=!!r;s||(r=e.getContext("webgl",n)||e.getContext("experimental-webgl",n));let c,m;s?(r.getExtension("EXT_color_buffer_float"),m=r.getExtension("OES_texture_float_linear")):(c=r.getExtension("OES_texture_half_float"),m=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const v=s?r.HALF_FLOAT:c.HALF_FLOAT_OES;let x,p,w;return s?(x=g(r,r.RGBA16F,r.RGBA,v),p=g(r,r.RG16F,r.RG,v),w=g(r,r.R16F,r.RED,v)):(x=g(r,r.RGBA,r.RGBA,v),p=g(r,r.RGBA,r.RGBA,v),w=g(r,r.RGBA,r.RGBA,v)),{gl:r,ext:{formatRGBA:x,formatRG:p,formatR:w,halfFloatTexType:v,supportLinearFiltering:m}}}function g(e,n,r,s){if(!j(e,n,r,s))switch(n){case e.R16F:return g(e,e.RG16F,e.RG,s);case e.RG16F:return g(e,e.RGBA16F,e.RGBA,s);default:return null}return{internalFormat:n,format:r}}function j(e,n,r,s){const c=e.createTexture();e.bindTexture(e.TEXTURE_2D,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,n,4,4,0,r,s,null);const m=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,m),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}class X{constructor(n,r){this.vertexShader=n,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(n){let r=0;for(let c=0;c<n.length;c++)r+=He(n[c]);let s=this.programs[r];if(s==null){let c=y(t.FRAGMENT_SHADER,this.fragmentShaderSource,n);s=$(this.vertexShader,c),this.programs[r]=s}s!=this.activeProgram&&(this.uniforms=ee(s),this.activeProgram=s)}bind(){t.useProgram(this.activeProgram)}}class T{constructor(n,r){this.uniforms={},this.program=$(n,r),this.uniforms=ee(this.program)}bind(){t.useProgram(this.program)}}function $(e,n){let r=t.createProgram();return t.attachShader(r,e),t.attachShader(r,n),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(r)),r}function ee(e){let n=[],r=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<r;s++){let c=t.getActiveUniform(e,s).name;n[c]=t.getUniformLocation(e,c)}return n}function y(e,n,r){n=he(n,r);const s=t.createShader(e);return t.shaderSource(s,n),t.compileShader(s),t.getShaderParameter(s,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(s)),s}function he(e,n){if(n==null)return e;let r="";return n.forEach(s=>{r+="#define "+s+`
`}),r+e}const D=y(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           vL = vUv - vec2(texelSize.x, 0.0);
           vR = vUv + vec2(texelSize.x, 0.0);
           vT = vUv + vec2(0.0, texelSize.y);
           vB = vUv - vec2(0.0, texelSize.y);
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `);y(t.VERTEX_SHADER,`
       precision highp float;
   
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform vec2 texelSize;
   
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           float offset = 1.33333333;
           vL = vUv - texelSize * offset;
           vR = vUv + texelSize * offset;
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }
   `),y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       uniform sampler2D uTexture;
   
       void main () {
           vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
           sum += texture2D(uTexture, vL) * 0.35294117;
           sum += texture2D(uTexture, vR) * 0.35294117;
           gl_FragColor = sum;
       }
   `);const ge=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
   
       void main () {
           gl_FragColor = texture2D(uTexture, vUv);
       }
   `),fe=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       uniform sampler2D uTexture;
       uniform float value;
   
       void main () {
           gl_FragColor = value * texture2D(uTexture, vUv);
       }
   `);y(t.FRAGMENT_SHADER,`
       precision mediump float;
   
       uniform vec4 color;
   
       void main () {
           gl_FragColor = color;
       }
   `);const pe=`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uTexture;
       uniform sampler2D uDithering;
       uniform vec2 ditherScale;
       uniform vec2 texelSize;
   
       vec3 linearToGamma (vec3 color) {
           color = max(color, vec3(0));
           return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
       }
   
       void main () {
           vec3 c = texture2D(uTexture, vUv).rgb;
   
       #ifdef SHADING
           vec3 lc = texture2D(uTexture, vL).rgb;
           vec3 rc = texture2D(uTexture, vR).rgb;
           vec3 tc = texture2D(uTexture, vT).rgb;
           vec3 bc = texture2D(uTexture, vB).rgb;
   
           float dx = length(rc) - length(lc);
           float dy = length(tc) - length(bc);
   
           vec3 n = normalize(vec3(dx, dy, length(texelSize)));
           vec3 l = vec3(0.0, 0.0, 1.0);
   
           float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
           c *= diffuse;
       #endif
   
           float a = max(c.r, max(c.g, c.b));
           gl_FragColor = vec4(c, a);
       }
   `,xe=y(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uTarget;
       uniform float aspectRatio;
       uniform vec3 color;
       uniform vec2 point;
       uniform float radius;
   
       void main () {
           vec2 p = vUv - point.xy;
           p.x *= aspectRatio;
           vec3 splat = exp(-dot(p, p) / radius) * color;
           vec3 base = texture2D(uTarget, vUv).xyz;
           gl_FragColor = vec4(base + splat, 1.0);
       }
   `),ye=y(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform vec2 dyeTexelSize;
       uniform float dt;
       uniform float dissipation;
   
       vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
           vec2 st = uv / tsize - 0.5;
   
           vec2 iuv = floor(st);
           vec2 fuv = fract(st);
   
           vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
           vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
           vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
           vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
   
           return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
       }
   
       void main () {
       #ifdef MANUAL_FILTERING
           vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
           vec4 result = bilerp(uSource, coord, dyeTexelSize);
       #else
           vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
           vec4 result = texture2D(uSource, coord);
       #endif
           float decay = 1.0 + dissipation * dt;
           gl_FragColor = result / decay;
       }`,u.supportLinearFiltering?null:["MANUAL_FILTERING"]),be=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).x;
           float R = texture2D(uVelocity, vR).x;
           float T = texture2D(uVelocity, vT).y;
           float B = texture2D(uVelocity, vB).y;
   
           vec2 C = texture2D(uVelocity, vUv).xy;
           if (vL.x < 0.0) { L = -C.x; }
           if (vR.x > 1.0) { R = -C.x; }
           if (vT.y > 1.0) { T = -C.y; }
           if (vB.y < 0.0) { B = -C.y; }
   
           float div = 0.5 * (R - L + T - B);
           gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
       }
   `),Se=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uVelocity, vL).y;
           float R = texture2D(uVelocity, vR).y;
           float T = texture2D(uVelocity, vT).x;
           float B = texture2D(uVelocity, vB).x;
           float vorticity = R - L - T + B;
           gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
       }
   `),je=y(t.FRAGMENT_SHADER,`
       precision highp float;
       precision highp sampler2D;
   
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       uniform sampler2D uCurl;
       uniform float curl;
       uniform float dt;
   
       void main () {
           float L = texture2D(uCurl, vL).x;
           float R = texture2D(uCurl, vR).x;
           float T = texture2D(uCurl, vT).x;
           float B = texture2D(uCurl, vB).x;
           float C = texture2D(uCurl, vUv).x;
   
           vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
           force /= length(force) + 0.0001;
           force *= curl * C;
           force.y *= -1.0;
   
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity += force * dt;
           velocity = min(max(velocity, -1000.0), 1000.0);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),Ee=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uDivergence;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           float C = texture2D(uPressure, vUv).x;
           float divergence = texture2D(uDivergence, vUv).x;
           float pressure = (L + R + B + T - divergence) * 0.25;
           gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
       }
   `),Te=y(t.FRAGMENT_SHADER,`
       precision mediump float;
       precision mediump sampler2D;
   
       varying highp vec2 vUv;
       varying highp vec2 vL;
       varying highp vec2 vR;
       varying highp vec2 vT;
       varying highp vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uVelocity;
   
       void main () {
           float L = texture2D(uPressure, vL).x;
           float R = texture2D(uPressure, vR).x;
           float T = texture2D(uPressure, vT).x;
           float B = texture2D(uPressure, vB).x;
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity.xy -= vec2(R - L, T - B);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }
   `),E=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,n=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),n&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let S,h,k,G,N;const te=new T(D,ge),Y=new T(D,fe),A=new T(D,xe),R=new T(D,ye),V=new T(D,be),W=new T(D,Se),L=new T(D,je),M=new T(D,Ee),U=new T(D,Te),O=new X(D,pe);function ie(){let e=ae(a.SIM_RESOLUTION),n=ae(a.DYE_RESOLUTION);const r=u.halfFloatTexType,s=u.formatRGBA,c=u.formatRG,m=u.formatR,v=u.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),S==null?S=J(n.width,n.height,s.internalFormat,s.format,r,v):S=ne(S,n.width,n.height,s.internalFormat,s.format,r,v),h==null?h=J(e.width,e.height,c.internalFormat,c.format,r,v):h=ne(h,e.width,e.height,c.internalFormat,c.format,r,v),k=C(e.width,e.height,m.internalFormat,m.format,r,t.NEAREST),G=C(e.width,e.height,m.internalFormat,m.format,r,t.NEAREST),N=J(e.width,e.height,m.internalFormat,m.format,r,t.NEAREST)}function C(e,n,r,s,c,m){t.activeTexture(t.TEXTURE0);let v=t.createTexture();t.bindTexture(t.TEXTURE_2D,v),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,r,e,n,0,s,c,null);let x=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,x),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,v,0),t.viewport(0,0,e,n),t.clear(t.COLOR_BUFFER_BIT);let p=1/e,w=1/n;return{texture:v,fbo:x,width:e,height:n,texelSizeX:p,texelSizeY:w,attach(_){return t.activeTexture(t.TEXTURE0+_),t.bindTexture(t.TEXTURE_2D,v),_}}}function J(e,n,r,s,c,m){let v=C(e,n,r,s,c,m),x=C(e,n,r,s,c,m);return{width:e,height:n,texelSizeX:v.texelSizeX,texelSizeY:v.texelSizeY,get read(){return v},set read(p){v=p},get write(){return x},set write(p){x=p},swap(){let p=v;v=x,x=p}}}function Re(e,n,r,s,c,m,v){let x=C(n,r,s,c,m,v);return te.bind(),t.uniform1i(te.uniforms.uTexture,e.attach(0)),E(x),x}function ne(e,n,r,s,c,m,v){return e.width==n&&e.height==r||(e.read=Re(e.read,n,r,s,c,m,v),e.write=C(n,r,s,c,m,v),e.width=n,e.height=r,e.texelSizeX=1/n,e.texelSizeY=1/r),e}function De(){let e=[];a.SHADING&&e.push("SHADING"),O.setKeywords(e)}De(),ie();let re=Date.now(),B=0;function q(){const e=we();oe()&&ie(),Ne(e),Ae(),Pe(e),_e(null),requestAnimationFrame(q)}function we(){let e=Date.now(),n=(e-re)/1e3;return n=Math.min(n,.016666),re=e,n}function oe(){let e=b(o.clientWidth),n=b(o.clientHeight);return o.width!=e||o.height!=n?(o.width=e,o.height=n,!0):!1}function Ne(e){B+=e*a.COLOR_UPDATE_SPEED,B>=1&&(B=ze(B,0,1),d.forEach(n=>{n.color=I()}))}function Ae(){d.forEach(e=>{e.moved&&(e.moved=!1,Le(e))})}function Pe(e){t.disable(t.BLEND),W.bind(),t.uniform2f(W.uniforms.texelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(W.uniforms.uVelocity,h.read.attach(0)),E(G),L.bind(),t.uniform2f(L.uniforms.texelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(L.uniforms.uVelocity,h.read.attach(0)),t.uniform1i(L.uniforms.uCurl,G.attach(1)),t.uniform1f(L.uniforms.curl,a.CURL),t.uniform1f(L.uniforms.dt,e),E(h.write),h.swap(),V.bind(),t.uniform2f(V.uniforms.texelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(V.uniforms.uVelocity,h.read.attach(0)),E(k),Y.bind(),t.uniform1i(Y.uniforms.uTexture,N.read.attach(0)),t.uniform1f(Y.uniforms.value,a.PRESSURE),E(N.write),N.swap(),M.bind(),t.uniform2f(M.uniforms.texelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(M.uniforms.uDivergence,k.attach(0));for(let r=0;r<a.PRESSURE_ITERATIONS;r++)t.uniform1i(M.uniforms.uPressure,N.read.attach(1)),E(N.write),N.swap();U.bind(),t.uniform2f(U.uniforms.texelSize,h.texelSizeX,h.texelSizeY),t.uniform1i(U.uniforms.uPressure,N.read.attach(0)),t.uniform1i(U.uniforms.uVelocity,h.read.attach(1)),E(h.write),h.swap(),R.bind(),t.uniform2f(R.uniforms.texelSize,h.texelSizeX,h.texelSizeY),u.supportLinearFiltering||t.uniform2f(R.uniforms.dyeTexelSize,h.texelSizeX,h.texelSizeY);let n=h.read.attach(0);t.uniform1i(R.uniforms.uVelocity,n),t.uniform1i(R.uniforms.uSource,n),t.uniform1f(R.uniforms.dt,e),t.uniform1f(R.uniforms.dissipation,a.VELOCITY_DISSIPATION),E(h.write),h.swap(),u.supportLinearFiltering||t.uniform2f(R.uniforms.dyeTexelSize,S.texelSizeX,S.texelSizeY),t.uniform1i(R.uniforms.uVelocity,h.read.attach(0)),t.uniform1i(R.uniforms.uSource,S.read.attach(1)),t.uniform1f(R.uniforms.dissipation,a.DENSITY_DISSIPATION),E(S.write),S.swap()}function _e(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Fe(e)}function Fe(e){let n=t.drawingBufferWidth,r=t.drawingBufferHeight;O.bind(),a.SHADING&&t.uniform2f(O.uniforms.texelSize,1/n,1/r),t.uniform1i(O.uniforms.uTexture,S.read.attach(0)),E(e)}function Le(e){let n=e.deltaX*a.SPLAT_FORCE,r=e.deltaY*a.SPLAT_FORCE;se(e.texcoordX,e.texcoordY,n,r,e.color)}function Ce(e){const n=I();n.r*=10,n.g*=10,n.b*=10;let r=10*(Math.random()-.5),s=30*(Math.random()-.5);se(e.texcoordX,e.texcoordY,r,s,n)}function se(e,n,r,s,c){A.bind(),t.uniform1i(A.uniforms.uTarget,h.read.attach(0)),t.uniform1f(A.uniforms.aspectRatio,o.width/o.height),t.uniform2f(A.uniforms.point,e,n),t.uniform3f(A.uniforms.color,r,s,0),t.uniform1f(A.uniforms.radius,Me(a.SPLAT_RADIUS/100)),E(h.write),h.swap(),t.uniform1i(A.uniforms.uTarget,S.read.attach(0)),t.uniform3f(A.uniforms.color,c.r,c.g,c.b),E(S.write),S.swap()}function Me(e){let n=o.width/o.height;return n>1&&(e*=n),e}window.addEventListener("mousedown",e=>{let n=d[0],r=b(e.clientX),s=b(e.clientY);K(n,-1,r,s),Ce(n)}),document.body.addEventListener("mousemove",function e(n){let r=d[0],s=b(n.clientX),c=b(n.clientY),m=I();q(),Q(r,s,c,m),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let n=d[0],r=b(e.clientX),s=b(e.clientY),c=n.color;Q(n,r,s,c)}),document.body.addEventListener("touchstart",function e(n){const r=n.targetTouches;let s=d[0];for(let c=0;c<r.length;c++){let m=b(r[c].clientX),v=b(r[c].clientY);q(),K(s,r[c].identifier,m,v)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{const n=e.targetTouches;let r=d[0];for(let s=0;s<n.length;s++){let c=b(n[s].clientX),m=b(n[s].clientY);K(r,n[s].identifier,c,m)}}),window.addEventListener("touchmove",e=>{const n=e.targetTouches;let r=d[0];for(let s=0;s<n.length;s++){let c=b(n[s].clientX),m=b(n[s].clientY);Q(r,c,m,r.color)}},!1),window.addEventListener("touchend",e=>{const n=e.changedTouches;let r=d[0];for(let s=0;s<n.length;s++)Ue(r)});function K(e,n,r,s){e.id=n,e.down=!0,e.moved=!1,e.texcoordX=r/o.width,e.texcoordY=1-s/o.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=I()}function Q(e,n,r,s){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=n/o.width,e.texcoordY=1-r/o.height,e.deltaX=Oe(e.texcoordX-e.prevTexcoordX),e.deltaY=Be(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=s}function Ue(e){e.down=!1}function Oe(e){let n=o.width/o.height;return n<1&&(e*=n),e}function Be(e){let n=o.width/o.height;return n>1&&(e/=n),e}function I(){let e=Ie(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function Ie(e,n,r){let s,c,m,v,x,p,w,_;switch(v=Math.floor(e*6),x=e*6-v,p=r*(1-n),w=r*(1-x*n),_=r*(1-(1-x)*n),v%6){case 0:s=r,c=_,m=p;break;case 1:s=w,c=r,m=p;break;case 2:s=p,c=r,m=_;break;case 3:s=p,c=w,m=r;break;case 4:s=_,c=p,m=r;break;case 5:s=r,c=p,m=w;break}return{r:s,g:c,b:m}}function ze(e,n,r){const s=r-n;return(e-n)%s+n}function ae(e){let n=t.drawingBufferWidth/t.drawingBufferHeight;n<1&&(n=1/n);const r=Math.round(e),s=Math.round(e*n);return t.drawingBufferWidth>t.drawingBufferHeight?{width:s,height:r}:{width:r,height:s}}function b(e){const n=window.devicePixelRatio||1;return Math.floor(e*n)}function He(e){if(e.length==0)return 0;let n=0;for(let r=0;r<e.length;r++)n=(n<<5)-n+e.charCodeAt(r),n|=0;return n}},Je=()=>(P.useEffect(()=>{We()},[]),i.jsx("canvas",{id:"fluid"}));function qe(){return i.jsxs("div",{className:"navbar",children:[i.jsx("div",{className:"myname",children:"Hitha Harish"}),i.jsx("div",{className:"nav-links-container",children:i.jsxs("ul",{className:"nav-links",children:[i.jsx("li",{children:i.jsx("a",{href:"#home",children:"Me"})}),i.jsx("li",{children:i.jsx("a",{href:"#skills",children:"Skills"})}),i.jsx("li",{children:i.jsx("a",{href:"#experience",children:"Experience"})}),i.jsx("li",{children:i.jsx("a",{href:"#projects",children:"Projects"})}),i.jsx("li",{children:i.jsx("a",{href:"#certifications",children:"Certifications"})}),i.jsx("li",{children:i.jsx("a",{href:"#contact",children:"Contact"})})]})})]})}function Ke(){const o=ce("/models/Untitled123.glb");return ce.preload("/models/Untitled123.glb"),i.jsx("primitive",{object:o.scene,rotation:[0,-Math.PI/4,0],scale:[.3,.3,.3],position:[0,-.2,0]})}function Qe(){return i.jsx(Ye,{center:!0,children:i.jsxs("div",{className:"loading-spinner",children:[i.jsx("div",{className:"spinner"}),i.jsx("p",{children:"Loading model..."})]})})}function Ze(){const o=P.useRef();return i.jsxs("div",{style:{height:"100vh",width:"100%",float:"right",marginTop:"10px",marginRight:"-50px",position:"relative",zIndex:0},children:[i.jsxs(Xe,{camera:{position:[2,.8,6],fov:50},gl:{physicallyCorrectLights:!0,toneMappingExposure:.8},children:[i.jsx("ambientLight",{intensity:.7}),i.jsx("directionalLight",{intensity:.5,position:[3,3,3],color:"#ffffff"}),i.jsx("directionalLight",{intensity:.3,position:[-3,2,-1],color:"#ffffee"}),i.jsxs(P.Suspense,{fallback:i.jsx(Qe,{}),children:[i.jsx(ke,{preset:"dawn",background:!1}),i.jsx(Ke,{})]}),i.jsx(Ge,{ref:o,enableZoom:!1,enablePan:!1,enableRotate:!0,rotateSpeed:.8,minAzimuthAngle:-Math.PI/4,maxAzimuthAngle:Math.PI/4,minPolarAngle:Math.PI/6,maxPolarAngle:Math.PI/2.2})]}),i.jsx("style",{jsx:!0,global:!0,children:`
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}function $e(){return i.jsxs("div",{className:"home-container",children:[i.jsxs("div",{className:"animation",children:[i.jsx("p",{className:"subtitle",children:"Meet Me,"}),i.jsx("p",{className:"title",children:"Hitha Harish"}),i.jsx("p",{className:"subtitle",children:"Full  Stack  Developer."}),i.jsx("a",{href:"/hitha22harish@gmail.com_HithaHarish_Resume.pdf",download:"hitha22harish@gmail.com_HithaHarish_Resume.pdf",className:"download-btn",children:"Download Resume"})]}),i.jsx("div",{className:"model-section",children:i.jsx(Ze,{})})]})}const et={"Programming Languages":[{name:"Java",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},{name:"Python",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},{name:"C",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"}],"Frontend Technologies":[{name:"HTML",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},{name:"CSS",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},{name:"JavaScript",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},{name:"Tailwind CSS",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"}],"Backend Technologies":[{name:"Node.js",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},{name:"Supabase",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"}],Databases:[{name:"MySQL",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},{name:"MongoDB",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"}],"Mobile App Development":[{name:"Flutter",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"},{name:"Dart",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"}],Frameworks:[{name:"React.js",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{name:"Three.js",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"}],"API Technologies":[{name:"Postman",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"},{name:"OpenWeather",logo:"https://www.svgrepo.com/show/518351/openweather.svg"}],"Data Analytics":[{name:"Pandas",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"},{name:"NumPy",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"},{name:"Matplotlib",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg"}],"3D Modeling":[{name:"Blender",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg"}],Cloud:[{name:"Google Cloud",logo:"https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"}],"Operating Systems":[{name:"Windows",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"},{name:"macOS",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"},{name:"Linux",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"}],"Design Tools":[{name:"Canva",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"},{name:"Figma",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"}],"Developer Tools":[{name:"GitHub",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},{name:"VS Code",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"},{name:"Android Studio",logo:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"}]};function tt(){const o=Object.values(et).flat();return i.jsxs("div",{className:"skills-container",children:[i.jsx("h2",{className:"skills-title open-sans",children:"My Stack"}),i.jsx("div",{className:"all-skills-wrapper",children:o.map(a=>i.jsxs("div",{className:"skill-card",children:[i.jsx("img",{src:a.logo,alt:a.name,className:"skill-logo"}),i.jsx("p",{className:"skill-name",children:a.name})]},a.name))})]})}const it=[{company:"UVEN",role:"Full Stack Developer",duration:"Jun 2025 - Present",description:"Independently designed and developed a full-fledged company website, covering UI/UX, responsive frontend, and backend. Handled deployment and hosting to deliver a seamless, professional online presence.",website:"",techStack:["icons/React.svg","icons/Node.svg","icons/Express.svg","icons/Canva.svg"]},{company:"BMSCE Utsav",role:"Web Development Volunteer",duration:"Apr 2025 - May 2025",description:"Worked as a WebDev volunteer, collaborating with the team to develop and enhance the website using React and MongoDB.Contributed to UI/UX design by assisting with the selection and implementation of animations, fonts, and color schemes to create a cohesive and engaging user interface.",website:"https://utsav.bmsce.in",techStack:["icons/React.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"]},{company:"Poseidon Aquatics",role:"Web Application Developer",duration:"Jan 2025 - Feb 2025",description:"Worked on designing and developing a fully responsive website using HTML, CSS, and JavaScript. Handled version control through GitHub and successfully deployed the site using GoDaddy for seamless public access.",website:"https://poseidonaquatics.co.in",techStack:["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"]}];function nt(){const[o,a]=P.useState(null),[l,d]=P.useState({x:0,y:0}),t=g=>{g.website&&a(g.website)},u=g=>{d({x:g.clientX+20,y:g.clientY-250})},f=()=>{a(null)};return i.jsxs("div",{className:"experience-container",children:[i.jsx("h2",{className:"experience-title",children:"My Experience"}),it.map((g,j)=>i.jsxs("div",{className:"experience-row",onMouseEnter:()=>t(g),onMouseLeave:f,onMouseMove:u,children:[i.jsxs("div",{className:"experience-left",children:[i.jsx("p",{className:"experience-role-big",children:g.role}),i.jsx("p",{className:"experience-company-small",children:g.company})]}),i.jsx("div",{className:"experience-center",children:i.jsx("p",{className:"experience-description",children:g.description})}),i.jsxs("div",{className:"experience-right",children:[i.jsx("p",{className:"experience-date",children:g.duration}),i.jsx("div",{className:"tech-stack-icons",children:g.techStack.map((X,T)=>i.jsx("img",{src:X,className:"tech-icon"},T))})]})]},j)),o&&i.jsx("div",{className:"floating-phone",style:{top:l.y,left:l.x},children:i.jsx("iframe",{src:o,title:"Website Preview",className:"phone-iframe"})})]})}const rt={name:"Hitha Harish",profileImage:"/assets/Achievements/profileimage.png",descriptionPoints:["I'm a 3rd-year Computer Science Engineering student at BMS College of Engineering, Bengaluru","Curious about both what users see and how it works behind the scenes."],achievements:["Ranked among the top 0.6% of LeetCode users globally","Global LeetCode Rank: 116,790 — and climbing.","Leetcode solved 500+ problems","Reached a peak contest rating of 1535 on LeetCode","Maintaining a CGPA of 9.39 ( 4th Semester )"],badges:[{name:"Postman API Fundamentals Student Expert",image:"/assets/Achievements/Badges/Postman.png"},{name:"100 Days 2025",image:"/assets/Achievements/Badges/100days2025.png"},{name:"50 Days 2025",image:"/assets/Achievements/Badges/50days2025.png"},{name:"100 Days 2024",image:"/assets/Achievements/Badges/100days2024.png"},{name:"50 Days 2024",image:"/assets/Achievements/Badges/50days2024.png"}]};function ot(){const{profileImage:o,name:a,descriptionPoints:l,achievements:d,badges:t}=rt;return i.jsxs("div",{className:"about-container",children:[i.jsxs("div",{className:"about-left",children:[i.jsx("img",{src:o,alt:"Profile",className:"profile-image"}),i.jsx("h2",{className:"name",children:a}),i.jsx("ul",{className:"description",children:l.map((u,f)=>i.jsx("li",{children:u},f))})]}),i.jsxs("div",{className:"about-right",children:[i.jsx("h3",{className:"section-title",children:"My Achievements"}),i.jsx("ul",{className:"achievements-list",children:d.map((u,f)=>i.jsx("li",{children:i.jsx("strong",{children:u})},f))}),i.jsx("div",{className:"badges-section",children:i.jsx("div",{className:"badges-list",children:t.map((u,f)=>i.jsx("img",{src:u.image,alt:u.name,title:u.name,className:"badge-icon"},f))})})]})]})}var ue={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},le=F.createContext&&F.createContext(ue),st=["attr","size","title"];function at(o,a){if(o==null)return{};var l=ct(o,a),d,t;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(o);for(t=0;t<u.length;t++)d=u[t],!(a.indexOf(d)>=0)&&Object.prototype.propertyIsEnumerable.call(o,d)&&(l[d]=o[d])}return l}function ct(o,a){if(o==null)return{};var l={};for(var d in o)if(Object.prototype.hasOwnProperty.call(o,d)){if(a.indexOf(d)>=0)continue;l[d]=o[d]}return l}function z(){return z=Object.assign?Object.assign.bind():function(o){for(var a=1;a<arguments.length;a++){var l=arguments[a];for(var d in l)Object.prototype.hasOwnProperty.call(l,d)&&(o[d]=l[d])}return o},z.apply(this,arguments)}function de(o,a){var l=Object.keys(o);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(o);a&&(d=d.filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable})),l.push.apply(l,d)}return l}function H(o){for(var a=1;a<arguments.length;a++){var l=arguments[a]!=null?arguments[a]:{};a%2?de(Object(l),!0).forEach(function(d){lt(o,d,l[d])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(l)):de(Object(l)).forEach(function(d){Object.defineProperty(o,d,Object.getOwnPropertyDescriptor(l,d))})}return o}function lt(o,a,l){return a=dt(a),a in o?Object.defineProperty(o,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):o[a]=l,o}function dt(o){var a=ut(o,"string");return typeof a=="symbol"?a:a+""}function ut(o,a){if(typeof o!="object"||!o)return o;var l=o[Symbol.toPrimitive];if(l!==void 0){var d=l.call(o,a);if(typeof d!="object")return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(o)}function me(o){return o&&o.map((a,l)=>F.createElement(a.tag,H({key:l},a.attr),me(a.child)))}function Z(o){return a=>F.createElement(mt,z({attr:H({},o.attr)},a),me(o.child))}function mt(o){var a=l=>{var{attr:d,size:t,title:u}=o,f=at(o,st),g=t||l.size||"1em",j;return l.className&&(j=l.className),o.className&&(j=(j?j+" ":"")+o.className),F.createElement("svg",z({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},l.attr,d,f,{className:j,style:H(H({color:o.color||l.color},l.style),o.style),height:g,width:g,xmlns:"http://www.w3.org/2000/svg"}),u&&F.createElement("title",null,u),o.children)};return le!==void 0?F.createElement(le.Consumer,null,l=>a(l)):a(ue)}function ve(o){return Z({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(o)}function vt(o){return Z({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"},child:[]}]})(o)}function ht(o){return Z({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(o)}function gt({image:o,title:a,description:l,techStack:d,github:t}){return i.jsxs("div",{className:"safari-tab",children:[i.jsxs("div",{className:"safari-header",children:[i.jsxs("div",{className:"dots",children:[i.jsx("span",{className:"dot red"}),i.jsx("span",{className:"dot yellow"}),i.jsx("span",{className:"dot green"})]}),i.jsx("div",{className:"fake-search-bar",children:i.jsx("span",{className:"search-text",children:"localhost"})}),i.jsx("div",{className:"empty-space"})]}),i.jsxs("div",{className:"safari-content",children:[i.jsx("img",{src:o,alt:a,className:"project-image"}),i.jsx("h3",{className:"tab-title",children:a}),i.jsx("p",{className:"project-description",children:l}),i.jsxs("div",{className:"safari-footer",children:[i.jsx("div",{className:"tech-stack",children:d.map((u,f)=>i.jsx("img",{src:u.icon,alt:u.name,title:u.name,className:"tech-icons"},f))}),i.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"github-link",children:i.jsx(ve,{size:24})})]})]})]})}const ft=[{title:"My Portfolio",image:"/assets/Projects/images/My Portfolio.png",description:"This is a personal portfolio built using React and custom CSS, created to showcase the projects I've worked on, the skills I've gained, and the milestones I've achieved along the way. It reflects not just my technical growth as a developer, but also my passion for building meaningful and well-crafted user experiences.",techStack:[{name:"React",icon:"/icons/React.svg"},{name:"CSS",icon:"/icons/CSS.svg"},{name:"Vite",icon:"/icons/Vite.svg"},{name:"Blender",icon:"/icons/Blender.svg"},{name:"Three.js",icon:"/icons/Three.svg"},{name:"Node.js",icon:"/icons/Node.svg"},{name:"Express.js",icon:"/icons/Express.svg"}],github:"https://github.com/HithaHarish/Portfolio"},{title:"Virtual Fashion Assistant - Female (Ongoing)",image:"/ComingSoon.jpg",description:"A Flutter app that provides users with customized outfit suggestions based on their body parameters. It integrates data from various e-commerce platforms via Google Custom Search Engine, offers weather-based styling options using OpenWeather, offers restyling closet options and includes a chatbot for real-time fashion advice.",techStack:[{name:"Flutter",icon:"/icons/Flutter.svg"},{name:"Dart",icon:"/icons/Dart.svg"},{name:"Supabase",icon:"/icons/Supabase.svg"},{name:"OpenAI",icon:"/icons/OpenAI.svg"},{name:"OpenWeather",icon:"/icons/OpenWeather.svg"},{name:"GoogleCustomSearch",icon:"/icons/Google Custom.svg"}],github:"https://github.com/HithaHarish/LookWise"},{title:"InterLanguage Shell Scripting",image:"/assets/Projects/images/InterLang.png",description:"A Linux-based library management system using interlanguage shell scripting, with MySQL for data storage and manipualtion, C for basic functionality such as taking user input and using it for data manipulation, and Python for analysis of library statistics.",techStack:[{name:"Linux",icon:"/icons/Linux.svg"},{name:"Python",icon:"/icons/Python.svg"},{name:"C",icon:"/icons/C.svg"},{name:"MySQL",icon:"/icons/MySQL.svg"}],github:"https://github.com/HithaHarish/EmployeeManagementSystem"}];function pt(){return i.jsxs("div",{className:"projects-container",children:[i.jsx("h2",{className:"projects-title",children:"My Projects"}),i.jsx("div",{className:"projects-grid",children:ft.map((o,a)=>i.jsx(gt,{image:o.image,title:o.title,description:o.description,techStack:o.techStack,github:o.github},a))})]})}const xt=[{title:"Postman API Fundamentals Student Expert",organization:"Postman",logo:"/assets/Certifications/logoss/Postman.webp",date:"Jul 2025"},{title:"MongoDB Node.js Developer Path",organization:"MongoDB",logo:"/assets/Certifications/logoss/MongoDB.png",date:"Jul 2025"},{title:"Introduction to Node.js",organization:"The Linux Foundation",logo:"/assets/Certifications/logoss/LinuxFndn.png",date:"Jul 2025"},{title:"Java for Beginners",organization:"ScholarHat",logo:"/assets/Certifications/logoss/ScholarHat.jpeg",date:"Jul 2025"},{title:"Problem Solving (Basic)",organization:"HackerRank",logo:"/assets/Certifications/logoss/HackerRank.png",date:"May 2025"},{title:"100 Canva",organization:"Canva",logo:"/assets/Certifications/logoss/Canva.jpg",date:"May 2025"},{title:"SQL (Intermediate)",organization:"HackerRank",logo:"/assets/Certifications/logoss/HackerRank.png",date:"Feb 2025"},{title:"Java (Basic)",organization:"HackerRank",logo:"/assets/Certifications/logoss/HackerRank.png",date:"Feb 2025"},{title:"CSS (Basic)",organization:"HackerRank",logo:"/assets/Certifications/logoss/HackerRank.png",date:"Feb 2025"}];function yt(){return i.jsxs("div",{className:"certifications-container",children:[i.jsx("h2",{className:"certifications-title",children:"My Certifications"}),xt.map((o,a)=>i.jsxs("div",{className:"certifications-row",children:[i.jsx("div",{className:"certifications-left",children:i.jsx("p",{className:"certifications-role-big",children:o.title})}),i.jsxs("div",{className:"certifications-center",children:[i.jsx("img",{src:o.logo,alt:`${o.organization} logo`,className:"certifications-logo"}),i.jsx("p",{className:"certifications-org",children:o.organization})]}),i.jsx("div",{className:"certifications-right",children:i.jsxs("p",{className:"certifications-date",children:["Issued in ",o.date]})})]},a))]})}function bt(){const[o,a]=P.useState({name:"",email:"",message:""}),[l,d]=P.useState(!1),t=f=>{a(g=>({...g,[f.target.name]:f.target.value}))},u=async f=>{f.preventDefault(),d(!0);try{const g=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),j=await g.json();if(!g.ok)throw new Error(j.message||"Failed to send");alert(j.message),a({name:"",email:"",message:""})}catch(g){console.error("Error sending message:",g),alert(g.message||"Oops, I didnt get your message ! Try Again")}finally{d(!1)}};return i.jsxs(i.Fragment,{children:[i.jsx("p",{className:"contact-title",children:"Contact Me !"}),i.jsxs("div",{className:"safari-window-dark",children:[i.jsxs("div",{className:"safari-header-dark",children:[i.jsx("span",{className:"traffic-light red"}),i.jsx("span",{className:"traffic-light yellow"}),i.jsx("span",{className:"traffic-light green"})]}),i.jsxs("div",{className:"safari-content-dark",children:[i.jsx("p",{className:"contact-intro",children:"Hiring? Building something cool? I’m in — let’s talk!"}),i.jsxs("form",{className:"contact-form-dark",onSubmit:u,children:[i.jsx("label",{children:"Full Name"}),i.jsx("input",{type:"text",name:"name",placeholder:"Your Full Name",value:o.name,onChange:t,required:!0,disabled:l}),i.jsx("label",{children:"Email"}),i.jsx("input",{type:"email",name:"email",placeholder:"Your Email",value:o.email,onChange:t,required:!0,disabled:l}),i.jsx("label",{children:"Your Message"}),i.jsx("textarea",{name:"message",rows:"5",placeholder:"Type carefully. This could be the start of something awesome.",value:o.message,onChange:t,required:!0,disabled:l}),i.jsxs("button",{className:"submit",type:"submit",disabled:l,children:[l?"Sending...":"Send"," "]})]})]})]})]})}function St(){return i.jsxs("footer",{className:"footer",children:[i.jsxs("div",{className:"footer-icons",children:[i.jsx("a",{href:"https://github.com/HithaHarish",target:"_blank",rel:"noopener noreferrer",children:i.jsx(ve,{})}),i.jsx("a",{href:"https://www.linkedin.com/in/hitha-harish-47b19b29b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bqug3atOmQ0KL81ScPvSt8A%3D%3D",target:"_blank",rel:"noopener noreferrer",children:i.jsx(vt,{})}),i.jsx("a",{href:"mailto:hitha22harish@gmail.com",children:i.jsx(ht,{})})]}),i.jsx("div",{className:"footer-copy",children:"© 2025 Hitha Harish. All rights reserved."})]})}function jt(){return i.jsxs(i.Fragment,{children:[i.jsx(qe,{}),i.jsx("div",{id:"home",children:i.jsx($e,{})}),i.jsx("div",{id:"achievements",children:i.jsx(ot,{})}),i.jsx("div",{id:"skills",children:i.jsx(tt,{})}),i.jsx("div",{id:"experience",children:i.jsx(nt,{})}),i.jsx("div",{id:"projects",children:i.jsx(pt,{})}),i.jsx("div",{id:"certifications",children:i.jsx(yt,{})}),i.jsx("div",{id:"contact",children:i.jsx(bt,{})}),i.jsx("div",{children:i.jsx(St,{})}),i.jsx(Je,{})]})}Ve.createRoot(document.getElementById("root")).render(i.jsx(P.StrictMode,{children:i.jsx(jt,{})}));
