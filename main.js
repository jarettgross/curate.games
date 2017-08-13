document.documentElement.setAttribute('data-agent', navigator.userAgent);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {});
}

document.addEventListener('DOMContentLoaded', function() {

    // Pop out sidebar, move main div to right, hide nav bar
    document.querySelector('.btn-menu').addEventListener('click', function() {
        document.querySelector('.sidebar-container').classList.add('sidebar-container-open');
        document.querySelector('.main').classList.add('main-open');
        Array.from(document.querySelectorAll('.btn-change-post')).forEach(function(child) {
            child.classList.add('hide');
        });
        document.querySelector('.btn-menu').classList.add('hide');
        document.querySelector('.btn-close').classList.add('hide');

        // If on mobile
        if (window.innerWidth < 768) {
            document.querySelector('.sidebar-close').classList.remove('hide');
        }
    });

    document.querySelector('.sidebar-close').addEventListener('click', function(event) {
        if (window.innerWidth < 768) {
            event.target.classList.add('hide');
            document.querySelector('.sidebar-container').classList.remove('sidebar-container-open');
            document.querySelector('.main').classList.remove('main-open');
            // Display regular nav bar if close button is hidden
            if (document.querySelector('.btn-close').classList.contains('hide')) {
                Array.from(document.querySelectorAll('.btn-change-post')).forEach(function(child) {
                    child.classList.remove('hide');
                });
                document.querySelector('.btn-menu').classList.remove('hide');
            }
        }
    });

    // Slide in sidebar, slide main div to left, show nav bar
    document.querySelector('.main').addEventListener('click', function(event) {
        if (!event.target.classList.contains('btn')) {
            document.querySelector('.sidebar-container').classList.remove('sidebar-container-open');
            document.querySelector('.main').classList.remove('main-open');
            // Display regular nav bar if close button is hidden
            if (document.querySelector('.btn-close').classList.contains('hide')) {
                Array.from(document.querySelectorAll('.btn-change-post')).forEach(function(child) {
                    child.classList.remove('hide');
                });
                document.querySelector('.btn-menu').classList.remove('hide');
            }
        }
    });

    // Slide out game info, slide in review
    document.querySelector('.read-more').addEventListener('click', function() {
        document.querySelector('.game-full-review').classList.add('game-info-left');
        Array.from(document.querySelectorAll('.game-info')).forEach(function(elem) {
            elem.classList.add('game-info-right');
        });
    });

    // Slide in game info, slide out review
    document.querySelector('.go-back').addEventListener('click', function() {
        document.querySelector('.game-full-review').classList.remove('game-info-left');
        Array.from(document.querySelectorAll('.game-info')).forEach(function(elem) {
            elem.classList.remove('game-info-right');
        });
    });

    // Show video, update nav bar
    document.querySelector('.btn-play').addEventListener('click', function() {
        document.querySelector('#ytplayer').classList.remove('hide');
        document.querySelector('.btn-close').classList.remove('hide');
        document.querySelector('.btn-menu').classList.add('hide');
        Array.from(document.querySelectorAll('.btn-change-post')).forEach(function(elem) {
            elem.classList.add('hide');
        });
        document.querySelector('.game-details-container').classList.add('hide');
        document.querySelector('.img-lg').classList.add('hide');
        document.querySelector('.btn-play').classList.add('hide');
    });

    // Hide video, update nav bar
    document.querySelector('.btn-close').addEventListener('click', function() {
        document.querySelector('#ytplayer').classList.add('hide');
        document.querySelector('.btn-close').classList.add('hide');
        // If sidebar isn't open, display nav bar
        if (!document.querySelector('.sidebar-container').classList.contains('sidebar-container-open')) {
            document.querySelector('.btn-menu').classList.remove('hide');
            Array.from(document.querySelectorAll('.btn-change-post')).forEach(function(elem) {
                elem.classList.remove('hide');
            });
        }
        document.querySelector('.game-details-container').classList.remove('hide');
        document.querySelector('.img-lg').classList.remove('hide');
        document.querySelector('.btn-play').classList.remove('hide');

        player.pauseVideo();
    });

    // Show/hide the up and down arrows for the review depending on scroll height
    document.querySelector('.full-review').addEventListener('scroll', function(event) {
        if (event.target.scrollHeight - event.target.scrollTop > event.target.offsetHeight) {
            document.querySelector('#review-down').innerHTML = '▼';
        } else {
            document.querySelector('#review-down').innerHTML = '';
        }

        if (event.target.scrollTop === 0) {
            document.querySelector('#review-up').innerHTML = '';
        } else {
            document.querySelector('#review-up').innerHTML = '▲';
        }
    });

    window.onresize = function() {
        document.body.height = window.innerHeight;
        document.querySelector('.background-overlay-wrapper').height = window.innerHeight;
    }
    window.onresize();
});

// Enable Array.from in IE
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    return function from(arrayLike) {
      var C = this;
      var items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      var k = 0;
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    };
  }());
}
