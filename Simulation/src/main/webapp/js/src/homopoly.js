var Homopoly=Block.plugin(function(Block,Snap){
function Homopoly(){
	this.id="hm"+(++_idx);
	this.block=Block.homopoly.use().attr({id:this.id});
	this._rect=Block.homopoly.select("rect");
	
	this._a=1.0;
	this._b=1.0;
	this._c=1.0;
	
	this.type='homopoly';
	this.lines=[];
}

Homopoly.prototype=new RectangleBase;
Homopoly.prototype.constructor=Homopoly;

var _idx=0,
	proto=Homopoly.prototype,
	config=Block._.config;

Block.createHomopoly=function(){
	return new Homopoly;
};

Block.homopoly=null;

Block._predefHomopoly=function(svg){
	var block_defs=''+
		'<defs id="MathJax_SVG_glyphs">'+
		'   <path stroke-width="1" id="homopoly-thi-61" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"></path>'+
		'   <path stroke-width="1" id="homopoly-in-28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path>'+
		'   <path stroke-width="1" id="homopoly-in-31" d="M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"></path>'+
		'   <path stroke-width="1" id="homopoly-in-2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path>'+
		'   <path stroke-width="1" id="homopoly-thi-62" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"></path>'+
		'   <path stroke-width="1" id="homopoly-thi-73" d="M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z"></path>'+
		'   <path stroke-width="1" id="homopoly-in-29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"></path>'+
		'   <path stroke-width="1" id="homopoly-thi-63" d="M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z"></path>'+
		'</defs>';
	var paths=Snap.parse(block_defs).selectAll("path");
	paths.forEach(function(path){
		svg.append(path);
		path.toDefs();
	});

	var homopolySvg=''+
		'<g>'+
		'  <rect x="0" y="0" width="59" height="35" style="" fill="#ffffff" stroke="#000000" stroke-width="2"/>'+
		'<svg transform="scale(0.65) translate(3,3)" width="9.966ex" height="5.569ex" style="vertical-align: -1.974ex;" viewbox="0 -1548 4290.9 2397.8" role="img" focusable="false" aria-hidden="true">'+
		'   <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)">'+
		'    <g transform="translate(120,0)">'+
		'     <rect stroke="none" width="4050" height="60" x="0" y="220"></rect>'+
		'     <g transform="translate(60,715)">'+
		'      <use xlink:href="#homopoly-thi-61" x="0" y="0"></use>'+
		'      <use xlink:href="#homopoly-in-28" x="529" y="0"></use>'+
		'      <use xlink:href="#homopoly-in-31" x="919" y="0"></use>'+
		'      <use xlink:href="#homopoly-in-2B" x="1641" y="0"></use>'+
		'      <use xlink:href="#homopoly-thi-62" x="2642" y="0"></use>'+
		'      <use xlink:href="#homopoly-thi-73" x="3071" y="0"></use>'+
		'      <use xlink:href="#homopoly-in-29" x="3541" y="0"></use>'+
		'     </g>'+
		'     <g transform="translate(712,-686)">'+
		'      <use xlink:href="#homopoly-in-31" x="0" y="0"></use>'+
		'      <use xlink:href="#homopoly-in-2B" x="722" y="0"></use>'+
		'      <use xlink:href="#homopoly-thi-63" x="1723" y="0"></use>'+
		'      <use xlink:href="#homopoly-thi-73" x="2156" y="0"></use>'+
		'     </g>'+
		'    </g>'+
		'   </g>'+
		'</svg>'+
		'</g>',
		homopoly=Snap.parse(homopolySvg).select("g");
	svg.append(homopoly);
	Block.homopoly=homopoly.toDefs();
};

proto.toModel=function(){
	return {type:this.type,a: this._a,b:this._b,c:this._c};
};

proto.getConfig=function(){
	// config: id, name, value, type
	var configs=[];
	configs.push(config('id','id',this.id,configTypes.TEXT_TYPE));
	configs.push(config('_a','a',this._a,configTypes.INPUT_TYPE));
	configs.push(config('_b','b',this._b,configTypes.INPUT_TYPE));
	configs.push(config('_c','c',this._c,configTypes.INPUT_TYPE));
	return configs;
};

proto.updateConfig=function(){
	var configs=this.config.configs;
	this._a=configs[1].value;
	this._b=configs[2].value;
	this._c=configs[3].value;
};

return Homopoly;
});