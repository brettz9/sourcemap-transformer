!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports["sourcemap-transformer"]=n():e["sourcemap-transformer"]=n()}(global,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n){n.getArg=function(e,n,t){if(n in e)return e[n];if(3===arguments.length)return t;throw new Error('"'+n+'" is a required argument.')};const t=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,r=/^data:.+\,.+$/;function o(e){const n=e.match(t);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){let n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}n.urlParse=o,n.urlGenerate=i;const s=32;const l=function(e){const n=[];return function(t){for(let e=0;e<n.length;e++)if(n[e].input===t){const t=n[0];return n[0]=n[e],n[e]=t,n[0].result}const r=e(t);return n.unshift({input:t,result:r}),n.length>s&&n.pop(),r}}(function(e){let t=e;const r=o(e);if(r){if(!r.path)return e;t=r.path}const s=n.isAbsolute(t),l=[];let a=0,u=0;for(;;){if(a=u,-1===(u=t.indexOf("/",a))){l.push(t.slice(a));break}for(l.push(t.slice(a,u));u<t.length&&"/"===t[u];)u++}let c=0;for(u=l.length-1;u>=0;u--){const e=l[u];"."===e?l.splice(u,1):".."===e?c++:c>0&&(""===e?(l.splice(u+1,c),c=0):(l.splice(u,2),c--))}return""===(t=l.join("/"))&&(t=s?"/":"."),r?(r.path=t,i(r)):t});function a(e,n){""===e&&(e="."),""===n&&(n=".");const t=o(n),s=o(e);if(s&&(e=s.path||"/"),t&&!t.scheme)return s&&(t.scheme=s.scheme),i(t);if(t||n.match(r))return n;if(s&&!s.host&&!s.path)return s.host=n,i(s);const a="/"===n.charAt(0)?n:l(e.replace(/\/+$/,"")+"/"+n);return s?(s.path=a,i(s)):a}n.normalize=l,n.join=a,n.isAbsolute=function(e){return"/"===e.charAt(0)||t.test(e)},n.relative=function(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");let t=0;for(;0!==n.indexOf(e+"/");){const r=e.lastIndexOf("/");if(r<0)return n;if((e=e.slice(0,r)).match(/^([^\/]+:\/)?\/*$/))return n;++t}return Array(t+1).join("../")+n.substr(e.length+1)};const u=!("__proto__"in Object.create(null));function c(e){return e}function g(e){if(!e)return!1;const n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(let t=n-10;t>=0;t--)if(36!==e.charCodeAt(t))return!1;return!0}function p(e,n){return e===n?0:null===e?1:null===n?-1:e>n?1:-1}n.toSetString=u?c:function(e){return g(e)?"$"+e:e},n.fromSetString=u?c:function(e){return g(e)?e.slice(1):e},n.compareByOriginalPositions=function(e,n,t){let r=p(e.source,n.source);return 0!==r?r:0!=(r=e.originalLine-n.originalLine)?r:0!=(r=e.originalColumn-n.originalColumn)||t?r:0!=(r=e.generatedColumn-n.generatedColumn)?r:0!=(r=e.generatedLine-n.generatedLine)?r:p(e.name,n.name)},n.compareByGeneratedPositionsDeflated=function(e,n,t){let r=e.generatedLine-n.generatedLine;return 0!==r?r:0!=(r=e.generatedColumn-n.generatedColumn)||t?r:0!==(r=p(e.source,n.source))?r:0!=(r=e.originalLine-n.originalLine)?r:0!=(r=e.originalColumn-n.originalColumn)?r:p(e.name,n.name)},n.compareByGeneratedPositionsInflated=function(e,n){let t=e.generatedLine-n.generatedLine;return 0!==t?t:0!=(t=e.generatedColumn-n.generatedColumn)?t:0!==(t=p(e.source,n.source))?t:0!=(t=e.originalLine-n.originalLine)?t:0!=(t=e.originalColumn-n.originalColumn)?t:p(e.name,n.name)},n.parseSourceMapInput=function(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))},n.computeSourceURL=function(e,n,t){if(n=n||"",e&&("/"!==e[e.length-1]&&"/"!==n[0]&&(e+="/"),n=e+n),t){const e=o(t);if(!e)throw new Error("sourceMapURL could not be parsed");if(e.path){const n=e.path.lastIndexOf("/");n>=0&&(e.path=e.path.substring(0,n+1))}n=a(i(e),n)}return l(n)}},function(e,n,t){const r=t(2),o=t(0),i=t(3).ArraySet,s=t(11).MappingList;class l{constructor(e){e||(e={}),this._file=o.getArg(e,"file",null),this._sourceRoot=o.getArg(e,"sourceRoot",null),this._skipValidation=o.getArg(e,"skipValidation",!1),this._sources=new i,this._names=new i,this._mappings=new s,this._sourcesContents=null}static fromSourceMap(e){const n=e.sourceRoot,t=new l({file:e.file,sourceRoot:n});return e.eachMapping(function(e){const r={generated:{line:e.generatedLine,column:e.generatedColumn}};null!=e.source&&(r.source=e.source,null!=n&&(r.source=o.relative(n,r.source)),r.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(r.name=e.name)),t.addMapping(r)}),e.sources.forEach(function(r){let i=r;null!==n&&(i=o.relative(n,r)),t._sources.has(i)||t._sources.add(i);const s=e.sourceContentFor(r);null!=s&&t.setSourceContent(r,s)}),t}addMapping(e){const n=o.getArg(e,"generated"),t=o.getArg(e,"original",null);let r=o.getArg(e,"source",null),i=o.getArg(e,"name",null);this._skipValidation||this._validateMapping(n,t,r,i),null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=i&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:null!=t&&t.line,originalColumn:null!=t&&t.column,source:r,name:i})}setSourceContent(e,n){let t=e;null!=this._sourceRoot&&(t=o.relative(this._sourceRoot,t)),null!=n?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[o.toSetString(t)]=n):this._sourcesContents&&(delete this._sourcesContents[o.toSetString(t)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))}applySourceMap(e,n,t){let r=n;if(null==n){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');r=e.file}const s=this._sourceRoot;null!=s&&(r=o.relative(s,r));const l=this._mappings.toArray().length>0?new i:this._sources,a=new i;this._mappings.unsortedForEach(function(n){if(n.source===r&&null!=n.originalLine){const r=e.originalPositionFor({line:n.originalLine,column:n.originalColumn});null!=r.source&&(n.source=r.source,null!=t&&(n.source=o.join(t,n.source)),null!=s&&(n.source=o.relative(s,n.source)),n.originalLine=r.line,n.originalColumn=r.column,null!=r.name&&(n.name=r.name))}const i=n.source;null==i||l.has(i)||l.add(i);const u=n.name;null==u||a.has(u)||a.add(u)},this),this._sources=l,this._names=a,e.sources.forEach(function(n){const r=e.sourceContentFor(n);null!=r&&(null!=t&&(n=o.join(t,n)),null!=s&&(n=o.relative(s,n)),this.setSourceContent(n,r))},this)}_validateMapping(e,n,t,r){if(n&&"number"!=typeof n.line&&"number"!=typeof n.column)throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!n&&!t&&!r);else if(!(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&t))throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:t,original:n,name:r}))}_serializeMappings(){let e,n,t,i,s=0,l=1,a=0,u=0,c=0,g=0,p="";const h=this._mappings.toArray();for(let m=0,d=h.length;m<d;m++){if(e="",(n=h[m]).generatedLine!==l)for(s=0;n.generatedLine!==l;)e+=";",l++;else if(m>0){if(!o.compareByGeneratedPositionsInflated(n,h[m-1]))continue;e+=","}e+=r.encode(n.generatedColumn-s),s=n.generatedColumn,null!=n.source&&(i=this._sources.indexOf(n.source),e+=r.encode(i-g),g=i,e+=r.encode(n.originalLine-1-u),u=n.originalLine-1,e+=r.encode(n.originalColumn-a),a=n.originalColumn,null!=n.name&&(t=this._names.indexOf(n.name),e+=r.encode(t-c),c=t)),p+=e}return p}_generateSourcesContent(e,n){return e.map(function(e){if(!this._sourcesContents)return null;null!=n&&(e=o.relative(n,e));const t=o.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,t)?this._sourcesContents[t]:null},this)}toJSON(){const e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e}toString(){return JSON.stringify(this.toJSON())}}l.prototype._version=3,n.SourceMapGenerator=l},function(e,n,t){const r=t(10);n.encode=function(e){let n,t="",o=function(e){return e<0?1+(-e<<1):0+(e<<1)}(e);do{n=31&o,(o>>>=5)>0&&(n|=32),t+=r.encode(n)}while(o>0);return t}},function(e,n){class t{constructor(){this._array=[],this._set=new Map}static fromArray(e,n){const r=new t;for(let t=0,o=e.length;t<o;t++)r.add(e[t],n);return r}size(){return this._set.size}add(e,n){const t=this.has(e),r=this._array.length;t&&!n||this._array.push(e),t||this._set.set(e,r)}has(e){return this._set.has(e)}indexOf(e){const n=this._set.get(e);if(n>=0)return n;throw new Error('"'+e+'" is not in the set.')}at(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)}toArray(){return this._array.slice()}}n.ArraySet=t},function(e,n,t){(function(n){if("function"==typeof fetch){let n=null;e.exports=function(){if("string"!=typeof n)throw new Error("You must provide the URL of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer");return fetch(n).then(e=>e.arrayBuffer())},e.exports.initialize=(e=>n=e)}else{const r=t(5),o=t(6);e.exports=function(){return new Promise((e,t)=>{const i=o.join(n,"mappings.wasm");r.readFile(i,null,(n,r)=>{n?t(n):e(r.buffer)})})},e.exports.initialize=(e=>{console.debug("SourceMapConsumer.initialize is a no-op when running in node.js")})}}).call(this,"/")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("path")},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.emptyCache=a,n.transformSourceMapString=u,n.createSourceMapTransformer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=new r.default.Transform({objectMode:!0});return n._transform=function(n,t,r){var o=u(n.toString(),e);this.push(o),r()},n._flush=function(n){e.emptyCache&&a(),n()},n};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(8)),o=t(9),i=t(16),s=t(17);var l={};function a(){l={}}function u(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.newFileRegex,a=void 0===r?s.defaultNewFileRegex:r,u=t.prevFileRegex,c=void 0===u?s.defaultPrevFileRegex:u,g=t.newFileFormattingSpaces,p=void 0===g?s.defaultNewFileFormattingSpaces:g,h=t.newFilePath,m=void 0===h?s.defaultNewFilePath:h,d=t.newFileLineNumber,f=void 0===d?s.defaultNewFileLineNumber:d,_=t.newFileColumnNumber,C=void 0===_?s.defaultNewFileColumnNumber:_,w=t.prevFileFormattingSpaces,S=void 0===w?s.defaultPrevFileFormattingSpaces:w,b=t.prevFileLineNumber,y=void 0===b?s.defaultPrevFileLineNumber:b,M=t.prevFileColumnNumber,L=void 0===M?s.defaultPrevFileColumnNumber:M,E=t.originalPositionString,A=void 0===E?s.defaultOriginalPositionString:E,R=t.cache,v=void 0===R||R;return e.split("\n").map(function(e){if(a.test(e)){var t=e.match(a),r=p(t),s=m(t),u=f(t),g=C(t);try{if(l[s]&&v)n=l[s];else{var h=(0,i.getRawSourceMap)(s);n=new o.SourceMapConsumer(h),l[s]=n}var d=n.originalPositionFor({line:u,column:g});return A(r,d,e,t)}catch(n){return A(r,{},e,t)}}if(c.test(e)&&n){var _=e.match(c),w=S(_),b=y(_),M=L(_),E=n.originalPositionFor({line:b,column:M});return A(w,E,e,_,!0)}return e}).join("\n")}},function(e,n){e.exports=require("stream")},function(e,n,t){n.SourceMapGenerator=t(1).SourceMapGenerator,n.SourceMapConsumer=t(12).SourceMapConsumer,n.SourceNode=t(15).SourceNode},function(e,n){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");n.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)}},function(e,n,t){const r=t(0);n.MappingList=class{constructor(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}unsortedForEach(e,n){this._array.forEach(e,n)}add(e){!function(e,n){const t=e.generatedLine,o=n.generatedLine,i=e.generatedColumn,s=n.generatedColumn;return o>t||o==t&&s>=i||r.compareByGeneratedPositionsInflated(e,n)<=0}(this._last,e)?(this._sorted=!1,this._array.push(e)):(this._last=e,this._array.push(e))}toArray(){return this._sorted||(this._array.sort(r.compareByGeneratedPositionsInflated),this._sorted=!0),this._array}}},function(e,n,t){const r=t(0),o=t(13),i=t(3).ArraySet,s=(t(2),t(4)),l=t(14),a=Symbol("smcInternal");class u{constructor(e,n){return e==a?Promise.resolve(this):function(e,n){let t=e;"string"==typeof e&&(t=r.parseSourceMapInput(e));const o=null!=t.sections?new g(t,n):new c(t,n);return Promise.resolve(o)}(e,n)}static initialize(e){s.initialize(e["lib/mappings.wasm"])}static fromSourceMap(e,n){return function(e,n){return c.fromSourceMap(e,n)}(e,n)}static with(e,n,t){let r=null;return new u(e,n).then(e=>(r=e,t(e))).then(e=>(r&&r.destroy(),e),e=>{throw r&&r.destroy(),e})}_parseMappings(e,n){throw new Error("Subclasses must implement _parseMappings")}eachMapping(e,n,t){throw new Error("Subclasses must implement eachMapping")}allGeneratedPositionsFor(e){throw new Error("Subclasses must implement allGeneratedPositionsFor")}destroy(){throw new Error("Subclasses must implement destroy")}}u.prototype._version=3,u.GENERATED_ORDER=1,u.ORIGINAL_ORDER=2,u.GREATEST_LOWER_BOUND=1,u.LEAST_UPPER_BOUND=2,n.SourceMapConsumer=u;class c extends u{constructor(e,n){return super(a).then(t=>{let o=e;"string"==typeof e&&(o=r.parseSourceMapInput(e));const s=r.getArg(o,"version");let a=r.getArg(o,"sources");const u=r.getArg(o,"names",[]);let c=r.getArg(o,"sourceRoot",null);const g=r.getArg(o,"sourcesContent",null),p=r.getArg(o,"mappings"),h=r.getArg(o,"file",null);if(s!=t._version)throw new Error("Unsupported version: "+s);return c&&(c=r.normalize(c)),a=a.map(String).map(r.normalize).map(function(e){return c&&r.isAbsolute(c)&&r.isAbsolute(e)?r.relative(c,e):e}),t._names=i.fromArray(u.map(String),!0),t._sources=i.fromArray(a,!0),t._absoluteSources=t._sources.toArray().map(function(e){return r.computeSourceURL(c,e,n)}),t.sourceRoot=c,t.sourcesContent=g,t._mappings=p,t._sourceMapURL=n,t.file=h,t._computedColumnSpans=!1,t._mappingsPtr=0,t._wasm=null,l().then(e=>(t._wasm=e,t))})}_findSourceIndex(e){let n=e;if(null!=this.sourceRoot&&(n=r.relative(this.sourceRoot,n)),this._sources.has(n))return this._sources.indexOf(n);for(let n=0;n<this._absoluteSources.length;++n)if(this._absoluteSources[n]==e)return n;return-1}static fromSourceMap(e,n){return new c(e.toString())}get sources(){return this._absoluteSources.slice()}_getMappingsPtr(){return 0===this._mappingsPtr&&this._parseMappings(this._mappings,this.sourceRoot),this._mappingsPtr}_parseMappings(e,n){const t=e.length,r=this._wasm.exports.allocate_mappings(t),o=new Uint8Array(this._wasm.exports.memory.buffer,r,t);for(let n=0;n<t;n++)o[n]=e.charCodeAt(n);const i=this._wasm.exports.parse_mappings(r);if(!i){const e=this._wasm.exports.get_last_error();let n=`Error parsing mappings (code ${e}): `;switch(e){case 1:n+="the mappings contained a negative line, column, source index, or name index";break;case 2:n+="the mappings contained a number larger than 2**32";break;case 3:n+="reached EOF while in the middle of parsing a VLQ";break;case 4:n+="invalid base 64 character while parsing a VLQ";break;default:n+="unknown error code"}throw new Error(n)}this._mappingsPtr=i}eachMapping(e,n,t){const o=n||null,i=t||u.GENERATED_ORDER,s=this.sourceRoot;this._wasm.withMappingCallback(n=>{null!==n.source&&(n.source=this._sources.at(n.source),n.source=r.computeSourceURL(s,n.source,this._sourceMapURL),null!==n.name&&(n.name=this._names.at(n.name))),e.call(o,n)},()=>{switch(i){case u.GENERATED_ORDER:this._wasm.exports.by_generated_location(this._getMappingsPtr());break;case u.ORIGINAL_ORDER:this._wasm.exports.by_original_location(this._getMappingsPtr());break;default:throw new Error("Unknown order of iteration.")}})}allGeneratedPositionsFor(e){let n=r.getArg(e,"source");const t=r.getArg(e,"line"),o=e.column||0;if((n=this._findSourceIndex(n))<0)return[];if(t<1)throw new Error("Line numbers must be >= 1");if(o<0)throw new Error("Column numbers must be >= 0");const i=[];return this._wasm.withMappingCallback(e=>{let n=e.lastGeneratedColumn;this._computedColumnSpans&&null===n&&(n=1/0),i.push({line:e.generatedLine,column:e.generatedColumn,lastColumn:n})},()=>{this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(),n,t-1,"column"in e,o)}),i}destroy(){0!==this._mappingsPtr&&(this._wasm.exports.free_mappings(this._mappingsPtr),this._mappingsPtr=0)}computeColumnSpans(){this._computedColumnSpans||(this._wasm.exports.compute_column_spans(this._getMappingsPtr()),this._computedColumnSpans=!0)}originalPositionFor(e){const n={generatedLine:r.getArg(e,"line"),generatedColumn:r.getArg(e,"column")};if(n.generatedLine<1)throw new Error("Line numbers must be >= 1");if(n.generatedColumn<0)throw new Error("Column numbers must be >= 0");let t,o=r.getArg(e,"bias",u.GREATEST_LOWER_BOUND);if(null==o&&(o=u.GREATEST_LOWER_BOUND),this._wasm.withMappingCallback(e=>t=e,()=>{this._wasm.exports.original_location_for(this._getMappingsPtr(),n.generatedLine-1,n.generatedColumn,o)}),t&&t.generatedLine===n.generatedLine){let e=r.getArg(t,"source",null);null!==e&&(e=this._sources.at(e),e=r.computeSourceURL(this.sourceRoot,e,this._sourceMapURL));let n=r.getArg(t,"name",null);return null!==n&&(n=this._names.at(n)),{source:e,line:r.getArg(t,"originalLine",null),column:r.getArg(t,"originalColumn",null),name:n}}return{source:null,line:null,column:null,name:null}}hasContentsOfAllSources(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))}sourceContentFor(e,n){if(!this.sourcesContent)return null;const t=this._findSourceIndex(e);if(t>=0)return this.sourcesContent[t];let o,i=e;if(null!=this.sourceRoot&&(i=r.relative(this.sourceRoot,i)),null!=this.sourceRoot&&(o=r.urlParse(this.sourceRoot))){const e=i.replace(/^file:\/\//,"");if("file"==o.scheme&&this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];if((!o.path||"/"==o.path)&&this._sources.has("/"+i))return this.sourcesContent[this._sources.indexOf("/"+i)]}if(n)return null;throw new Error('"'+i+'" is not in the SourceMap.')}generatedPositionFor(e){let n=r.getArg(e,"source");if((n=this._findSourceIndex(n))<0)return{line:null,column:null,lastColumn:null};const t={source:n,originalLine:r.getArg(e,"line"),originalColumn:r.getArg(e,"column")};if(t.originalLine<1)throw new Error("Line numbers must be >= 1");if(t.originalColumn<0)throw new Error("Column numbers must be >= 0");let o,i=r.getArg(e,"bias",u.GREATEST_LOWER_BOUND);if(null==i&&(i=u.GREATEST_LOWER_BOUND),this._wasm.withMappingCallback(e=>o=e,()=>{this._wasm.exports.generated_location_for(this._getMappingsPtr(),t.source,t.originalLine-1,t.originalColumn,i)}),o&&o.source===t.source){let e=o.lastGeneratedColumn;return this._computedColumnSpans&&null===e&&(e=1/0),{line:r.getArg(o,"generatedLine",null),column:r.getArg(o,"generatedColumn",null),lastColumn:e}}return{line:null,column:null,lastColumn:null}}}c.prototype.consumer=u,n.BasicSourceMapConsumer=c;class g extends u{constructor(e,n){return super(a).then(t=>{let o=e;"string"==typeof e&&(o=r.parseSourceMapInput(e));const s=r.getArg(o,"version"),l=r.getArg(o,"sections");if(s!=t._version)throw new Error("Unsupported version: "+s);t._sources=new i,t._names=new i,t.__generatedMappings=null,t.__originalMappings=null,t.__generatedMappingsUnsorted=null,t.__originalMappingsUnsorted=null;let a={line:-1,column:0};return Promise.all(l.map(e=>{if(e.url)throw new Error("Support for url field in sections not implemented.");const t=r.getArg(e,"offset"),o=r.getArg(t,"line"),i=r.getArg(t,"column");if(o<a.line||o===a.line&&i<a.column)throw new Error("Section offsets must be ordered and non-overlapping.");return a=t,new u(r.getArg(e,"map"),n).then(e=>({generatedOffset:{generatedLine:o+1,generatedColumn:i+1},consumer:e}))})).then(e=>(t._sections=e,t))})}get _generatedMappings(){return this.__generatedMappings||this._sortGeneratedMappings(),this.__generatedMappings}get _originalMappings(){return this.__originalMappings||this._sortOriginalMappings(),this.__originalMappings}get _generatedMappingsUnsorted(){return this.__generatedMappingsUnsorted||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappingsUnsorted}get _originalMappingsUnsorted(){return this.__originalMappingsUnsorted||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappingsUnsorted}_sortGeneratedMappings(){const e=this._generatedMappingsUnsorted;e.sort(r.compareByGeneratedPositionsDeflated),this.__generatedMappings=e}_sortOriginalMappings(){const e=this._originalMappingsUnsorted;e.sort(r.compareByOriginalPositions),this.__originalMappings=e}get sources(){const e=[];for(let n=0;n<this._sections.length;n++)for(let t=0;t<this._sections[n].consumer.sources.length;t++)e.push(this._sections[n].consumer.sources[t]);return e}originalPositionFor(e){const n={generatedLine:r.getArg(e,"line"),generatedColumn:r.getArg(e,"column")},t=o.search(n,this._sections,function(e,n){const t=e.generatedLine-n.generatedOffset.generatedLine;return t||e.generatedColumn-n.generatedOffset.generatedColumn}),i=this._sections[t];return i?i.consumer.originalPositionFor({line:n.generatedLine-(i.generatedOffset.generatedLine-1),column:n.generatedColumn-(i.generatedOffset.generatedLine===n.generatedLine?i.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}}hasContentsOfAllSources(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})}sourceContentFor(e,n){for(let n=0;n<this._sections.length;n++){const t=this._sections[n].consumer.sourceContentFor(e,!0);if(t)return t}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')}generatedPositionFor(e){for(let n=0;n<this._sections.length;n++){const t=this._sections[n];if(-1===t.consumer._findSourceIndex(r.getArg(e,"source")))continue;const o=t.consumer.generatedPositionFor(e);if(o){return{line:o.line+(t.generatedOffset.generatedLine-1),column:o.column+(t.generatedOffset.generatedLine===o.line?t.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}}_parseMappings(e,n){const t=this.__generatedMappingsUnsorted=[],o=this.__originalMappingsUnsorted=[];for(let e=0;e<this._sections.length;e++){const n=this._sections[e],i=[];n.consumer.eachMapping(e=>i.push(e));for(let e=0;e<i.length;e++){const s=i[e];let l=r.computeSourceURL(n.consumer.sourceRoot,null,this._sourceMapURL);this._sources.add(l),l=this._sources.indexOf(l);let a=null;s.name&&(this._names.add(s.name),a=this._names.indexOf(s.name));const u={source:l,generatedLine:s.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:s.generatedColumn+(n.generatedOffset.generatedLine===s.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:s.originalLine,originalColumn:s.originalColumn,name:a};t.push(u),"number"==typeof u.originalLine&&o.push(u)}}}eachMapping(e,n,t){const o=n||null;let i;switch(t||u.GENERATED_ORDER){case u.GENERATED_ORDER:i=this._generatedMappings;break;case u.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}const s=this.sourceRoot;i.map(function(e){let n=null;return null!==e.source&&(n=this._sources.at(e.source),n=r.computeSourceURL(s,n,this._sourceMapURL)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,o)}_findMapping(e,n,t,r,i,s){if(e[t]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[t]);if(e[r]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[r]);return o.search(e,n,i,s)}allGeneratedPositionsFor(e){const n=r.getArg(e,"line"),t={source:r.getArg(e,"source"),originalLine:n,originalColumn:r.getArg(e,"column",0)};if(t.source=this._findSourceIndex(t.source),t.source<0)return[];if(t.originalLine<1)throw new Error("Line numbers must be >= 1");if(t.originalColumn<0)throw new Error("Column numbers must be >= 0");const i=[];let s=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",r.compareByOriginalPositions,o.LEAST_UPPER_BOUND);if(s>=0){let t=this._originalMappings[s];if(void 0===e.column){const e=t.originalLine;for(;t&&t.originalLine===e;){let e=t.lastGeneratedColumn;this._computedColumnSpans&&null===e&&(e=1/0),i.push({line:r.getArg(t,"generatedLine",null),column:r.getArg(t,"generatedColumn",null),lastColumn:e}),t=this._originalMappings[++s]}}else{const e=t.originalColumn;for(;t&&t.originalLine===n&&t.originalColumn==e;){let e=t.lastGeneratedColumn;this._computedColumnSpans&&null===e&&(e=1/0),i.push({line:r.getArg(t,"generatedLine",null),column:r.getArg(t,"generatedColumn",null),lastColumn:e}),t=this._originalMappings[++s]}}}return i}destroy(){for(let e=0;e<this._sections.length;e++)this._sections[e].consumer.destroy()}}n.IndexedSourceMapConsumer=g},function(e,n){n.GREATEST_LOWER_BOUND=1,n.LEAST_UPPER_BOUND=2,n.search=function(e,t,r,o){if(0===t.length)return-1;let i=function e(t,r,o,i,s,l){const a=Math.floor((r-t)/2)+t,u=s(o,i[a],!0);return 0===u?a:u>0?r-a>1?e(a,r,o,i,s,l):l==n.LEAST_UPPER_BOUND?r<i.length?r:-1:a:a-t>1?e(t,a,o,i,s,l):l==n.LEAST_UPPER_BOUND?a:t<0?-1:t}(-1,t.length,e,t,r,o||n.GREATEST_LOWER_BOUND);if(i<0)return-1;for(;i-1>=0&&0===r(t[i],t[i-1],!0);)--i;return i}},function(e,n,t){const r=t(4);let o=null;e.exports=function(){if(o)return o;const e=[];return o=r().then(n=>WebAssembly.instantiate(n,{env:{mapping_callback(n,t,r,o,i,s,l,a,u,c){const g=new function(){this.generatedLine=0,this.generatedColumn=0,this.lastGeneratedColumn=null,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null};g.generatedLine=n+1,g.generatedColumn=t,r&&(g.lastGeneratedColumn=o-1),i&&(g.source=s,g.originalLine=l+1,g.originalColumn=a,u&&(g.name=c)),e[e.length-1](g)},start_all_generated_locations_for(){console.time("all_generated_locations_for")},end_all_generated_locations_for(){console.timeEnd("all_generated_locations_for")},start_compute_column_spans(){console.time("compute_column_spans")},end_compute_column_spans(){console.timeEnd("compute_column_spans")},start_generated_location_for(){console.time("generated_location_for")},end_generated_location_for(){console.timeEnd("generated_location_for")},start_original_location_for(){console.time("original_location_for")},end_original_location_for(){console.timeEnd("original_location_for")},start_parse_mappings(){console.time("parse_mappings")},end_parse_mappings(){console.timeEnd("parse_mappings")},start_sort_by_generated_location(){console.time("sort_by_generated_location")},end_sort_by_generated_location(){console.timeEnd("sort_by_generated_location")},start_sort_by_original_location(){console.time("sort_by_original_location")},end_sort_by_original_location(){console.timeEnd("sort_by_original_location")}}})).then(n=>({exports:n.instance.exports,withMappingCallback:(n,t)=>{e.push(n);try{t()}finally{e.pop()}}})).then(null,e=>{throw o=null,e})}},function(e,n,t){const r=t(1).SourceMapGenerator,o=t(0),i=/(\r?\n)/,s=10,l="$$$isSourceNode$$$";class a{constructor(e,n,t,r,o){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==n?null:n,this.source=null==t?null:t,this.name=null==o?null:o,this[l]=!0,null!=r&&this.add(r)}static fromStringWithSourceMap(e,n,t){const r=new a,s=e.split(i);let l=0;const u=function(){return e()+(e()||"");function e(){return l<s.length?s[l++]:void 0}};let c,g=1,p=0,h=null;return n.eachMapping(function(e){if(null!==h){if(!(g<e.generatedLine)){const n=(c=s[l]||"").substr(0,e.generatedColumn-p);return s[l]=c.substr(e.generatedColumn-p),p=e.generatedColumn,m(h,n),void(h=e)}m(h,u()),g++,p=0}for(;g<e.generatedLine;)r.add(u()),g++;p<e.generatedColumn&&(c=s[l]||"",r.add(c.substr(0,e.generatedColumn)),s[l]=c.substr(e.generatedColumn),p=e.generatedColumn),h=e},this),l<s.length&&(h&&m(h,u()),r.add(s.splice(l).join(""))),n.sources.forEach(function(e){const i=n.sourceContentFor(e);null!=i&&(null!=t&&(e=o.join(t,e)),r.setSourceContent(e,i))}),r;function m(e,n){if(null===e||void 0===e.source)r.add(n);else{const i=t?o.join(t,e.source):e.source;r.add(new a(e.originalLine,e.originalColumn,i,n,e.name))}}}add(e){if(Array.isArray(e))e.forEach(function(e){this.add(e)},this);else{if(!e[l]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this}prepend(e){if(Array.isArray(e))for(let n=e.length-1;n>=0;n--)this.prepend(e[n]);else{if(!e[l]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this}walk(e){let n;for(let t=0,r=this.children.length;t<r;t++)(n=this.children[t])[l]?n.walk(e):""!==n&&e(n,{source:this.source,line:this.line,column:this.column,name:this.name})}join(e){let n,t;const r=this.children.length;if(r>0){for(n=[],t=0;t<r-1;t++)n.push(this.children[t]),n.push(e);n.push(this.children[t]),this.children=n}return this}replaceRight(e,n){const t=this.children[this.children.length-1];return t[l]?t.replaceRight(e,n):"string"==typeof t?this.children[this.children.length-1]=t.replace(e,n):this.children.push("".replace(e,n)),this}setSourceContent(e,n){this.sourceContents[o.toSetString(e)]=n}walkSourceContents(e){for(let n=0,t=this.children.length;n<t;n++)this.children[n][l]&&this.children[n].walkSourceContents(e);const n=Object.keys(this.sourceContents);for(let t=0,r=n.length;t<r;t++)e(o.fromSetString(n[t]),this.sourceContents[n[t]])}toString(){let e="";return this.walk(function(n){e+=n}),e}toStringWithSourceMap(e){const n={code:"",line:1,column:0},t=new r(e);let o=!1,i=null,l=null,a=null,u=null;return this.walk(function(e,r){n.code+=e,null!==r.source&&null!==r.line&&null!==r.column?(i===r.source&&l===r.line&&a===r.column&&u===r.name||t.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:n.line,column:n.column},name:r.name}),i=r.source,l=r.line,a=r.column,u=r.name,o=!0):o&&(t.addMapping({generated:{line:n.line,column:n.column}}),i=null,o=!1);for(let l=0,a=e.length;l<a;l++)e.charCodeAt(l)===s?(n.line++,n.column=0,l+1===a?(i=null,o=!1):o&&t.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:n.line,column:n.column},name:r.name})):n.column++}),this.walkSourceContents(function(e,n){t.setSourceContent(e,n)}),{code:n.code,map:t}}}n.SourceNode=a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getRawSourceMap=function(e){var n=i(e).split(/\n/),t=n.pop();for(;new RegExp("^\\s*$").test(t);)t=n.pop();var o,s=/^\/\/#\s*sourceMappingURL=(.+)$/.exec(t),l=s&&s[1];o=l?/^data:application\/json/.test(l)?function(e){var n=/^(?:;charset=utf-8)?;base64,/;if(n.test(e)){var t=Buffer.from(e.slice(e.match(n)[0].length),"base64");return t.toString()}return decodeURIComponent(e)}(l.slice("data:application/json".length)):i(r.default.resolve(r.default.dirname(e),l)):i(e+".map");return JSON.parse(o)};var r=function(e){return e&&e.__esModule?e:{default:e}}(t(6));var o=t(5);function i(e){return o.readFileSync(e).toString()}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.defaultNewFileFormattingSpaces=function(e){return e[1]||""},n.defaultNewFilePath=function(e){return e[2]},n.defaultNewFileLineNumber=function(e){return parseInt(e[3],10)},n.defaultNewFileColumnNumber=function(e){return 0},n.defaultPrevFileFormattingSpaces=function(e){return e[1]||""},n.defaultPrevFileLineNumber=function(e){return parseInt(e[2],10)},n.defaultPrevFileColumnNumber=function(e){return 0},n.defaultOriginalPositionString=function(e,n,t){if(n.source)return e+n.source+":"+n.line+":"+n.column;return t};n.defaultNewFileRegex=/^(\s*)at file:\/\/(.+):(\d+)/,n.defaultPrevFileRegex=/^(\s*)at.*:(\d+)/}])});
//# sourceMappingURL=sourcemap-transformer.js.map