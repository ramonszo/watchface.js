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
            colors: {
                background: '#000',
                text: '#FFF',
                pointers: '#999',
                secPointer: '#C00'
            }
        };

        if(prop){
            if(options[name]){
                return options[name][prop] || optionsDefault[name][prop]
            }
        } else {
            return options[name] || optionsDefault[name]
        }
    };

    var watch = d.getElementById(option('id'));

    var updateClockInterval = false;
    var updateClock = function(watch){
        console.log('updateClock');

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
            var el = watch.querySelectorAll('.time > .'+what);

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
            watch.innerHTML = option('icon') + '<span class="time"><span class="hour"></span>:<span class="minutes"></span>'+
                              ((option('seconds'))?':<span class="seconds"></span>':'')+'</span>';
        }
    }


    d.body.appendChild(watch);
    updateClock(watch);

    return watch;
};
