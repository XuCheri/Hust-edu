var timer = null;
        var lock = true;
        var sliderPage = document.getElementsByClassName('sliderPage')[0];
        var moveWidth = sliderPage.children[0].offsetWidth;
        var num = sliderPage.children.length - 1;
        var leftBtn = document.getElementsByClassName('leftBtn')[0];
        var rightBtn = document.getElementsByClassName('rightBtn')[0];
        var index = 0;
        var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');

        leftBtn.onclick = function () {
            autoMove('right -> left');
        }
        rightBtn.onclick = function () {
            autoMove('left -> right');
        }

        function autoMove(direction) {
            if (lock) {
                lock = false;
                clearTimeout(timer);
                if (!direction || direction == 'left -> right') {
                    index++;
                    startMove(sliderPage, { left: sliderPage.offsetLeft - moveWidth }, function () {
                        if (sliderPage.offsetLeft == num * moveWidth * -1) {
                            index = 0;
                            sliderPage.style.left = '0px';
                        }
                        timer = setTimeout(autoMove, 1500);
                        lock = true;
                        changeIndex(index);
                    })
                } else if (direction == 'right -> left') {
                    if (sliderPage.offsetLeft == 0) {
                        sliderPage.style.left = -num * moveWidth + 'px';
                        index = num;
                    }
                    index--;
                    startMove(sliderPage, { left: sliderPage.offsetLeft + moveWidth }, function () {
                        timer = setTimeout(autoMove, 1500);
                        lock = true;
                        changeIndex(index);
                    })
                }
            }

        }
        timer = setTimeout(autoMove, 1500);


        function changeIndex(_index) {
            for (var i = 0; i < oSpanArray.length; i++){
                oSpanArray[i].className ='';
            }
            oSpanArray[_index].className = 'active';

        }


        for(var i = 0;i<oSpanArray.length;i++){
            (function(myIndex){
                oSpanArray[i].onclick = function(){
                    lock = false;
                    clearTimeout(timer);
                    index = myIndex;
                    startMove(sliderPage,{left:-index*moveWidth},function(){
                        lock = true;
                        timer = setTimeout(autoMove,1500); 
                        changeIndex(index);
                    })
                }
            })(i)
        }