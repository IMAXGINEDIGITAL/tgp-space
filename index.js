(function(loaded) {
    var bgImage = new Image();
    bgImage.onload = function() {
        loaded(bgImage);
    }
    bgImage.src = './assets/galaxy-small.jpg';
})(function(image) {
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
    
    function setMapIndi(x, y) {
        x = -(x - viewport.width / 3) * mapStageRatio - mapIndiView.width / 2;
        y = -(y - viewport.height / 3) * mapStageRatio - mapIndiView.height / 2;
        mapIndiEl.style.transform = 'translate3d(' 
                                        + x + 'px,' 
                                        + y + 'px, 0px)';
    }

    function clearMap(x, y) {
        x = -x * mapStageRatio;
        y = -y * mapStageRatio;
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
    var stageNoiseRadius = 10;
    var stageNoiseCtx = stageNoiseCanvas.getContext('2d');
    stageNoiseCtx.globalCompositeOperation = 'destination-out';
    
    var cachedNoiseCanvas = document.createElement('canvas');
    cachedNoiseCanvas.width = stageView.width;
    cachedNoiseCanvas.height = stageView.height;
    var cachedNoiseCtx = cachedNoiseCanvas.getContext('2d');
    var noiseImageData = new ImageData(stageView.width, stageView.height);
    function makeNoise() {
        var simplex = new SimplexNoise();
        for (var y = 0; y < stageView.height; y++) {
            for (var x = 0; x < stageView.width; x++) {
                var value = simplex.noise2D(x, y);
                if (value > 0.00001) {
                    var i = (y * stageView.width + x) * 4;
                    noiseImageData.data[i] = 
                        noiseImageData.data[i + 1] =
                        noiseImageData.data[i + 2] = 255;
                    noiseImageData.data[i + 3] = value * 255;
                }
            }
        }

        cachedNoiseCtx.putImageData(noiseImageData, 0, 0);
        cachedNoiseCtx.globalCompositeOperation = 'destination-out';
    }

    function drawNoise(x, y) {
        stageNoiseCtx.clearRect(0, 0, stageNoiseView.width, stageNoiseView.height);
        stageNoiseCtx.putImageData(noiseImageData, x, y, -x, -y, stageNoiseView.width, stageNoiseView.height);
    }

    function clearNoise() {
        if (scrollRecord.length === 0) return;

        var record = scrollRecord[0];
        var x = record.x;
        var y = record.y;
        var r = record.r;

        if (r >= stageNoiseView.height / 2) {
            scrollRecord.shift();
            
            var cx = x + viewport.width / 2;
            var cy = y + viewport.height / 2;
            var gradient = cachedNoiseCtx.createRadialGradient(cx, cy, r - stageNoiseRadius * 7, cx, cy, r);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            cachedNoiseCtx.fillStyle = gradient;
            cachedNoiseCtx.beginPath();
            cachedNoiseCtx.arc(cx, cy, r, 0, Math.PI * 2);
            cachedNoiseCtx.fill();
            cachedNoiseCtx.closePath();
            noiseImageData = cachedNoiseCtx.getImageData(0, 0, stageView.width, stageView.height);
        } else {
            record.r = r = Math.min(stageNoiseView.height / 2, r + stageNoiseRadius);

            var cx = stageNoiseView.width / 2;
            var cy = stageNoiseView.height / 2;
            var gradient = cachedNoiseCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            stageNoiseCtx.fillStyle = gradient;
            stageNoiseCtx.beginPath();
            stageNoiseCtx.arc(cx, cy, r, 0, Math.PI * 2);
            stageNoiseCtx.fill();
            stageNoiseCtx.closePath();
        }
    }

    makeNoise();

    // scroll
    var myScroll = new IScroll('#stage-wrap', {
        mouseWheel: false,
        probeType: 3,
        scrollX: true,
        scrollY: true,
        freeScroll: true,
        bounce: false,
        disableMouse: true,
        disablePointer: true
    }); 

    var startX = -766 + viewport.width / 2;
    var startY = -984 + viewport.height / 2;
    var isScrolling = false;
    var scrollRecord = [];
    function scrollStart() {
        isScrolling = true;
    }

    function scroll() {
        var x = myScroll.x;
        var y = myScroll.y;
        setMapIndi(x, y);
        drawNoise(myScroll.x, myScroll.y);
    }

    function scrollEnd() {
        var x = myScroll.x;
        var y = myScroll.y;
        setMapIndi(x, y);
        clearMap(x, y);
        scrollRecord.unshift({
            x: Math.round(-x), 
            y: Math.round(-y),
            r: 0
        });
        isScrolling = false;
    }

    myScroll.on('scrollStart', scrollStart);
    myScroll.on('scroll', scroll);
    myScroll.on('scrollEnd', scrollEnd);
    myScroll.scrollTo(startX, startY);
    scrollStart();
    scroll();
    scrollEnd();

    var raf = requestAnimationFrame ||
                webkitRequestAnimationFrame ||
                function(fn) {return setTimeout(fn, 1 / 60)};

    // tick
    function tick() {
        raf(tick);
        if (!isScrolling) {
            clearNoise();
        }
    }
    raf(tick);
});