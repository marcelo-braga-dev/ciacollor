export default function NavMenuToglle() {

    // Toggle Sidenav
    const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
    const iconSidenav = document.getElementById('iconSidenav');
    const sidenav = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';

    if (iconNavbarSidenav) {
        iconNavbarSidenav.addEventListener("click", toggleSidenav);
    }

    if (iconSidenav) {
        iconSidenav.addEventListener("click", toggleSidenav);
    }

    function toggleSidenav() {
        if (body.classList.contains(className)) {
            body.classList.remove(className);
            setTimeout(function () {
                sidenav.classList.remove('bg-white');
            }, 100);
            sidenav.classList.remove('bg-transparent');

        } else {
            body.classList.add(className);
            sidenav.classList.add('bg-white');
            sidenav.classList.remove('bg-transparent');
            iconSidenav.classList.remove('d-none');
        }
    }

    let html = document.getElementsByTagName('html')[0];

    html.addEventListener("click", function (e) {
        if (body.classList.contains('g-sidenav-pinned') && !e.target.classList.contains('sidenav-toggler-line')) {
            body.classList.remove(className);
        }
    });
}
