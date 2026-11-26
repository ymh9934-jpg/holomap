const fs=require('fs');const T='node_modules/three/';
const libs=['build/three.min.js','examples/js/controls/OrbitControls.js','examples/js/shaders/CopyShader.js','examples/js/shaders/LuminosityHighPassShader.js','examples/js/postprocessing/EffectComposer.js','examples/js/postprocessing/Pass.js','examples/js/postprocessing/RenderPass.js','examples/js/postprocessing/ShaderPass.js','examples/js/postprocessing/MaskPass.js','examples/js/postprocessing/UnrealBloomPass.js'].filter(f=>fs.existsSync(T+f));
const js=libs.map(f=>'<script>'+fs.readFileSync(T+f,'utf8').replace(/<\/script/g,'<\\/script')+'</script>').join('\n');
const src=fs.readFileSync('web-app.html','utf8').replace(/__VER__/g,'1.0.'+(process.env.BUILD_NUMBER||'0'));const out=process.argv[2]||'dist/index.html';fs.mkdirSync(require('path').dirname(out),{recursive:true});
fs.writeFileSync(out,src.replace('<!--LIBS-->',()=>js));console.log(libs.length,'libs',fs.statSync(out).size);
