/*
 * @Author: XuCheri
 * @Date: 2021-04-02 23:23:47
 * @LastEditTime: 2021-04-05 23:58:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Hust-edu\js\demo1.js
 */


var sliderPage = document.getElementsByClassName('sliderPage')[0];
var moveWidth = sliderPage.children[0].offsetWidth;
var num = sliderPage.children.length - 1;
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var index = 0;
var oSpanArray = document.getElementsByClassName('circle')[0].getElementsByTagName('span');

(function () {
    function carousel(id) {
        var wrap = document.querySelector(id + ' .wrap'),
            ul = document.querySelector(id + ' ul'),
            prev = document.querySelector(id + ' .prev'),
            next = document.querySelector(id + ' .next'),
            circles = document.querySelectorAll(id + ' .circle span'),
            boxWidth = wrap.offsetWidth, //一个轮播图的宽
            canclick = true; //是否能进行下次点击，能（true），不能（false）
        timer = null;
        //初始化
        ul.innerHTML += ul.innerHTML;
        var len = ul.children.length; //子元素的数量
        ul.style.width = len * boxWidth + 'px';

        var cn = 0; //当前的索引值
        var ln = 0; //上一个的索引值

        next.onclick = function () {
            if (!canclick) {
                //这个条件成立说明 现在不能点击
                return;
            }

            cn++;
            move();
        }

        prev.onclick = function () {
            if (!canclick) {
                //这个条件成立说明 现在不能点击
                return;
            }

            if (cn == 0) {
                cn = len / 2;
                ul.style.transition = null;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            }

            setTimeout(function () {
                //transition的值会被mover里给覆盖了，所以我让它俩不是同时执行，借助定时器
                cn--;
                move();
            }, 16);
        }

        for (var i = 0; i < circles.length; i++) {
            circles[i].index = i;
            circles[i].onclick = function () {
                if (!canclick) {
                    //这个条件成立说明 现在不能点击
                    return;
                }

                cn = this.index;
                move();
                canclick = true
            }
        }

        function move() {
            canclick = false; //运动正在走，不让用户点击

            //console.log(cn);
            ul.style.transition = '.3s';
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

            /*
                同步圆点
                cn:0 1 2 3 4 5 6 7
                hn:0 1 2 3 0 1 2 3

             */

            var hn = cn % (len / 2);
            circles[ln].className = '';
            circles[hn].className = 'active';
            ln = hn; //当前次的索引相对于下一次的点击就是上一次的索引
            //相对于下一次的点击，上一次就是当前
        }

        ul.addEventListener('transitionend', function () { //过渡完成后就会触发的事件
            // console.log(1);
            if (cn == len / 2) { //当第4个索引对应的图片运动完了，要把ul拉回原点，才能做到无缝滚动
                // console.log(12);
                ul.style.transition = null;
                cn = 0;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            }

            canclick = true; //运动走完了，让用户可以再次点击 
        });

        timer = setInterval(next.onclick, 3000);

        //浏览器tab页面切换、浏览器缩小的时候，浏览器为了节约资源会把运动给停掉，但是定时器依然在走。造成了不同步的问题，还有可能cn走超了等等。以下就是解决这个问题
        window.onblur = function () {
            //页面隐藏了
            clearInterval(timer);
        };
        window.onfocus = function () {
            //页面打开了
            timer = setInterval(next.onclick, 3000);
        }

        //第二个解决方法，使用visibilitychange事件
        document.addEventListener('visibilitychange',function(){
            if(document.visibilityState === 'hidden' ){
                //页面隐藏了，清除动画
                clearInterval(timer);
            }else{
               //页面打开了
               timer = setInterval(next.onclick, 3000);
            }
        }); 

    }

    carousel('#section3');
    // carousel('#section5');
})();