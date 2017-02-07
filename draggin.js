/**
 * Created by Administrator on 2017/2/7.
 */
$.fn.dragging = function (options) {
    var that = this;
    var defaults = {
        move: 'both',// move 可等于 x y both
        handler: that //以$()形式存在  $('#banner)
    };
    var opt = $.extend({}, defaults, options); //默认参数

    var father = that.parent();
    var ismove;//是否移动开关

    //初始化
    father.css({'position':'relative','overflow':'hidden'});
    that.css({'position':'absolute'});
    opt.handler.css({'cursor':'move'});

    //判断最外层是否为body
    if(father.prop('tagName') == "BODY"){//jQuery获取标签的类型
        father.css('height','100%');
        $("HTML").css('height','100%');
    }
    var farWidth = father.width();
    var farHeight = father.height();
    opt.handler.mousedown(function (e) {
        ismove = true;
        var mDownx = e.pageX, mDowny = e.pageY;//鼠标按下时的坐标
        var tarPos = that.position(); //鼠标按下时目标元素的位置
        $(document).mousemove(function (e) {
            e.preventDefault();
            var mMovex = e.pageX, mMovey = e.pageY;//鼠标移动时坐标

            var movex = mMovex - mDownx + tarPos.left;//移动后的left值
            var movey = mMovey - mDowny + tarPos.top;//移动后的top值
            //x轴移动
            function moveX() {
                //移动边界值判断
                if(movex<0){
                    that.css('left',0)
                }else if(movex>(farWidth - that.width())){
                    that.css('left',farWidth - that.width());
                }else{
                    that.css('left', movex);
                }
            }

            //Y轴移动
            function moveY() {
                //移动边界值判断
                if(movey<0){
                    that.css('top',0);
                }else if(movey >(farHeight -that.height())){
                    that.css('top',farHeight -that.height());
                }else {
                    that.css('top', movey);
                }
            }

            //X Y 轴移动
            function moveAll() {
                moveX();
                moveY();
            }
            if (opt.move.toLowerCase() == "x") {
                ismove && moveX();
            }
            if (opt.move.toLowerCase() == "y") {
                ismove && moveY();
            }
            if (opt.move.toLowerCase() == "both") {
                ismove && moveAll();
            }
        }).mouseup(function () {
            ismove = false;
        });
    })
};