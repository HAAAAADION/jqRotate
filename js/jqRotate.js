;(function($, window, document, undefined){
	var defaults = {
		time_limit: 10,
		totalAngle: 0,
		ednSpeed: 'fast',
		rate: Math.PI,
	};

	var global = {
		txz: 360,
	};

	$.fn.rotationDegrees = function(){
		var matrix = this.css("-webkit-transform") || this.css("-moz-transform") || this.css("-ms-transform") || this.css("-o-transform") || this.css("transform");
		if(typeof matrix === 'string' && matrix !== 'none'){
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];

			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

			angle = angle < 0 ? 360 + angle : angle;
		}else{
			var angle = 0;
		}
		return angle;
	};

	$.fn.jqRotate = function(_aoConfig, callback){
		var $this = $(this),
			options = $.extend({}, defaults, _aoConfig);

		for (var i = 0; i < $this.length; i++){
			var element = $this.get(i);
			if (!element.Wilq32){
				element.Wilq32 = new rotates(element, options, callback);
			}else{
				element.Wilq32._handleRotation(element, options, callback);
			}
		};
	}

	var rotates = function(element, _aoConfig, callback){
		this._handleRotation(element, _aoConfig, callback);
	}

	rotates.prototype = {
		starts: function(){
			if (!this.runsKey) return false;
			if (this._timer) clearTimeout(this._timer);

			this.rota = $(this.element).rotationDegrees();
			this.totalAngle =  this._aoConfig.totalAngle - this.rota;

			this.runs(this.rota, this.totalAngle, global.txz);
		},

		runs: function(rota, rotaNum, txz){
			var $this = this;
			
			var e = rotaNum / txz * this._aoConfig.rate;

			txz = this._aoConfig.ednSpeed === 'fast' ? --txz : txz;

			rota = (rota + e) % 360;

			rotaNum -= e;

			if (Math.round(rotaNum) > 0){
				this.runsKey = false;
				this._timer = setTimeout(function(){ $this.runs(rota, rotaNum, txz); }, 10);
			}else{
				this.runsKey = true;
				if (typeof(this.callback) === 'function') this.callback(this);
			}

			$(this.element).css('transform', 'rotate3d(0,0,1,'+rota+'deg)');
		},

		_handleRotation: function(element, _aoConfig, callback){
			this._aoConfig = _aoConfig;
			this.element = element;
			this.callback = callback;
			this.runsKey = true;

			this.starts();
		}
	};
})(jQuery, window, document);