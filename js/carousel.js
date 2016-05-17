;(function($, window, document, undefined){
	$.fn.carousel = function(_aoConfig){
		var $this = $(this);

		var length = $this.find('li').length;
		if (length >= 6) new run($this);
	}

	var run = function(element){
		this.element = element;
		this.element.push(this.selSet());
		this.gos();

	}

	run.prototype = {
		gos: function(){
			var $this = this;
			$($this.element).each(function(k, v){
				var tran3d = $(this).css('transform');
				var b = tran3d.split(', ');
				var top = b[b.length-1].split(')')[0];

				var height = $(this).height();

				var ttop = top - .5;

				var num = ttop <= -height ? height : ttop;

				$(this).css('transform', 'translate3d(0 , '+(num)+'px, 0)');
			});
			setTimeout(function(){ $this.gos(); }, 10);
		},

		selSet: function(){
			var parent = this.element.parent();
			var element = this.element.clone().appendTo(parent);
			var height = element.height();

			parent.css('height', height);
			this.element.css('position', 'absolute');
			$(element).css({'transform': 'translate3d(0, '+height+'px, 0)', 'position': 'absolute'});

			return element;
		}
	};
})(jQuery, window, document);