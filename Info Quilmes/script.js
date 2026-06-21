// ===== PHOTO CAROUSEL =====
(function () {
  const carousel = document.getElementById('photoCarousel');
  const dotsContainer = document.getElementById('photoDots');
  if (!carousel || !dotsContainer) return;

  const slides = carousel.querySelectorAll('.photo-slide');
  const dots = dotsContainer.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetAuto();
    });
  });

  startAuto();
})();


// ===== NEWS CAROUSELS =====
document.querySelectorAll('.news-section').forEach(section => {
  const track = section.querySelector('.news-track');
  const wrapper = section.querySelector('.news-wrapper');
  const arrows = section.querySelectorAll('.arrow-btn');
  if (!track || !wrapper || arrows.length < 2) return;

  let offset = 0;

  function cardStep() {
    const card = track.querySelector('.news-card');
    if (!card) return 0;
    return card.offsetWidth + 16;
  }

  function maxOffset() {
    const cards = track.querySelectorAll('.news-card');
    const step = cardStep();
    const visible = Math.floor(wrapper.offsetWidth / step);
    return Math.max(0, (cards.length - visible) * step);
  }

  function apply() {
    track.style.transform = `translateX(-${offset}px)`;
  }

  arrows[0].addEventListener('click', () => {
    offset = Math.max(0, offset - cardStep());
    apply();
  });

  arrows[1].addEventListener('click', () => {
    offset = Math.min(maxOffset(), offset + cardStep());
    apply();
  });
});


// ===== NAV ACTIVE STATE =====
// Active class is set in HTML per page.


// ===== BUSINESS CAROUSEL =====
(function () {
  const track = document.querySelector('.bw-track');
  if (!track) return;
  const slides = track.querySelectorAll('.bw-slide');
  const dots = document.querySelectorAll('.bw-dot');
  const prevBtn = document.querySelector('.bw-arr-prev');
  const nextBtn = document.querySelector('.bw-arr-next');
  let cur = 0;
  let timer;

  function bwGoTo(idx) {
    cur = (idx + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(timer); bwGoTo(cur - 1); startBwAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(timer); bwGoTo(cur + 1); startBwAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); bwGoTo(i); startBwAuto(); }));

  function startBwAuto() { timer = setInterval(() => bwGoTo(cur + 1), 5000); }
  startBwAuto();
})();


// ===== ZONA FILTER (SVG MAP) =====
(function () {
  const nameEl = document.getElementById('zona-name');
  const resetBtn = document.getElementById('zona-reset');
  let activeZona = null;

  function applyZonaFilter(zona) {
    const cards = document.querySelectorAll('.news-card, .nll-item');
    cards.forEach(el => {
      el.style.display = (!zona || el.dataset.zona === zona) ? '' : 'none';
    });
    document.querySelectorAll('.news-section, .news-section-static').forEach(sec => {
      if (!zona) { sec.style.display = ''; return; }
      const kids = sec.querySelectorAll('.news-card, .nll-item');
      const anyVisible = Array.from(kids).some(k => k.style.display !== 'none');
      sec.style.display = anyVisible ? '' : 'none';
      const prev = sec.previousElementSibling;
      if (prev && prev.classList.contains('content-divider')) {
        prev.style.display = anyVisible ? '' : 'none';
      }
    });
  }

  document.querySelectorAll('.map-zone').forEach(zone => {
    zone.addEventListener('click', () => {
      const zona = zone.dataset.zona;
      if (activeZona === zona) {
        activeZona = null;
        document.querySelectorAll('.map-zone').forEach(z => z.classList.remove('map-selected'));
        if (nameEl) nameEl.textContent = 'Todos los barrios';
        applyZonaFilter(null);
      } else {
        activeZona = zona;
        document.querySelectorAll('.map-zone').forEach(z => {
          z.classList.toggle('map-selected', z.dataset.zona === zona);
        });
        if (nameEl) nameEl.textContent = zona;
        applyZonaFilter(zona);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeZona = null;
      document.querySelectorAll('.map-zone').forEach(z => z.classList.remove('map-selected'));
      if (nameEl) nameEl.textContent = 'Todos los barrios';
      applyZonaFilter(null);
    });
  }
})();


// ===== ARTICLES DATABASE =====
const ARTICLES_DB = {
  'mundial-2026-expectativa': {
    cat: 'Mundial 2026', catColor: '#1565c0',
    section: 'deportes.html',
    title: 'Mundial 2026: crece la expectativa y los fanáticos ya siguen cada detalle del torneo',
    date: '17 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '5 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/658sr3q401t2kmn9ol7p.webp',
    body: [
      { type: 'lead', text: 'Con el torneo ya en marcha, los quilmeños se preparan para vivir cada partido de Argentina con la emoción que solo un Mundial puede despertar.' },
      { type: 'p', text: 'El Mundial 2026 llegó y, con él, la fiebre futbolística que se apodera de cada rincón del país. En Quilmes, los bares, clubes y espacios públicos ya empezaron a ambientarse para recibir a vecinos y vecinas dispuestos a alentar a la Selección.' },
      { type: 'p', text: 'El Parque Cervecero se convirtió en uno de los puntos de encuentro más populares del distrito. Con pantallas gigantes y capacidad para cientos de personas, ofrece un ambiente festivo y familiar donde la emoción del fútbol se vive en comunidad.' },
      { type: 'h2', text: 'La organización de los espacios públicos' },
      { type: 'p', text: 'El municipio dispuso operativos especiales para los días de partido de Argentina. Habrá mayor presencia policial en los principales puntos de concentración, y los servicios de salud también estarán reforzados.' },
      { type: 'blockquote', text: '"Queremos que los quilmeños disfruten el Mundial de forma segura y organizada", señalaron desde la Secretaría de Gobierno municipal.' },
      { type: 'p', text: 'Argentina integra el Grupo J junto a Argelia, Austria y Jordania. Luego de la contundente victoria por 3 a 0 sobre Argelia —con hat-trick de Lionel Messi—, el equipo de Lionel Scaloni se prepara para enfrentar a Austria el 22 de junio.' },
      { type: 'h2', text: 'La historia que une a Quilmes con el fútbol' },
      { type: 'p', text: 'No es casual que en Quilmes el fútbol genere tanto fervor. La ciudad es cuna del Quilmes Athletic Club, uno de los clubes más históricos del país, con una tradición centenaria en el deporte nacional.' },
      { type: 'p', text: 'Además, varios jugadores quilmeños han vestido la camiseta de distintas selecciones argentinas a lo largo de los años, reforzando ese vínculo entre la comunidad y el deporte más popular del país.' },
    ],
    tags: ['Mundial 2026', 'Argentina', 'Fútbol', 'Quilmes', 'FIFA'],
    related: ['messi-hat-trick-argelia-3-0', 'parque-cervecero-mundial', 'cervecero-gano-torneo-reducido'],
  },

  'messi-hat-trick-argelia-3-0': {
    cat: 'Deportes', catColor: '#1b5e20',
    section: 'deportes.html',
    title: 'Hat-trick de Messi: Argentina aplastó 3–0 a Argelia en su debut mundialista',
    date: '16 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '4 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/658sr3q401t2kmn9ol7p.webp',
    body: [
      { type: 'lead', text: 'Lionel Messi convirtió tres goles y Argentina arrancó el Mundial 2026 con pie derecho al golear 3-0 a Argelia en el partido inaugural del Grupo J.' },
      { type: 'p', text: 'En un estadio repleto de banderas celestes y blancas, la Selección Argentina dejó en claro que llega al torneo en su mejor momento. Messi, en un traje de gala, fue imparable durante los 90 minutos y se convirtió en el protagonista de la noche.' },
      { type: 'p', text: 'El primer gol llegó a los 22 minutos, a través de un penal que el capitán convirtió con absoluta tranquilidad. El segundo, una obra de arte: pique en profundidad, recorte al defensor y definición cruzada que no dio chances al arquero argelino.' },
      { type: 'h2', text: 'El hat-trick que paralizó el país' },
      { type: 'p', text: 'El tercero, el más emotivo, llegó a los 74 minutos: combinación con Lautaro Martínez, pase filtrado y gol ante la mirada de millones de argentinos que festejaron en las plazas, en los bares y en sus casas.' },
      { type: 'blockquote', text: '"Estamos muy contentos con el partido, sabemos que esto recién empieza pero es una gran base para lo que viene", declaró Scaloni en conferencia de prensa.' },
      { type: 'p', text: 'El próximo compromiso de Argentina es el 22 de junio ante Austria, un rival que llega con mucha hambre de puntos luego de empatar con Jordania en su debut.' },
    ],
    tags: ['Messi', 'Argentina', 'Mundial 2026', 'Grupo J', 'Hat-trick'],
    related: ['mundial-2026-expectativa', 'parque-cervecero-mundial', 'cervecero-gano-torneo-reducido'],
  },

  'cervecero-gano-torneo-reducido': {
    cat: 'Quilmes AC', catColor: '#7c3d88',
    section: 'deportes.html',
    title: '"El Cervecero" ganó y momentáneamente entró al Torneo Reducido',
    date: '14 de junio de 2026',
    author: 'Redacción Deportes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/4109mql278t35sop6rnk.webp',
    body: [
      { type: 'lead', text: 'Quilmes Athletic Club logró una importante victoria de local que lo coloca, de manera momentánea, en zona de clasificación al Torneo Reducido.' },
      { type: 'p', text: 'En un partido vibrante en La Barranca, el equipo conducido por Leandro Gracián se impuso con autoridad y festejó ante su gente. El resultado mantiene vivas las esperanzas de un final de temporada ilusionante.' },
      { type: 'p', text: 'El gol de la victoria llegó en el segundo tiempo, luego de un primer tiempo trabado y sin muchas ocasiones claras. La pelota parada fue clave para el triunfo del Cervecero.' },
      { type: 'blockquote', text: '"Era importante ganar para seguir con esa racha de confianza que veníamos construyendo. El equipo dio una respuesta muy seria", afirmó Gracián.' },
      { type: 'p', text: 'El próximo partido de Quilmes AC es el fin de semana en condición de visitante. La chance de mantenerse en zona de Torneo Reducido dependerá también de los resultados de los rivales directos.' },
    ],
    tags: ['Quilmes AC', 'Primera Nacional', 'Torneo Reducido', 'Fútbol'],
    related: ['mate-empate-penal', 'gracian-racha-confianza', 'leonas-barrionuevo-charla-quilmes'],
  },

  'mate-empate-penal': {
    cat: 'Deportes', catColor: '#7c3d88',
    section: 'deportes.html',
    title: 'Al "Mate" se lo empataron sobre el final con un penal dudoso',
    date: '15 de junio de 2026',
    author: 'Redacción Deportes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/sn5p0k23or97q1tm68l4.webp',
    body: [
      { type: 'lead', text: 'El equipo quilmeño dominó durante gran parte del encuentro pero vio frustrado su triunfo por una polémica decisión arbitral en los minutos finales.' },
      { type: 'p', text: 'El árbitro señaló un penal que encendió la indignación en La Barranca y en las redes sociales. Las imágenes mostraron un contacto mínimo que muchos especialistas cuestionaron.' },
      { type: 'p', text: 'Pese al empate, el equipo mostró buenas cosas en el campo y la parcialidad reconoció el esfuerzo con una ovación al finalizar el partido.' },
      { type: 'blockquote', text: '"Fútbol es así, a veces el resultado no refleja lo que pasó en el campo. Seguimos adelante", expresó uno de los jugadores al término del partido.' },
      { type: 'p', text: 'El resultado no cierra puertas pero obliga al equipo a ganar en los próximos compromisos para no alejarse de la zona de clasificación.' },
    ],
    tags: ['Quilmes AC', 'Primera Nacional', 'Fútbol'],
    related: ['cervecero-gano-torneo-reducido', 'gracian-racha-confianza'],
  },

  'gracian-racha-confianza': {
    cat: 'Deportes', catColor: '#7c3d88',
    section: 'deportes.html',
    title: 'Leandro Gracián: "Era importante ganar para seguir con esa racha de confianza"',
    date: '14 de junio de 2026',
    author: 'Redacción Deportes',
    readtime: '4 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/ln39pk4s86m5o17t2rq0.webp',
    body: [
      { type: 'lead', text: 'El entrenador del Cervecero habló en conferencia de prensa tras el triunfo y destacó la solidez anímica del grupo.' },
      { type: 'p', text: 'Leandro Gracián no ocultó su satisfacción tras el pitazo final. El técnico explicó que el equipo trabajó muy bien la semana y que eso se reflejó en el campo.' },
      { type: 'p', text: 'El estratega también valoró el apoyo de la hinchada: "El público fue fundamental, nos empujó en los momentos difíciles y eso se siente adentro de la cancha".' },
      { type: 'blockquote', text: '"Era importante ganar para seguir con esa racha de confianza. Cuando el grupo cree en lo que hace, los resultados llegan", expresó Gracián.' },
      { type: 'p', text: 'El DT también habló sobre el sistema de juego y los próximos objetivos: "Partido a partido. Pensamos en el próximo encuentro y en dar el máximo siempre".' },
    ],
    tags: ['Quilmes AC', 'Gracián', 'Primera Nacional', 'Fútbol'],
    related: ['cervecero-gano-torneo-reducido', 'mate-empate-penal'],
  },

  'leonas-barrionuevo-charla-quilmes': {
    cat: 'Hockey', catColor: '#00695c',
    section: 'deportes.html',
    title: 'Noel Barrionuevo, histórica jugadora de "Las Leonas", brindará una charla en Quilmes',
    date: '12 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/0m8qs5lr72o16p3tn49k.webp',
    body: [
      { type: 'lead', text: 'La exjugadora de la selección argentina de hockey brindará una charla motivacional y deportiva abierta a la comunidad quilmeña.' },
      { type: 'p', text: 'Noel Barrionuevo, medalla de oro olímpica y emblema de las Leonas, visitará Quilmes para compartir su experiencia con jóvenes deportistas y la comunidad en general.' },
      { type: 'p', text: 'El evento será de entrada gratuita y contará con espacio para preguntas del público. Se espera una importante concurrencia, especialmente de chicas que practican hockey en los clubes locales.' },
      { type: 'blockquote', text: '"El deporte cambió mi vida y quiero transmitir ese mensaje a las nuevas generaciones", dijo Barrionuevo en declaraciones previas al evento.' },
      { type: 'p', text: 'La charla está organizada por el Club Quilmes Athletic junto a la Secretaría de Deportes del municipio. Se realizará en el auditorio del club, con capacidad para 300 personas.' },
    ],
    tags: ['Hockey', 'Las Leonas', 'Quilmes', 'Deporte femenino'],
    related: ['cervecero-gano-torneo-reducido', 'gracian-racha-confianza'],
  },

  'parque-cervecero-mundial': {
    cat: 'Comunidad', catColor: '#e65100',
    section: 'index.html',
    title: 'El Mundial se vive en el Parque Cervecero de Quilmes',
    date: '13 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/9s0kqn83oml1476r2tp5.webp',
    body: [
      { type: 'lead', text: 'El icónico Parque Cervecero de Quilmes se convierte en el gran escenario popular para seguir el Mundial 2026 con pantallas gigantes y ambiente festivo.' },
      { type: 'p', text: 'A minutos de cada partido de Argentina, el Parque Cervecero se llena de familias, jóvenes y hinchas de todas las edades que eligen ese espacio para vivir la emoción mundialista en comunidad.' },
      { type: 'p', text: 'El lugar cuenta con pantallas LED de gran formato, puestos gastronómicos, sectores para niños y un ambiente seguro. La organización corre por cuenta del municipio junto a vecinos del área.' },
      { type: 'blockquote', text: '"Vinimos con toda la familia porque nos gusta festejar juntos. El ambiente es increíble", contaron vecinos de Quilmes Centro.' },
      { type: 'p', text: 'Durante el partido de Argentina frente a Argelia, que terminó 3 a 0, cada gol fue celebrado con euforia. Las imágenes del festejo se viralizaron en las redes sociales mostrando el espíritu quilmeño.' },
    ],
    tags: ['Mundial 2026', 'Parque Cervecero', 'Quilmes', 'Argentina'],
    related: ['mundial-2026-expectativa', 'messi-hat-trick-argelia-3-0'],
  },

  'cfk-caravana-quilmenos': {
    cat: 'Política', catColor: '#880e4f',
    section: 'general.html',
    title: 'Centenares de quilmeños fueron en caravana a pedir la libertad de CFK',
    date: '15 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '4 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/1tp7942rql58s36kmn0o.webp',
    body: [
      { type: 'lead', text: 'Una numerosa columna de quilmeños se sumó a la caravana nacional en apoyo a Cristina Fernández de Kirchner, con banderas y consignas en favor de su liberación.' },
      { type: 'p', text: 'La convocatoria, organizada por distintos espacios del peronismo y agrupaciones populares del distrito, reunió cientos de vehículos y personas que marcharon desde el centro de Quilmes.' },
      { type: 'p', text: 'La movilización se realizó en forma pacífica y estuvo encabezada por referentes locales y nacionales del espacio kirchnerista, que reclamaron por lo que consideran una persecución judicial.' },
      { type: 'blockquote', text: '"Estamos acá porque creemos que hay una injusticia. El pueblo la va a defender siempre", expresó una de las participantes.' },
      { type: 'p', text: 'El operativo de seguridad fue considerable y no se registraron incidentes durante la caravana, que se extendió por varias horas.' },
    ],
    tags: ['Política', 'CFK', 'Kirchnerismo', 'Quilmes'],
    related: ['megaoperativo-drones-extorsiones', 'ranchadazo-solidario-solano'],
  },

  'megaoperativo-drones-extorsiones': {
    cat: 'Policiales', catColor: '#b71c1c',
    section: 'general.html',
    title: 'Megaoperativo con drones desarticuló banda que realizaba extorsiones carcelarias',
    date: '14 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '4 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/1tp7942rql58s36kmn0o.webp',
    body: [
      { type: 'lead', text: 'Un operativo conjunto entre la Policía Bonaerense y la Procuración permitió desarticular una organización criminal que extorsionaba a familias utilizando líneas carcelarias.' },
      { type: 'p', text: 'El procedimiento, que duró más de cuatro horas, combinó tecnología de drones para el seguimiento de los involucrados con allanamientos simultáneos en distintos puntos de Quilmes y Berazategui.' },
      { type: 'p', text: 'Según las fuentes consultadas, la banda operaba desde dentro de una unidad penitenciaria bonaerense, amenazando a vecinos del distrito con falsas deudas o supuestas represalias contra familiares.' },
      { type: 'blockquote', text: '"Este tipo de operativos demuestra que las fuerzas de seguridad están a la altura para enfrentar las nuevas modalidades delictivas", indicaron desde la Policía Bonaerense.' },
      { type: 'p', text: 'Hay cuatro detenidos y la investigación continúa abierta. Las autoridades no descartan nuevas detenciones en los próximos días.' },
    ],
    tags: ['Policiales', 'Extorsión', 'Quilmes', 'Operativo policial'],
    related: ['incendio-bernal-oeste', 'cfk-caravana-quilmenos'],
  },

  'incendio-bernal-oeste': {
    cat: 'Policiales', catColor: '#b71c1c',
    section: 'general.html',
    title: 'Incendio destruyó un hogar en Bernal Oeste y dejó a un hombre gravemente herido',
    date: '16 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/s30kolq9r18476p25tmn.webp',
    body: [
      { type: 'lead', text: 'Las llamas consumieron rápidamente una vivienda del barrio y un vecino que intentó colaborar sufrió quemaduras graves.' },
      { type: 'p', text: 'El siniestro se desató en horas de la madrugada en una casa ubicada en el barrio Ferruglio de Bernal Oeste. Los bomberos llegaron rápidamente pero el fuego ya había comprometido la mayor parte de la estructura.' },
      { type: 'p', text: 'Un vecino que intentó colaborar sufrió quemaduras de segundo grado en brazos y torso, y fue trasladado al Hospital Iriarte donde permanece internado en estado grave.' },
      { type: 'blockquote', text: '"El hombre actuó con una valentía impresionante intentando salvar sus cosas, pero el fuego fue más rápido", relató un testigo de los hechos.' },
      { type: 'p', text: 'Las causas del incendio están siendo investigadas. No se descarta un cortocircuito eléctrico como origen del fuego. Los damnificados recibieron asistencia del municipio.' },
    ],
    tags: ['Incendio', 'Bernal', 'Policiales', 'Quilmes'],
    related: ['megaoperativo-drones-extorsiones', 'dbf-stream-primer-canal-quilmes'],
  },

  'dbf-stream-primer-canal-quilmes': {
    cat: 'Sociedad', catColor: '#1a237e',
    section: 'general.html',
    title: 'DBF.STREAM: nació el primer canal de streaming de Quilmes con tecnología 4K y programación diaria',
    date: '16 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '4 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/m94p0sl26kqonrt83157.webp',
    body: [
      { type: 'lead', text: 'Un equipo de jóvenes quilmeños lanzó el primer canal de streaming local del distrito, con producción propia, calidad profesional y contenido las 24 horas.' },
      { type: 'p', text: 'DBF.STREAM es el resultado de años de trabajo de un grupo de comunicadores y técnicos de Quilmes que decidieron apostar por el contenido local en el formato que conquista al público de hoy.' },
      { type: 'p', text: 'La plataforma emite programas de noticias, entretenimiento, deportes y cultura con un fuerte anclaje en la identidad quilmeña. La tecnología 4K garantiza una calidad de imagen superior a la de la televisión convencional.' },
      { type: 'blockquote', text: '"Quilmes tiene historias increíbles para contar y gente con muchísimo talento. Queremos ser la ventana que muestra eso al mundo", explicó uno de los fundadores del canal.' },
      { type: 'p', text: 'El canal puede verse desde cualquier dispositivo con conexión a internet y ya suma miles de seguidores en sus primeras semanas de vida. El proyecto generó además varios puestos de trabajo en el sector audiovisual local.' },
    ],
    tags: ['Medios', 'Streaming', 'Quilmes', 'Tecnología', 'Jóvenes'],
    related: ['ranchadazo-solidario-solano', 'incendio-bernal-oeste'],
  },

  'ranchadazo-solidario-solano': {
    cat: 'Comunidad', catColor: '#e65100',
    section: 'index.html',
    title: 'Ranchadazo solidario en Solano: realizarán una nueva jornada para asistir a personas en situación de calle',
    date: '14 de junio de 2026',
    author: 'Redacción Info Quilmes',
    readtime: '3 min de lectura',
    img: 'https://www.infoquilmes.com.ar/fotos/2026/06/w600/m94p0sl26kqonrt83157.webp',
    body: [
      { type: 'lead', text: 'Vecinos y organizaciones sociales de Solano se unen nuevamente para una jornada de asistencia a personas en situación de calle, con comida, abrigo e información sobre recursos disponibles.' },
      { type: 'p', text: 'El "Ranchadazo solidario" es una iniciativa que nació hace varios años en el barrio de Solano y que con el tiempo fue creciendo y sumando voluntarios de toda la región.' },
      { type: 'p', text: 'La propuesta incluye reparto de viandas calientes, entrega de ropa de abrigo y frazadas, y la presencia de trabajadores sociales que orientan a quienes necesitan acceder a programas oficiales de asistencia.' },
      { type: 'blockquote', text: '"No queremos que nadie pase frío ni hambre en nuestro barrio. Mientras podamos ayudar, lo vamos a seguir haciendo", expresó una de las coordinadoras del evento.' },
      { type: 'p', text: 'Quienes quieran sumarse pueden hacerlo llevando alimentos no perecederos o ropa en buen estado al punto de encuentro, que se dará a conocer con antelación a través de las redes sociales de los organizadores.' },
    ],
    tags: ['Solidaridad', 'Solano', 'Comunidad', 'Voluntariado'],
    related: ['parque-cervecero-mundial', 'cfk-caravana-quilmenos'],
  },
};


// ===== ARTICLE NAVIGATION =====
const NEWS_SLUGS = {
  'Megaoperativo con drones':            'megaoperativo-drones-extorsiones',
  'banda de entraderas':                 'megaoperativo-drones-extorsiones',
  'celular en un kiosco':                'megaoperativo-drones-extorsiones',
  'licencia de conducir trucha':         'megaoperativo-drones-extorsiones',
  'oficinas de AySA':                    'megaoperativo-drones-extorsiones',
  'caravana a pedir la libertad de CFK': 'cfk-caravana-quilmenos',
  'Myriam Bregman':                      'cfk-caravana-quilmenos',
  'trabajos de bacheo':                  'ranchadazo-solidario-solano',
  'Ranchadazo solidario':                'ranchadazo-solidario-solano',
  'alumna de Ezpeleta':                  'ranchadazo-solidario-solano',
  'Cuestión de Peso':                    'parque-cervecero-mundial',
  'quilmeño en un incendio en España':   'incendio-bernal-oeste',
  'Mundial 2026':                        'mundial-2026-expectativa',
  '"Mate" se lo empataron':              'mate-empate-penal',
  'racha de confianza':                  'gracian-racha-confianza',
  'Deportivo Armenio':                   'cervecero-gano-torneo-reducido',
  'Parque Cervecero':                    'parque-cervecero-mundial',
  'rescindieron sus contratos':          'cervecero-gano-torneo-reducido',
  'Cervecero" ganó':                     'cervecero-gano-torneo-reducido',
  'Gracián: "Jugamos':                   'gracian-racha-confianza',
  'siniestro vial en Quilmes Oeste':     'megaoperativo-drones-extorsiones',
  'alcoholizado':                        'megaoperativo-drones-extorsiones',
  'Tren Roca':                           'ranchadazo-solidario-solano',
  'DBF.STREAM':                          'dbf-stream-primer-canal-quilmes',
  'incendio en Bernal':                  'incendio-bernal-oeste',
  'Prefectura':                          'megaoperativo-drones-extorsiones',
  'caballos maltratados':                'ranchadazo-solidario-solano',
  'cocaína y balas':                     'megaoperativo-drones-extorsiones',
  'persecución por una entradera':       'megaoperativo-drones-extorsiones',
  'Grupo Halcón':                        'megaoperativo-drones-extorsiones',
  'ayuda económica al QAC':             'cervecero-gano-torneo-reducido',
  'Gimnasia y Tiro':                     'cervecero-gano-torneo-reducido',
  'Las Leonas':                          'leonas-barrionuevo-charla-quilmes',
  'Hat-trick de Messi':                  'messi-hat-trick-argelia-3-0',
  'hat-trick':                           'messi-hat-trick-argelia-3-0',
};

function getArticleHref(titleText) {
  for (const [key, slug] of Object.entries(NEWS_SLUGS)) {
    if (titleText.includes(key)) return 'article.html?slug=' + slug;
  }
  return 'article.html?slug=mundial-2026-expectativa';
}

document.querySelectorAll('.news-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const title = card.querySelector('.nc-title')?.textContent || '';
    window.location.href = getArticleHref(title);
  });
});

const fscCard = document.querySelector('.featured-single-card');
if (fscCard) {
  fscCard.style.cursor = 'pointer';
  fscCard.addEventListener('click', () => {
    const title = fscCard.querySelector('.fsc-title')?.textContent || '';
    window.location.href = getArticleHref(title);
  });
}

document.querySelectorAll('.nll-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const title = item.querySelector('.nll-title')?.textContent || '';
    window.location.href = getArticleHref(title);
  });
});

document.querySelectorAll('.btn-leer-nota').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'article.html?slug=mundial-2026-expectativa';
  });
});

document.querySelectorAll('.btn-mundial').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'article.html?slug=mundial-2026-expectativa';
  });
});


// ===== ARTICLE PAGE =====
function initArticlePage() {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const art = ARTICLES_DB[slug] || ARTICLES_DB['mundial-2026-expectativa'];

  document.title = art.title + ' – Info Quilmes';

  const badge = document.getElementById('ap-cat');
  if (badge) { badge.textContent = art.cat; badge.style.background = art.catColor; }

  const sectionEl = document.getElementById('ap-section');
  if (sectionEl) { sectionEl.textContent = art.cat; sectionEl.href = art.section; }

  const titleEl = document.getElementById('ap-title');
  if (titleEl) titleEl.textContent = art.title;

  const dateEl = document.getElementById('ap-date');
  const authorEl = document.getElementById('ap-author');
  const timeEl = document.getElementById('ap-readtime');
  if (dateEl) dateEl.textContent = art.date;
  if (authorEl) authorEl.textContent = art.author;
  if (timeEl) timeEl.textContent = art.readtime;

  const hero = document.getElementById('ap-hero');
  if (hero) hero.style.backgroundImage = "url('" + art.img + "')";

  const body = document.getElementById('ap-body');
  if (body) {
    body.innerHTML = art.body.map(block => {
      if (block.type === 'lead') return '<p class="art-lead">' + block.text + '</p>';
      if (block.type === 'p') return '<p>' + block.text + '</p>';
      if (block.type === 'h2') return '<h2>' + block.text + '</h2>';
      if (block.type === 'blockquote') return '<blockquote>' + block.text + '</blockquote>';
      return '';
    }).join('');
  }

  const tagsEl = document.getElementById('ap-tags');
  if (tagsEl && art.tags) {
    tagsEl.innerHTML = art.tags.map(t => '<span class="art-tag">' + t + '</span>').join('');
  }

  const relatedEl = document.getElementById('ap-related');
  if (relatedEl && art.related) {
    relatedEl.innerHTML = art.related.map(rslug => {
      const r = ARTICLES_DB[rslug];
      if (!r) return '';
      return '<div class="art-related-item" onclick="window.location.href=\'article.html?slug=' + rslug + '\'">'
        + '<div class="art-related-thumb" style="background-image:url(\'' + r.img + '\')"></div>'
        + '<div><p class="art-related-ttl">' + r.title + '</p>'
        + '<p class="art-related-meta">' + r.date + '</p></div>'
        + '</div>';
    }).join('');
  }

  // Share buttons
  const shareUrl = encodeURIComponent(location.href);
  const shareText = encodeURIComponent(art.title + ' – Info Quilmes');
  const fbBtn = document.getElementById('share-fb');
  const twBtn = document.getElementById('share-tw');
  const wpBtn = document.getElementById('share-wp');
  const cpBtn = document.getElementById('share-copy');
  if (fbBtn) fbBtn.onclick = () => window.open('https://www.facebook.com/sharer/sharer.php?u=' + shareUrl, '_blank');
  if (twBtn) twBtn.onclick = () => window.open('https://twitter.com/intent/tweet?url=' + shareUrl + '&text=' + shareText, '_blank');
  if (wpBtn) wpBtn.onclick = () => window.open('https://wa.me/?text=' + shareText + '%20' + shareUrl, '_blank');
  if (cpBtn) cpBtn.onclick = () => {
    navigator.clipboard.writeText(location.href).then(() => {
      cpBtn.textContent = '¡Copiado!';
      setTimeout(() => { cpBtn.textContent = 'Copiar enlace'; }, 2000);
    });
  };
}

if (document.getElementById('ap-body')) {
  initArticlePage();
}
