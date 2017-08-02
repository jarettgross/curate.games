document.addEventListener('DOMContentLoaded', function(event) {

    document.querySelector('#btn-menu').addEventListener('click', function() {
        document.querySelector('.sidebar-container').classList.add('sidebar-container-extend');
    });
});
