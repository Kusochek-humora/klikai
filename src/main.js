// общее для всех страниц; своё у страницы — в src/pages/<имя>/<имя>.js
import 'normalize.css';
import './styles/main.scss';

import './components/btn/btn.scss';
import './components/breadcrumbs/breadcrumbs.scss';
import './sections/footer/footer.scss';
import { initHeader } from './sections/header/header';
import { initFeedback } from './sections/feedback/feedback';

initHeader();
initFeedback();
