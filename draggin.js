/**
 * Created by Administrator on 2017/2/7.
 * 原理：
 *  使div的position为绝对定位absolute，然后控制其top与left值，需要监听鼠标事件，主要用到mousedown, mousemove, mouseup。
 *  在mousedown后，记录mousedown时鼠标与需要移动的div的位置，然后取得两者之差，得到在鼠标移动后，div的位置。即：
 *  left = 当前鼠标位置.x - 鼠标点击时的.x值 + div的初始位置x值
 *   top = 当前鼠标位置.y - 鼠标点击时的.y值 + div的初始位置y值
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
    //父元素的宽高
    var farWidth = father.width(); 
    var farHeight = father.height();
    //鼠标按下时
    opt.handler.mousedown(function (e) {
        ismove = true;
        var mDownx = e.pageX, mDowny = e.pageY;//鼠标按下时的坐标
        var tarPos = that.position(); //鼠标按下时目标元素的位置
        //鼠标移动时
        $(document).mousemove(function (e) {
            e.preventDefault();//阻止浏览器的默认事件，防止在拖动的过程中触发浏览器的拖动事件
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
            //根据输入的参数进行移动 默认x Y 都移动             
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
