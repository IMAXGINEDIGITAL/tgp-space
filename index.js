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

    function findDivisor(num, closeTo) {
        var diff = Infinity;
        for (var i = 1; i <= num; i++) {
            if (num % i === 0) {
                var d = Math.abs(i - closeTo);
                if (d <= diff) {
                    diff = d;
                } else if (d > diff) {
                    break;
                }
            }
        }
        return i;
    }

    var fogColorRGB = [125, 125, 125];
    var fogDestiny = 0.1;
    function mixFogExp2(fragColor, fogColor, viewDistance) {
        var fogFactor = 1 / Math.exp(viewDistance * viewDistance * fogDestiny * fogDestiny);
        fogFactor = Math.max(Math.min(fogFactor, 1), 0);

        return (1 - fogFactor) * fogColor + fogFactor * fragColor;
    }

    function fadeFog(imageDataIn, x, y, width, height, viewDistance) {
        x = Math.round(x);
        y = Math.round(y);
        width = Math.round(width);
        height = Math.round(height);

        var imageDataOut = new ImageData(imageDataIn.width, imageDataIn.height);
        var l = (y + height - 1) * imageDataIn.width + (x + width);
        for (var i = y * imageDataIn.width + x; i < l; i += imageDataIn.width) {
            for (var j = i; j - i < width; j++) {
                imageDataOut.data[j * 4] = Math.round(
                    mixFogExp2(
                        imageDataIn.data[j * 4] / 255,
                        fogColorRGB[0] / 255,
                        viewDistance
                    ) * 255
                );
                imageDataOut.data[j * 4 + 1] = Math.round(
                    mixFogExp2(
                        imageDataIn.data[j * 4 + 1] / 255,
                        fogColorRGB[0] / 255,
                        viewDistance
                    ) * 255
                );
                imageDataOut.data[j * 4 + 2] = Math.round(
                    mixFogExp2(
                        imageDataIn.data[j * 4 + 2] / 255,
                        fogColorRGB[0] / 255,
                        viewDistance
                    ) * 255
                );
                imageDataOut.data[j * 4 + 3] = imageDataIn.data[j * 4 + 3];
            }
        }
        return imageDataOut;
    }

    var viewport = document.body.getBoundingClientRect();
    var startX = -766 + viewport.width / 2;
    var startY = -984 + viewport.height / 2;

    var elementsEl = document.getElementById('stage-elements');
    var elementsView = elementsEl.getBoundingClientRect();

    var mapEl = document.getElementById('stage-minimap');
    var mapView = mapEl.getBoundingClientRect();

    var mapIndiEl = mapEl.querySelector('.indicator');  
    mapIndiEl.style.width = viewport.width / elementsView.width * mapView.width + 'px';
    mapIndiEl.style.height = viewport.height / elementsView.height * mapView.height + 'px';
    var mapIndiView = mapIndiEl.getBoundingClientRect();

    var offcanvas = document.createElement('canvas');
    offcanvas.style.width = elementsView.width + 'px';
    offcanvas.style.height = elementsView.height + 'px';
    offcanvas.width = elementsView.width;
    offcanvas.height = elementsView.height;
    var offcontext = offcanvas.getContext('2d');
    offcontext.drawImage(image, 0, 0, elementsView.width, elementsView.height);
    
    var imageData = offcontext.getImageData(0, 0, elementsView.width, elementsView.height);

    var galaxyFogCanvas = document.getElementById('galaxy-fog');
    var galaxyFogView = galaxyFogCanvas.getBoundingClientRect();
    galaxyFogCanvas.width = galaxyFogView.width;
    galaxyFogCanvas.height = galaxyFogView.height;
    var galaxyFogCtx = galaxyFogCanvas.getContext('2d');

    function targetMapIndi(x, y) {
        mapIndiEl.style.transform = 'translate3d(' 
                                        + (-x / elementsView.width * mapView.width) + 'px,' 
                                        + (-y / elementsView.height * mapView.height) + 'px, 0px)';
    }

    function drawFog(x, y, fade) {
        var startDistance = 20;
        var duration = 3 * 1000;
        var startTime = Date.now();

        function draw(distance) {
            var imageDataOut = fadeFog(imageData, -x, -y, galaxyFogView.width, galaxyFogView.height, distance);
            galaxyFogCtx.clearRect(0, 0, galaxyFogView.width, galaxyFogView.height);
            galaxyFogCtx.putImageData(imageDataOut, x, y, -x, -y, galaxyFogView.width, galaxyFogView.height);
        }

        if (fade) {
            function fadeOut() {
                var elapsed = Date.now() - startTime;
                var distance = startDistance * (1 - elapsed / duration);
                distance = Math.max(0, distance);
                if (distance > 0.1) {
                    requestAnimationFrame(fadeOut);
                    draw(distance);
                } 
            }

            requestAnimationFrame(fadeOut);
        } else {
            draw(startDistance);
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

    myScroll.on('scroll', function() {
        targetMapIndi(myScroll.x, myScroll.y);
        // drawFog(myScroll.x, myScroll.y, false);
    });

    myScroll.on('scrollEnd', function() {
        // drawFog(myScroll.x, myScroll.y, true);
    });

    myScroll.scrollTo(startX, startY);
    targetMapIndi(startX, startY);
    drawFog(startX, startY, true);
});