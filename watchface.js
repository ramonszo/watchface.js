window['Watchface'] = function(options){
    var d = document;
    var option = function(name, prop){
        var optionsDefault = {
            id: 'watchface',
            skin: '',
            mode: 'digital',
            format: 12,
            band: true,
            seconds: false,
            icon: '',
            customCSS: false,
            media: {
                watch: 280,
                band: 100
            },
            colors: {
                background: '#000',
                text: '#FFF',

                analogBackground: '#FFF',
                analogText: '#333',
                pointers: '#333',
                secPointer: '#FC0505'
            },
        };

        if(prop){
            if(options[name]){
                return options[name][prop] || optionsDefault[name][prop]
            } else {
                return optionsDefault[name][prop];
            }
        } else {
            return options[name] || optionsDefault[name]
        }
    };

    var CSS = function(){
        var watchOffset = option('media', 'watch');
        var bandOffset = option('media', 'band');

        var CSSDefault = [
            '#watch-face {display: none;font-family:sans-serif;}',
            
            '@media (max-width: '+watchOffset+'px){'+
                '#watch-face {display: block;position: fixed;top: 0; right: 0;bottom: 0; left: 0;vertical-align: middle;z-index: 1000000;text-align: center;background:'+option('colors', 'background')+';color:'+option('colors', 'text')+';}'+
                '#watch-face .inner {position: absolute;display:block!important;top: 50%;left:0; right: 0;transform:translateY(-50%)}'+
                '#watch-face .digital .icon > * {max-width:33vw;}'+
                '#watch-face .digital .digital-time {display: inline-block;font-size: 10vw;text-align: center;margin-top: 10vw;}'+

                '#watch-face .analog {color: '+option('colors', 'analogText')+';}'+
                '#watch-face .analog .digital-time {display:none;color: '+option('colors', 'text')+';}'+
                '#watch-face .analog .pointer{transform-origin: 50% 0;}'+
            
                '#watch-face .analog ol{position:absolute;width:85vw;height:85vw;border-radius:50%;top:50%;background:'+option('colors', 'analogBackground')+';margin:-50vw auto 0;padding:7.5vw;}'+
                '#watch-face .analog ol > *{display:block;position:absolute;top:50%;left:50%;width:15vw;height:15vw;line-height:15vw;font-size:10vw;text-align:center;margin:-7.5vw;}'+
                '#watch-face .analog ol:after{content:\'\';background:'+option('colors', 'pointers')+';border:1vw solid '+option('colors', 'analogBackground')+';box-sizing:border-box;width:5vw;height:5vw;z-index:10;position:absolute;left:50%;top:50%;margin-top:-2.5vw;margin-left:-2.5vw;border-radius:50%;}'+
                '#watch-face .analog .hour{height:40vw;width:2vw;background:'+option('colors', 'pointers')+';position:absolute;left:50%;margin-left:-1.5vw;}'+
                '#watch-face .analog .minute{height:30vw;width:2vw;background:'+option('colors', 'pointers')+';position:absolute;left:50%;margin-left:-1.5vw;}'+
                '#watch-face .analog .second{height:40vw;width:1vw;background:'+option('colors', 'secPointer')+';position:absolute;left:50%;margin-left:-.5vw;}'+
            '}',
            
            '@media (max-width: '+bandOffset+'px){'+
                '#watch-face * {display: none;}'+
                '#watch-face .digital-time {display:block !important;margin: 0;font-size: 60vw !important;transform-origin: left top 0;margin-left:16vw;float:left;position:absolute;transform: rotate(-90deg) translateX(-50%);}'+
                '#watch-face .digital-time * {display:inline}'+
            '}'
        ];

        var CSSAnalog = '';
        for(var i=1;i<=12;i++){
            var deg = i*30;
            CSSAnalog += '.clock ol > *:nth-of-type('+i+') {transform: rotate('+deg+'deg) translate(42.5vw) rotate('+(deg*-1)+'deg);}';
        }
        CSSDefault.push('@media (max-width: '+watchOffset+'px){'+CSSAnalog+'}');

        try {
            for(var i=0;i<CSSDefault.length;i++){
                document.styleSheets[0].insertRule(CSSDefault[i].replace(/#watch-face/gi, '#'+option('id')), document.styleSheets[0].rules.length);
            }
        } catch (e){
            console.log(e);
        }
    };


    var clock = function(){
        var watch = d.getElementById(option('id'));

        var updateClockInterval = false;
        var updateClock = function(watch){
            if(updateClockInterval){
                clearTimeout(updateClockInterval);
            }

            var today = new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds();

            var hDeg = hours * 30 + minutes * (360/720);
            var mDeg = minutes * 6 + seconds * (360/3600);
            var sDeg = seconds * 6;

            hours = (hours > 10) ? hours : "0" + hours;
            minutes = (minutes > 10) ? minutes : "0" + minutes;
            seconds = (seconds > 10) ? seconds : "0" + seconds;

            var setDigitalTime = function(what, val){
                var el = watch.querySelectorAll('.digital-time > .'+what);

                if(el[0]){
                    el[0].innerHTML = val;
                }
            }

            var setAnalogTime = function(what, val){
                var el = watch.querySelectorAll('.analog .clock > .'+what);

                if(el[0]){
                    el[0].style.transform = "rotate("+(val + 180)+"deg)";
                }
            };
            
            //str = hours+':'+minutes+(option('seconds')?':'+seconds:'');

            setDigitalTime('hours', hours);
            setDigitalTime('minutes', minutes);
            setDigitalTime('seconds', seconds);

            setAnalogTime('hour', hDeg);
            setAnalogTime('minute', mDeg);
            setAnalogTime('second', sDeg);
            
            var update = function(){
                updateClock(watch);
            };

            if(option('seconds')) {
                window.requestAnimationFrame(update);
            } else {
                updateClockInterval = setTimeout(update, 30000);
            }
        }


        if(!watch){
            watch = d.createElement('div');
            watch.id = option('id');
            watch.className = option('skin');

            var digitalTime = '<span class="digital-time">'+
                                    '<span class="hours"></span>:<span class="minutes"></span>'+
                                    ((option('seconds'))?':<span class="seconds"></span>':'')+
                              '</span>';
            
            if(option('mode')=='digital'){
                watch.innerHTML = '<div class="inner digital">' +
                                        '<div class="icon">'+option('icon')+'</div>'+
                                        digitalTime+
                                    '</div>';
            } else {
                watch.innerHTML = '<div class="inner analog">'+
                                        '<div class="clock">'+
                                            '<ol>'+
                                                '<li>4</li><li>5</li><li class="n n6">6</li>'+
                                                '<li>7</li><li>8</li><li class="n n9">9</li><li>10</li><li>11</li>'+
                                                '<li class="n n12">12</li><li>1</li><li>2</li><li class="n n3">3</li>'+
                                            '</ol>'+
                                            '<div class="hour pointer"></div>'+
                                            '<div class="minute pointer"></div>'+
                                            '<div class="second pointer"></div>'+
                                        '</div>'
                                        +digitalTime+
                                   '</div>';
            }
        }

        if(!option('customCSS')) {
            CSS();
        }
        
        d.body.appendChild(watch);
        updateClock(watch);

        return watch;
    };

    return clock();
};