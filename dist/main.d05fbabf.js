parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"d6sW":[function(require,module,exports) {
new Chart(document.getElementById("energyProduction"),{type:"line",data:{labels:[1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],datasets:[{data:[86,114,106,106,107,111,133,221,783,2478],label:"Africa",borderColor:"#3e95cd",fill:!1},{data:[282,350,411,502,635,809,947,1402,3700,5267],label:"Asia",borderColor:"#8e5ea2",fill:!1},{data:[168,170,178,190,203,276,408,547,675,734],label:"Europe",borderColor:"#3cba9f",fill:!1},{data:[40,20,10,16,24,38,74,167,508,784],label:"Latin America",borderColor:"#e8c3b9",fill:!1},{data:[6,3,2,2,7,26,82,172,312,433],label:"North America",borderColor:"#c45850",fill:!1}]},options:{title:{display:!0,text:"World population per region (in millions)"}}});
},{}]},{},["d6sW"], null)
//# sourceMappingURL=/main.d05fbabf.js.map