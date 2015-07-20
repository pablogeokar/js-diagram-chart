"use strict";function AntuaneHelper(){this.getRandomInt=function(t,e){return Math.floor(Math.random()*(e-t))+t},this.wrapText=function(t,e,i,o,n,r){for(var a=e.split("\n"),l=0;l<a.length;l++){for(var h="",s=a[l].split(" "),f=0;f<s.length;f++){var d=h+s[f]+" ",g=t.measureText(d),c=g.width;c>n?(t.fillText(h,i,o),h=s[f]+" ",o+=r):h=d}t.fillText(h,i,o),o+=r}},this.colorLuminance=function(t,e){t=String(t).replace(/[^0-9a-f]/gi,""),t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),e=e||0;var i,o,n="#";for(o=0;3>o;o++)i=parseInt(t.substr(2*o,2),16),i=Math.round(Math.min(Math.max(0,i+i*e),255)).toString(16),n+=("00"+i).substr(i.length);return n},this.cloneObj=function(t){if(null==t||"object"!=typeof t)return t;var e=t.constructor();for(var i in t)t.hasOwnProperty(i)&&(e[i]=cloneObj(t[i]));return e},this.getObjById=function(t,e){for(var i=0;i<t.length;i++)if(t[i].id==e)return t[i];return null},this.trackTransforms=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=e.createSVGMatrix();t.getTransform=function(){return i};var o=[],n=t.save;t.save=function(){return o.push(i.translate(0,0)),n.call(t)};var r=t.restore;t.restore=function(){return i=o.pop(),r.call(t)};var a=t.scale;t.scale=function(e,o){return i=i.scaleNonUniform(e,o),a.call(t,e,o)};var l=t.rotate;t.rotate=function(e){return i=i.rotate(180*e/Math.PI),l.call(t,e)};var h=t.translate;t.translate=function(e,o){return i=i.translate(e,o),h.call(t,e,o)};var s=t.transform;t.transform=function(o,n,r,a,l,h){var f=e.createSVGMatrix();return f.a=o,f.b=n,f.c=r,f.d=a,f.e=l,f.f=h,i=i.multiply(f),s.call(t,o,n,r,a,l,h)};var f=t.setTransform;t.setTransform=function(e,o,n,r,a,l){return i.a=e,i.b=o,i.c=n,i.d=r,i.e=a,i.f=l,f.call(t,e,o,n,r,a,l)};var d=e.createSVGPoint();t.transformedPoint=function(t,e){return d.x=t,d.y=e,d.matrixTransform(i.inverse())}}}function AntuaneChart(t){this.init(t),console.log(this)}AntuaneChart.prototype.init=function(t){var e=new AntuaneHelper;if(this.canvas=document.getElementById(t.config.element),!this.canvas)throw"Element not found";this.context=this.canvas.getContext("2d"),this.context=this.canvas.getContext("2d"),e.trackTransforms(this.context),t.config.autoSize&&(this.canvas.width=this.canvas.parentNode.clientWidth,this.canvas.height=this.canvas.parentNode.clientHeight);for(var i=[],o=[],n=0,r=0,a=0;a<t.diagrams.length;a++){for(var l={id:t.diagrams[a].id,x:0,y:0,cx:0,cy:0,text:t.diagrams[a].text,color:t.diagrams[a].color,bgColor:t.diagrams[a].bgColor,parents:[],children:[],virgin:!0,orphan:!0},h=0;h<t.links.length;h++)t.links[h].source==l.id&&(l.parents.push(t.links[h].parent),l.orphan=!1),t.links[h].parent==l.id&&(l.children.push(t.links[h].source),l.orphan=!1);i.push(l)}for(var s=function d(t,o){if(t.virgin){t.virgin=!1,t.y=o,r>o&&(r=o);for(var n=0;n<t.children.length;n++){var a=e.getObjById(i,t.children[n]);d(a,o+1)}for(var n=0;n<t.parents.length;n++){var a=e.getObjById(i,t.parents[n]);d(a,o-1)}}},a=0;a<i.length;a++)s(i[a],0);for(var a=0;a<i.length;a++){var f=e.getObjById(o,i[a].y);null!=f?i[a].orphan||(f.count++,i[a].x=f.count,f.count>n&&(n=f.count)):i[a].orphan||(o.push({id:i[a].y,count:1}),i[a].x=1)}t.config.linesCount=o,t.config.columnsCount=n,t.config.columnLower=r,t.config.scaleFactor=1.1,t.config.zoomScale=0,t.config.moveX=0,t.config.moveY=0,this.helper=e,this.config=t.config,this.diagrams=i,this.draw(),this.events()},AntuaneChart.prototype.zoom=function(t){var e=this.canvas,i=this.context,o=this.config;o.zoomScale+=t;var n=i.transformedPoint(e.width/2,e.height/2);this.context.translate(n.x,n.y);var r=Math.pow(o.scaleFactor,t);i.scale(r,r),i.translate(-n.x,-n.y),this.draw()},AntuaneChart.prototype.rezetZoom=function(){var t=this.config;this.zoom(-t.zoomScale),_context.translate(-t.moveX,-t.moveY),t.zoomScale=0,t.moveX=0,t.moveY=0},AntuaneChart.prototype.events=function(){var t=this,e=this.canvas,i=this.context,o=this.config,n=e.width/2,r=e.height/2,a=!1,l=!1;e.addEventListener("mousedown",function(t){document.body.style.mozUserSelect=document.body.style.webkitUserSelect=document.body.style.userSelect="none",e.style.cursor="move",n=t.offsetX||t.pageX-e.offsetLeft,r=t.offsetY||t.pageY-e.offsetTop,a=i.transformedPoint(n,r),l=!1,t.returnValue=!1},!1),e.addEventListener("mousemove",function(h){if(n=h.offsetX||h.pageX-e.offsetLeft,r=h.offsetY||h.pageY-e.offsetTop,l=!0,a){var s=i.transformedPoint(n,r);i.translate(s.x-a.x,s.y-a.y),t.draw(),o.moveX+=s.x-a.x,o.moveY+=s.y-a.y}},!1),e.addEventListener("mouseup",function(t){a=null,e.style.cursor="default"},!1);var h=function(e){var i=e.wheelDelta?e.wheelDelta/300:e.detail?-e.detail:0;return t.zoom(i),e.preventDefault()&&!1};e.addEventListener("DOMMouseScroll",h,!1),e.addEventListener("mousewheel",h,!1)},AntuaneChart.prototype.draw=function(){var t=this.canvas,e=this.context,i=this.config,o=this.diagrams,n=this.helper,r=e.transformedPoint(0,0),a=e.transformedPoint(t.width,t.height);e.clearRect(r.x,r.y,a.x-r.x,a.y-r.y);var l=i.width+2*i.margin;0==i.columnsCount&&(i.columnsCount=parseInt(t.width/l));var h=i.columnsCount*l,s=parseInt(t.width)/2-h/2;e.rotate(2*Math.PI);for(var f=0,d=0;d<o.length;d++)if(o[d].orphan){var g=s+i.margin+parseInt(f%i.columnsCount)*(i.width+2*i.margin),c=i.margin+parseInt(f/i.columnsCount)*(i.height+2*i.margin),m=e;m.fillStyle=o[d].bgColor,m.fillRect(g,c,i.width,i.height);var u=e;u.fillStyle=o[d].color,u.font=i.fontSize+"px "+i.fontFamily,n.wrapText(e,o[d].text,g+i.padding,c+i.padding+i.fontSize,i.width-2*i.padding,i.fontSize+.2*i.fontSize),f++}var p=i.height+3*i.margin+parseInt((f-1)/i.columnsCount)*(i.height+2*i.margin);isNaN(p)&&(p=i.margin);for(var d=0;d<o.length;d++)if(!o[d].orphan){var v=n.getObjById(i.linesCount,o[d].y).count,w=h/v,g=s+w*o[d].x+(w/2-i.width/2)-w,c=p+Math.abs(i.columnLower)*(i.height+2*i.margin)+o[d].y*(i.height+2*i.margin);o[d].left=g,o[d].top=c}for(var d=0;d<o.length;d++)if(!o[d].orphan)for(var y=0;y<o[d].parents.length;y++){var T=n.getObjById(o,o[d].parents[y]),W=!1,C=!1,b=!1,x=!1,S=!1,P=!1,k=0,L=0;if(o[d].id==T.id?P=!0:o[d].y==T.y?o[d].x-T.x==-1?b=!0:o[d].x-T.x==1?x=!0:C=!0:o[d].y<T.y?W=!0:o[d].y-T.y>1&&(S=!0),P){var z=i.margin/2-i.margin/i.columnsCount*o[d].x;isFinite(z)||(z=0);var I=e;e.setLineDash([0]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(T.left+i.width/2+-1*z+z,T.top+i.height),I.lineTo(T.left+i.width/2+-1*z+z,T.top+i.height+i.margin/2),I.lineTo(T.left+i.width/2+-1*z-z,T.top+i.height+i.margin/2),I.lineTo(T.left+i.width/2+-1*z-z,T.top+i.height+i.arrowWidth/2),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left+i.width/2+-1*z-z,T.top+i.height),M.lineTo(T.left+i.width/2-i.arrowWidth/2+-1*z-z,T.top+i.height+i.arrowWidth),M.lineTo(T.left+i.width/2+i.arrowWidth/2+-1*z-z,T.top+i.height+i.arrowWidth),M.fill()}else if(b){var I=e;e.setLineDash([0]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(o[d].left+i.width/2,o[d].top+i.height/2),I.lineTo(T.left-i.arrowWidth,T.top+i.height/2),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left,T.top+i.height/2),M.lineTo(T.left-i.arrowWidth,T.top+i.height/2-i.arrowWidth/2),M.lineTo(T.left-i.arrowWidth,T.top+i.height/2+i.arrowWidth/2),M.fill()}else if(x){var I=e;e.setLineDash([0]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(o[d].left+i.width/2,o[d].top+i.height/2),I.lineTo(T.left+i.width+i.arrowWidth,T.top+i.height/2),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left+i.width,T.top+i.height/2),M.lineTo(T.left+i.width+i.arrowWidth,T.top+i.height/2-i.arrowWidth/2),M.lineTo(T.left+i.width+i.arrowWidth,T.top+i.height/2+i.arrowWidth/2),M.fill()}else if(C){var z=i.margin/2-i.margin/i.columnsCount*o[d].x;isFinite(z)||(z=0);var I=e;e.setLineDash([0]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(o[d].left+i.width/2+-1*z,o[d].top),I.lineTo(o[d].left+i.width/2+-1*z,o[d].top-i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top-i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top+i.margin-i.arrowWidth),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left+i.width/2-z,T.top),M.lineTo(T.left+i.width/2-i.arrowWidth/2-z,T.top-i.arrowWidth),M.lineTo(T.left+i.width/2+i.arrowWidth/2-z,T.top-i.arrowWidth),M.fill()}else if(W){var z=i.margin/2-i.margin/i.columnsCount*o[d].x+(i.margin-(i.arrowWidth+2*i.lineWidth*L)),I=e;e.setLineDash([2*i.lineWidth]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(o[d].left+i.width/2+z,o[d].top+i.height/2+z),I.lineTo(o[d].left+i.width+i.margin+z,o[d].top+i.height/2+z),I.lineTo(o[d].left+i.width+i.margin+z,T.top-i.margin+z),I.lineTo(T.left+i.width/2+z,T.top-i.margin+z),I.lineTo(T.left+i.width/2+z,T.top-i.arrowWidth+z),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left+i.width/2+z,T.top),M.lineTo(T.left+i.width/2-i.arrowWidth/2+z,T.top-i.arrowWidth),M.lineTo(T.left+i.width/2+i.arrowWidth/2+z,T.top-i.arrowWidth),M.fill()}else if(S){var z=i.margin/2-i.margin/i.columnsCount*o[d].x+(i.margin-(i.arrowWidth+2*i.lineWidth*k));k++,isFinite(z)||(z=0);var I=e;e.setLineDash([2*i.lineWidth]),I.beginPath(),I.strokeStyle=i.lineColor||n.colorLuminance(o[d].bgColor,-.2),I.moveTo(o[d].left+i.width/2+-1*z,o[d].top),I.lineTo(o[d].left+i.width/2+-1*z,o[d].top-i.margin+z),I.lineTo(T.left+i.width/2+-1*z,o[d].top-i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top+i.height+i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top+i.height+i.arrowWidth/2),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||n.colorLuminance(o[d].bgColor,-.2),M.beginPath(),M.moveTo(T.left+i.width/2+-1*z,T.top+i.height),M.lineTo(T.left+i.width/2-i.arrowWidth/2+-1*z,T.top+i.height+i.arrowWidth),M.lineTo(T.left+i.width/2+i.arrowWidth/2+-1*z,T.top+i.height+i.arrowWidth),M.fill()}else{var z=i.margin/2-i.margin/i.columnsCount*o[d].x;isFinite(z)||(z=0);var I=e;e.setLineDash([0]),I.beginPath(),I.strokeStyle=i.lineColor||o[d].bgColor,I.moveTo(o[d].left+i.width/2+-1*z,o[d].top),I.lineTo(o[d].left+i.width/2+-1*z,o[d].top-i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top+i.height+i.margin+z),I.lineTo(T.left+i.width/2+-1*z,T.top+i.height+i.arrowWidth/2),I.lineWidth=i.lineWidth,I.stroke();var M=e;M.fillStyle=i.lineColor||o[d].bgColor,M.beginPath(),M.moveTo(T.left+i.width/2+-1*z,T.top+i.height),M.lineTo(T.left+i.width/2-i.arrowWidth/2+-1*z,T.top+i.height+i.arrowWidth),M.lineTo(T.left+i.width/2+i.arrowWidth/2+-1*z,T.top+i.height+i.arrowWidth),M.fill()}}for(var d=0;d<o.length;d++)if(!o[d].orphan){var g=o[d].left,c=o[d].top,m=e;m.fillStyle=o[d].bgColor,m.fillRect(g,c,i.width,i.height);var u=e;u.fillStyle=o[d].color,u.font=i.fontSize+"px "+i.fontFamily,n.wrapText(e,o[d].text,g+i.padding,c+i.padding+i.fontSize,i.width-2*i.padding,i.fontSize+.2*i.fontSize)}};