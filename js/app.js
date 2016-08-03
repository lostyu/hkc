$(function(){

    // 收藏职位
    function ajax_sczw(){
        // ajax
        layer.msg('收藏成功！');
    }

    if($.validator){
        // 表单验证默认设置
        $.validator.setDefaults({
            debug: true
        });
        $.validator.addMethod('tel', function(value, element, params){
            var reg = /^1[3|4|5|7|8]\d{9}$/;
            return this.optional( element ) || reg.test(value);
        }, '请输入正确的手机号');
    }

    // 简历列表展开隐藏切换
    $(document).on('click', '.j-toggleInfo', function(){
        var $this = $(this);
        var $parents = $this.parents('.item');
        var $parent = $this.parent();
        var $bd = $parents.find('.bd');

        if($parent.hasClass('z-crt')){
            $parent.removeClass('z-crt');
            $bd.hide();
        }else{
            $parent.addClass('z-crt');
            $bd.show();
        }
    });


    $(document).on('click', '.j-sczw', ajax_sczw);

    // 用户协议
    $(document).on('click', '.j-openxy', function(){
        window.open('http://baidu.com', '', 'height=800, width=1200, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
    });

});

// 幻灯片
;(function(){

    var _defaults = {
        autoPlay: true,
        speed: 5000
    };

    function Slider(id, opts){
        this.$slider = $('#'+id);
        this.$ul = this.$slider.find('ul');
        this.$li = this.$ul.children();
        this.$pointer = this.$slider.find('.pointer');
        this.$span = this.$pointer.children();
        this.len = this.$li.length;
        this.currentIndex = 0;
        this.timer = null;
        this.options = $.extend({}, _defaults, opts);

        this.init();
    }

    Slider.prototype.init = function(){
        var _this = this;

        _this.$slider.hover(function(){
            clearInterval(_this.timer);
        }, function(){
            _this.auto();
        });

        _this.$span.click(function(){
            _this.tab($(this).index());
        });

        if(_this.options.autoPlay){
            _this.auto();
        }
    };

    Slider.prototype.tab = function(index){
        this.$li.eq(this.currentIndex).fadeOut(800);

        this.currentIndex = index;

        this.$li.eq(this.currentIndex).fadeIn(800);
        this.$span.removeClass('z-crt').eq(this.currentIndex).addClass('z-crt');
    };

    Slider.prototype.next = function(){
        this.$li.eq(this.currentIndex).fadeOut(800);

        this.currentIndex++;
        if(this.currentIndex >= this.len){
            this.currentIndex = 0;
        }

        this.$li.eq(this.currentIndex).fadeIn(800);
        this.$span.removeClass('z-crt').eq(this.currentIndex).addClass('z-crt');
    };

    Slider.prototype.auto = function(){
        var _this = this;
        clearInterval(_this.timer);
        _this.timer = setInterval(function(){
            _this.next();
        }, _this.options.speed);
    };

    window.Slider = Slider;
})();