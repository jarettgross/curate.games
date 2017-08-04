document.addEventListener('DOMContentLoaded', function(event) {

    // Pop out sidebar, move main div to right, hide nav bar
    document.querySelector('#btn-menu').addEventListener('click', function() {
        document.querySelector('.sidebar-container').classList.add('sidebar-container-extend');
        document.querySelector('.main').classList.add('main-extend');
        Array.from(document.querySelector('.nav-bar').children).forEach(function(child) {
            child.classList.add('hide');
        });
    });

    // Slide in sidebar, slide main div to left, show nav bar
    document.querySelector('.main').addEventListener('click', function(event) {
        if (event.target.getAttribute('id') !== 'btn-menu' && !event.target.classList.contains('btn')) {
            document.querySelector('.sidebar-container').classList.remove('sidebar-container-extend');
            document.querySelector('.main').classList.remove('main-extend');
            Array.from(document.querySelector('.nav-bar').children).forEach(function(child) {
                child.classList.remove('hide');
            });
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
});
