/**
 * Created by Administrator on 2017/2/7.
 */
$.fn.dragging = function (options) {
    var that = this;
    var defaults = {
        move: 'both',// move �ɵ��� x y both
        handler: that //��$()��ʽ����  $('#banner)
    };
    var opt = $.extend({}, defaults, options); //Ĭ�ϲ���

    var father = that.parent();
    var ismove;//�Ƿ��ƶ�����

    //��ʼ��
    father.css({'position':'relative','overflow':'hidden'});
    that.css({'position':'absolute'});
    opt.handler.css({'cursor':'move'});

    //�ж�������Ƿ�Ϊbody
    if(father.prop('tagName') == "BODY"){//jQuery��ȡ��ǩ������
        father.css('height','100%');
        $("HTML").css('height','100%');
    }
    var farWidth = father.width();
    var farHeight = father.height();
    opt.handler.mousedown(function (e) {
        ismove = true;
        var mDownx = e.pageX, mDowny = e.pageY;//��갴��ʱ������
        var tarPos = that.position(); //��갴��ʱĿ��Ԫ�ص�λ��
        $(document).mousemove(function (e) {
            e.preventDefault();
            var mMovex = e.pageX, mMovey = e.pageY;//����ƶ�ʱ����

            var movex = mMovex - mDownx + tarPos.left;//�ƶ����leftֵ
            var movey = mMovey - mDowny + tarPos.top;//�ƶ����topֵ
            //x���ƶ�
            function moveX() {
                //�ƶ��߽�ֵ�ж�
                if(movex<0){
                    that.css('left',0)
                }else if(movex>(farWidth - that.width())){
                    that.css('left',farWidth - that.width());
                }else{
                    that.css('left', movex);
                }
            }

            //Y���ƶ�
            function moveY() {
                //�ƶ��߽�ֵ�ж�
                if(movey<0){
                    that.css('top',0);
                }else if(movey >(farHeight -that.height())){
                    that.css('top',farHeight -that.height());
                }else {
                    that.css('top', movey);
                }
            }

            //X Y ���ƶ�
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