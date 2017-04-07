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
                pointers: '#999',
                secPointer: '#C00'
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
                    '@media (max-width: '+watchOffset+'px){\
                        #watch-face {display: block;position: fixed;top: 0; right: 0;bottom: 0; left: 0;vertical-align: middle;z-index: 1000000;text-align: center;background:'+option('colors', 'background')+';color:'+option('colors', 'text')+';}\
                        \
                        #watch-face .inner {position: absolute;display:block!important;top: 50%;left:0; right: 0;transform:translateY(-50%)}\
                        #watch-face .icon > * {max-width:33vw;}\
                        #watch-face .digital-time {display: inline-block;font-size: 10vw;text-align: center;margin-top: 10vw;}\
                    }',
                    '@media (max-width: '+bandOffset+'px){\
                        #watch-face * {display: none;}\
                        #watch-face .digital-time {display:block;margin: 0;font-size: 60vw;transform-origin: left top 0;margin-left:16vw;float:left;position:absolute;transform: rotate(-90deg) translateX(-50%);}\
                        #watch-face .digital-time * {display:inline}\
                    }'];

        console.log(CSSDefault);

        if(!option('customCSS')) {
            try {
                for(var i=0;i<CSSDefault.length;i++){
                    document.styleSheets[0].insertRule(CSSDefault[i].replace(/#watch-face/gi, '#'+option('id')), document.styleSheets[0].rules.length);
                }
            } catch (e){
                console.log(e);
            }
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
            var hour = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds();

            hour = (hour > 10) ? hour : "0" + hour;
            minutes = (minutes > 10) ? minutes : "0" + minutes;
            seconds = (seconds > 10) ? seconds : "0" + seconds;


            var set = function(what, val){
                var el = watch.querySelectorAll('.digital-time > .'+what);

                if(el[0]){
                    el[0].innerHTML = val;
                }
            }

            //str = hour+':'+minutes+(option('seconds')?':'+seconds:'');

            set('hour', hour);
            set('minutes', minutes);
            set('seconds', seconds);

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

            if(option('mode')=='digital'){
                watch.innerHTML = '<div class="inner">' +
                                        '<div class="icon">'+option('icon')+'</div>'+
                                        '<span class="digital-time">'+
                                            '<span class="hour"></span>:<span class="minutes"></span>'+
                                            ((option('seconds'))?':<span class="seconds"></span>':'')+
                                        '</span>'+
                                    '</div>';
            }
        }

        CSS();

        d.body.appendChild(watch);
        updateClock(watch);

        return watch;
    };

    return clock();
};
