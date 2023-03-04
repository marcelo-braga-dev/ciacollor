import './bootstrap';

//ARGON
import '../argon/vendor/@fortawesome/fontawesome-free/css/all.min.css';
// Argon - fim

// Nucleo Icons
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/nucleo-svg.css';
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/argon-dashboard.css';

import '../css/styles.css';

// {/* <!--   Core JS Files   --> */}
import '../assets/argon/bootstrap5/js/core/popper.min';
import '../assets/argon/bootstrap5/js/core/bootstrap.min';
import '../assets/argon/bootstrap5/js/argon-dashboard.min';
// Bootstrap5 Argon - fim

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
