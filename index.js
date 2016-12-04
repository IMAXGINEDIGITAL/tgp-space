(function(fn) {
    window.startGame = fn;
})(function() {
    var raf = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function(fn) {return setTimeout(fn, 1 / 60)};

    var caf = window.cancelAnimationFrame || 
                window.webkitCancelAnimationFrame ||
                function(id) {clearTimeout(id)};

    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    function getIndexInMatrix(x, y, width, height) {
        return (y * width + x) * 4;
    }

    function getColorVectorInImageData(data, x, y, width, height) {
        var i = getIndexInMatrix(x, y, width, height);
        return [
            data[i],
            data[i + 1],
            data[i + 2],
            data[i + 3]
        ];
    }

    function setColorVectorInImageData(data, x, y, width, height, color) {
        var i = getIndexInMatrix(x, y, width, height);
        data[i] = color[0];
        data[i + 1] = color[1];
        data[i + 2] = color[2];
        data[i + 3] = color[3];
    }

    function walkMatrix(x, y, width, height, fn) {
        for (var i = x; i <= x + width; i++) {
            for (var j = y; j <= y + height; j++) {
                fn(i, j);
            }
        }
    }

    function walkCircle(cx, cy, r1, r2, fn) {
        walkMatrix(cx, cy, r2, r2, function(x, y) {
            var dist = distance(x, y, cx, cy);
            if (dist >= r1 && dist <= r2) {
                fn(x, y);
            }
        })
    }

    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    document.addEventListener('touchend', function(e) {
        e.preventDefault();
    });

    // viewport
    var viewport = document.body.getBoundingClientRect();

    // stage
    var stageEl = document.getElementById('stage');
    var stageView = stageEl.getBoundingClientRect();
    stageEl.style.backgroundImage = 'url(assets/galaxy-small.jpg)';

    // map
    var mapEl = document.getElementById('stage-minimap');
    var mapView = mapEl.getBoundingClientRect();
    var mapStageRatio = mapView.width / stageView.width;
    mapEl.style.height = stageView.height * mapStageRatio + 'px';
    mapView = mapEl.getBoundingClientRect();

    var mapMiniCanvas = mapEl.querySelector('.map');
    mapMiniCanvas.width = mapView.width;
    mapMiniCanvas.height = mapView.height;
    var mapMiniCtx = mapMiniCanvas.getContext('2d');
    mapMiniCtx.fillStyle = 'rgba(0, 0, 0, 1)';
    mapMiniCtx.fillRect(0, 0, mapView.width, mapView.height);
    var mapIndiEl = mapEl.querySelector('.indicator');  
    var mapIndiView = mapIndiEl.getBoundingClientRect();
    
    function updateMap(x, y) {
        x = (x + viewport.width / 3) * mapStageRatio - mapIndiView.width / 2;
        y = (y + viewport.height / 3) * mapStageRatio - mapIndiView.height / 2;
        mapIndiEl.style.transform = 'translate3d(' 
                                        + x + 'px,' 
                                        + y + 'px, 0px)';
    }

    function clearMap(x, y) {
        x *= mapStageRatio;
        y *= mapStageRatio;
        var width = viewport.width * mapStageRatio;
        var height = viewport.height * mapStageRatio;
        mapMiniCtx.fillStyle = 'rgba(255, 255, 255, 1)';
        mapMiniCtx.fillRect(x, y, width, height);
    }

    // noise
    var stageNoiseCanvas = document.getElementById('stage-noise');
    var stageNoiseView = stageNoiseCanvas.getBoundingClientRect();
    stageNoiseCanvas.width = stageNoiseView.width;
    stageNoiseCanvas.height = stageNoiseView.height;
    var stageNoiseCtx = stageNoiseCanvas.getContext('2d');
    stageNoiseCtx.globalCompositeOperation = 'destination-out';
    
    var cachedNoiseCanvas = document.createElement('canvas');
    cachedNoiseCanvas.width = stageView.width;
    cachedNoiseCanvas.height = stageView.height;
    var cachedNoiseCtx = cachedNoiseCanvas.getContext('2d');
    
    var noiseImageData = new ImageData(stageView.width, stageView.height);
    function makeNoise() {
        var simplex = new SimplexNoise();
        walkMatrix(0, 0, stageView.width, stageView.height,
            function(x, y) {
                var value = simplex.noise2D(x, y);
                if (value > 0.00001) {
                    setColorVectorInImageData(
                        noiseImageData.data,
                        x, y, stageView.width, stageView.height,
                        [255, 255, 255, value * 255]
                    );
                }
            }
        );

        cachedNoiseCtx.putImageData(noiseImageData, 0, 0);
        cachedNoiseCtx.globalCompositeOperation = 'destination-out';
    }

    function drawNoise(x, y) {
        stageNoiseCtx.clearRect(0, 0, stageNoiseView.width, stageNoiseView.height);
        stageNoiseCtx.putImageData(noiseImageData, -x, -y, x, y, stageNoiseView.width, stageNoiseView.height);
    }

    var clearNoiseId;
    function startClearNoise(x, y, lastX, lastY, clearByPath) {
        var startX;
        var startY;
        var endX;
        var endY;
        var stepAmount;

        if (!clearByPath) {
            startX = 0;
            startY = 0;
            endX = stageNoiseView.width / 2;
            endY = stageNoiseView.height / 2;
            stepAmount = 1;
        } else {
            var dx = x - lastX;
            var dy = y - lastY;
            var rad = Math.atan(dy / dx);

            endX = stageNoiseView.width / 2;
            endY = stageNoiseView.height / 2;
            if (x > lastX) {
                startX = 0;
            } else {
                startX = stageNoiseView.width;
            }
            startY = endY - (endX - startX) * Math.tan(rad);

            stepAmount = 4;
        }

        var stepCount = 1;
        var stepX = (endX - startX) / stepAmount;
        var stepY = (endY - startY) / stepAmount;

        var steps = [];
        var radius = 20;
        for (var i = 1; i <= stepAmount; i++) {
            var cx = startX + i * stepX;
            var cy = startY + i * stepY;
            var r = 0;
            while (r < Math.abs(stageNoiseView.height - cy) &&
                    r < stageNoiseView.height / 2) {
                r += radius;
                r = Math.min(r, Math.abs(stageNoiseView.height - cy), stageNoiseView.height / 2);
                steps.push([cx, cy, r]);
            }
        }

        // var steps = [];
        // while (temp.length > 0) {
        //     for (var i = 0; i < temp.length;) {
        //         var step = temp[i];
        //         steps.push(step.shift());
        //         if (step.length > 0) {
        //             i++;
        //         } else {
        //             temp.splice(i, 1);
        //         }
        //     }
        // }

        function tick() {
            if (steps.length > 0) {
                clearNoiseId = raf(tick);
                var step = steps.shift();
                var cx = step[0];
                var cy = step[1];
                var r = step[2];

                var stageNoiseGradient = stageNoiseCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
                stageNoiseGradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
                stageNoiseGradient.addColorStop(0.8, 'rgba(0, 0, 0, 100)');
                stageNoiseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                stageNoiseCtx.fillStyle = stageNoiseGradient;
                stageNoiseCtx.beginPath();
                stageNoiseCtx.arc(cx, cy, r, 0, Math.PI * 2);
                stageNoiseCtx.fill();
                stageNoiseCtx.closePath();

                var cachedNoiseGradient = cachedNoiseCtx.createRadialGradient(cx + x, cy + y, 0, cx + x, cy + y, r);
                cachedNoiseGradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
                cachedNoiseGradient.addColorStop(0.8, 'rgba(0, 0, 0, 100)');
                cachedNoiseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                cachedNoiseCtx.fillStyle = cachedNoiseGradient;
                cachedNoiseCtx.beginPath();
                cachedNoiseCtx.arc(cx + x, cy + y, r, 0, Math.PI * 2);
                cachedNoiseCtx.fill();
                cachedNoiseCtx.closePath(); 
            } else {
                stopClearNoise();
            }
        }
        clearNoiseId = raf(tick);
        // console.log(JSON.stringify(steps))
    }

    function stopClearNoise(x, y) {
        if (clearNoiseId) {
            caf(clearNoiseId);
            clearNoiseId = null;
            noiseImageData = cachedNoiseCtx.getImageData(0, 0, stageView.width, stageView.height);
        }
    }

    makeNoise();

    // scroll
    var myScroll = new IScroll('#stage-wrap', {
        mouseWheel: false,
        deceleration: 0.01,
        probeType: 3,
        scrollX: true,
        scrollY: true,
        freeScroll: true,
        bounce: false,
        disableMouse: true,
        disablePointer: true
    }); 

    var isScrolling = false;
    var scrollRecord = [];
    function scrollStart() {
        isScrolling = true;
        var x = Math.round(-myScroll.x);
        var y = Math.round(-myScroll.y);
        myScroll.lastX = myScroll.x;
        myScroll.lastY = myScroll.y;
        stopClearNoise(x, y);
    }

    function scroll() {
        var x = Math.round(-myScroll.x);
        var y = Math.round(-myScroll.y);
        updateMap(x, y);
        drawNoise(x, y);
    }

    function scrollEnd(clearByPath) {
        var x = Math.round(-myScroll.x);
        var y = Math.round(-myScroll.y);
        var lastX = Math.round(-myScroll.lastX);
        var lastY = Math.round(-myScroll.lastY);
        updateMap(x, y);
        clearMap(x, y);
        startClearNoise(x, y, lastX, lastY, clearByPath);
        isScrolling = false;
    }

    function scrollTo(x, y, clearByPath) {
        scrollStart();
        myScroll.scrollTo(x, y);
        scroll();
        scrollEnd(clearByPath);
    }

    myScroll.on('scrollStart', scrollStart);
    myScroll.on('scroll', scroll);
    myScroll.on('scrollEnd', function() {
        scrollEnd(true);
    });
    scrollTo(0, -stageView.height + viewport.height);

    var logoEl = document.getElementById('logo');
    logoEl.style.backgroundImage = 'url(assets/logo.png)';
    function flashLogo() {
        function handler() {
            logoEl.removeEventListener('webkitAnimationEnd', handler);
            logoEl.className = '';
            setTimeout(flashLogo, Math.random() * 5000 + 5000);
        }

        logoEl.addEventListener('webkitAnimationEnd', handler);
        logoEl.className = 'flash';
    }
    setTimeout(flashLogo, 5000);

    // window.myScrollTo = scrollTo
});