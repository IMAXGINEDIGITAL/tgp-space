(function(loaded) {
    var bgImage = new Image();
    bgImage.onload = function() {
        loaded(bgImage);
    }
    bgImage.src = './assets/galaxy-small.jpg';
})(function(image) {
    document.addEventListener('toucmove', function(e) {
        e.preventDefault();
    });

    var viewport = document.body.getBoundingClientRect();

    var stageEl = document.getElementById('stage');
    var stageView = stageEl.getBoundingClientRect();
    stageEl.style.backgroundImage = 'url(assets/galaxy-small.jpg)';

    var startX = -766 + viewport.width / 2;
    var startY = -984 + viewport.height / 2;

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

    var noiseImageData = new ImageData(stageView.width, stageView.height);
    var stageNoiseCanvas = document.getElementById('stage-noise');
    var stageNoiseView = stageNoiseCanvas.getBoundingClientRect();
    stageNoiseCanvas.width = stageNoiseView.width;
    stageNoiseCanvas.height = stageNoiseView.height;
    var stageNoiseCtx = stageNoiseCanvas.getContext('2d');
    
    function makeNoise() {
        var simplex = new SimplexNoise();
        for (var y = 0; y < stageView.height; y++) {
            for (var x = 0; x < stageView.width; x++) {
                var value = simplex.noise2D(x, y);
                // if (value > 0.00001) {
                    var i = (y * stageView.width + x) * 4;
                    noiseImageData.data[i] = 
                        noiseImageData.data[i + 1] =
                        noiseImageData.data[i + 2] = 255;
                    noiseImageData.data[i + 3] = (value * 0.5 + 0.5) * 255;
                // }
            }
        }
    }

    function drawNoise(x, y) {
        stageNoiseCtx.clearRect(0, 0, stageNoiseView.width, stageNoiseView.height);
        stageNoiseCtx.putImageData(noiseImageData, x, y, -x, -y, stageNoiseView.width, stageNoiseView.height);
    }

    function recordNoise(x, y) {
        x = Math.round(-x);
        y = Math.round(-y);

        for (var yy = y; yy - y < stageNoiseView.height; yy++) {
            for (var xx = x; xx - x < stageNoiseView.width; xx++) {
                var i = (yy * stageView.width + xx) * 4;
                if (noiseImageData.data[i + 3] > 0) {
                    noiseFadeRecord.push(i);
                }
            }
        }
    }

    function clearNoise() {
        if (xyRecord.length === 0) return;

        var record = xyRecord[0];
        var x = record[0];
        var y = record[1];
        var allClear = true;
        for (var yy = y; yy - y < stageNoiseView.height; yy++) {
            for (var xx = x; xx - x < stageNoiseView.width; xx++) {
                var i = (yy * stageView.width + xx) * 4;
                noiseImageData.data[i + 3] -= 15 + Math.random() * 5;
                if (noiseImageData.data[i + 3] > 0) {
                    allClear = false;
                }
            }
        }
        if (allClear) {
            xyRecord.shift();
        }
    }

    var myScroll = new IScroll('#stage-wrap', {
        mouseWheel: false,
        probeType: 3,
        scrollX: true,
        scrollY: true,
        bounce: false,
        disableMouse: true,
        disablePointer: true
    }); 

    var isScrolling = false;
    myScroll.on('scrollStart', function() {
        isScrolling = true;
    });

    myScroll.on('scroll', function() {
        var x = myScroll.x;
        var y = myScroll.y;
        setMapIndi(x, y);
    });

    var xyRecord = [];
    myScroll.on('scrollEnd', function() {
        var x = myScroll.x;
        var y = myScroll.y;
        setMapIndi(x, y);
        clearMap(x, y);
        xyRecord.unshift([Math.round(-x), Math.round(-y)]);
        isScrolling = false;
    });

    myScroll.scrollTo(startX, startY);
    setMapIndi(startX, startY);
    clearMap(startX, startY);
    makeNoise();
    xyRecord.unshift([Math.round(-startX), Math.round(-startY)]);

    function tick() {
        requestAnimationFrame(tick);
        if (!isScrolling) {
            clearNoise();
        }
        drawNoise(myScroll.x, myScroll.y);
    }
    requestAnimationFrame(tick);
});