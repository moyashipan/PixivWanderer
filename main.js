(function ($) {
    var f = function() {
        var cursorPalette = {
            '_':'rgba(  0,  0,  0,  0.0)',
            'B':'rgba(  0,  0,  0,  1.0)',
            '.':'rgba(255,255,255,  1.0)'
        };
        var cursorBmp = [
        '_____BB__________',
        '____B..B_________',
        '____B..B_________',
        '____B..B_________',
        '____B..B_________',
        '____B..BBB_______',
        '____B..B..BBB____',
        '____B..B..B..BB__',
        '____B..B..B..B.B_',
        'BBB_B..B..B..B..B',
        'B..BB........B..B',
        'B...B...........B',
        '_B..B...........B',
        '__B.B...........B',
        '__B.............B',
        '___B............B',
        '___B...........B_',
        '____B..........B_',
        '____B..........B_',
        '_____B........B__',
        '_____B........B__',
        '_____BBBBBBBBBB__',
        ];
        var pattern = /^http:\/\/www\.pixiv\.(net|com)\//;
        //var pattern = /^http:\/\/www\.pixiv\.net\//;
        //var pattern = /^http:\/\/(.*?)\.pixiv\.net\//;
     
        var ignores = ['http://www.pixiv.net/logout.php'];
     
        var links = [];
        var tempLinks = $('a');
        tempLinks.each(function(){
            if ($.inArray(this.href, ignores) > -1) return;
            if (this.href == location.href) return;
            if (this.href == location.href + '#') return;
            if ($(this).offset().top == 0) return;
            if (this.href.match(pattern)) {
                links.push(this);
            }
        });
        if (!links.length) {
            history.back();
        }

        var link = links[Math.floor(links.length*Math.random())];
        var offset = $(link).offset();
        var size = {width:$(link).width(), height:$(link).height()};

        // RED
        var padding = 10;
        var red = $('<div>').css({
            'width':size.width + padding * 2,
            'height':size.height + padding * 2,
            'position':'absolute',
            'top':offset.top - padding,
            'left':offset.left - padding,
            'background-color':'red',
            'opacity':0.5});
 
        // CURSOR
        var scale = 5;
        var cursor = $('<canvas width="' + cursorBmp[0].length * scale + 'px" height="' + cursorBmp.length * scale + 'px">').css({
            'position':'absolute',
            'top':offset.top + size.height / 2 + 40,
            'left':offset.left + (size.width / 2) - (6 * scale),
            'z-index':99999
        });
        var context = cursor[0].getContext("2d");
        for (var yIndex = 0; yIndex<cursorBmp.length; yIndex++) {
            var line = cursorBmp[yIndex];
            for (var xIndex = 0; xIndex<line.length; xIndex++) {
                var str = line[xIndex];
                context.fillStyle = cursorPalette[str];
                context.fillRect(xIndex * scale, yIndex * scale, scale, scale);
            }
        }
        
        // SCROLL
        var curTop = $(window).scrollTop();
        $('body')
            .animate(
                // SCROLL TO BOTTOM
                {scrollTop: curTop + 300},
                {
                    duration: 10000,
                    complete: function(){
                        // TODO:use localStorage of extention
                        var count = localStorage['framedView']++;
                        if (isNaN(count) || count > 20) {
                            $(this).stop(true, false);
                            location.href = 'http://www.pixiv.net/';
                            localStorage['framedView'] = 0;
                            return;
                        }
                        $(this).stop();
                        $('body').append(red).append(cursor);
                        cursor.animate({'top':offset.top + size.height / 2}, 1200);
                    }
                }
            )
            .animate({scrollTop: offset.top - 300}, 1000, function(){
                // SCROLL TO CURSOR
                $(link)
                .animate({'opacity':0}, 200)
                .animate({'opacity':1}, 200)
                .animate({'opacity':0}, 200)
                .animate({'opacity':1}, 200)
                .animate({'opacity':0}, 200)
                .animate({'opacity':1}, 200)
                .animate({'opacity':0}, 200)
                .animate({'opacity':1}, 200)
                .animate({'opacity':0}, 200)
                .animate({'opacity':1}, 200, function(){
                    setTimeout(function(){
                        location.href = link.href;

                        red.remove();
                        cursor.remove();

                        setTimeout(f, 3000);
                    }, 2000);
                });
            });
    };
    setTimeout(f, 5000);
})(jQuery);