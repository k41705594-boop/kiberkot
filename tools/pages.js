// Generates SEO landing pages per niche + sitemap.xml. Run: node tools/pages.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), SITE = 'https://xn--90aogcl.site';
const WA = t => 'https://wa.me/79059520727?text=' + encodeURIComponent('Здравствуйте! ' + t);

const P = [
 {slug:'sayt-dlya-salona-krasoty', h:'Сайт для салона красоты', q:'сайт для салона красоты',
  lead:'Онлайн-запись к мастеру, прайс, фото работ и отзывы с Карт. Клиентки записываются сами — даже ночью.',
  items:['Онлайн-запись к мастеру и на услугу','Прайс по категориям: волосы, ногти, брови','Портфолио работ каждого мастера','Отзывы с Яндекс.Карт','Акции и сертификаты','Кнопки WhatsApp и Telegram'],
  price:'10 000', term:'3–5 дней',
  faq:[['Можно ли записываться к конкретному мастеру?','Да: клиент выбирает мастера, услугу и свободное время, а вам приходит уведомление.'],['Как менять цены?','Покажем за 10 минут, или напишите нам — поменяем в тот же день.']]},
 {slug:'sayt-dlya-barbershopa', h:'Сайт для барбершопа', q:'сайт для барбершопа',
  lead:'Стильный сайт с записью к барберу, ценами и фото стрижек. Без шаблонов — под характер вашего места.',
  items:['Запись к барберу на время','Цены: стрижка, борода, комплекс','Фото стрижек и интерьера','Карточки барберов','Отзывы с Карт','Кнопка «Позвонить» и маршрут'],
  price:'10 000', term:'3–5 дней',
  faq:[['Подойдёт, если барберов несколько?','Да, у каждого своё расписание и свои фото работ.'],['Можно связать с ботом в Telegram?','Да, бот для записи — от 5 000 ₽, работает вместе с сайтом.']]},
 {slug:'sayt-dlya-manikyura', h:'Сайт для мастера маникюра', q:'сайт для мастера маникюра',
  lead:'Личная страница мастера: прайс, работы, отзывы и запись. Удобнее, чем переписка в директе.',
  items:['Запись на свободное окошко','Прайс: маникюр, педикюр, дизайн','Галерея работ','Отзывы клиенток','Адрес и как добраться','Напоминание о записи'],
  price:'7 000', term:'2–3 дня',
  faq:[['Мне нужен целый сайт?','Часто хватает лендинга — одной страницы за 7 000 ₽. Подскажем на демо.'],['Можно взять фото из Instagram?','Да, просто пришлите ссылку — перенесём сами.']]},
 {slug:'sayt-dlya-avtoservisa', h:'Сайт для автосервиса', q:'сайт для автосервиса',
  lead:'Услуги и цены, запись на ремонт, заявка с фото поломки. Клиент сразу понимает, сколько стоит и когда приехать.',
  items:['Запись на ремонт и ТО','Цены по видам работ','Заявка с фото поломки','Расчёт примерной стоимости','Отзывы с Карт','Маршрут и часы работы'],
  price:'10 000', term:'3–5 дней',
  faq:[['Можно принимать заявки с фото?','Да, клиент прикрепляет фото, заявка приходит вам в WhatsApp или Telegram.'],['Найдут ли нас в поиске?','Настраиваем страницы под запросы «автосервис + район» и добавляем на Карты.']]},
 {slug:'sayt-dlya-remonta-obuvi', h:'Сайт для мастерской по ремонту обуви', q:'сайт для ремонта обуви',
  lead:'Цены на ремонт, фото «до и после», заявка с фото. Наш первый проект — именно такая мастерская.',
  items:['Прайс по видам ремонта','Фото «до / после»','Заявка с фото обуви','Сроки ремонта','Изготовление ключей и другие услуги','Адрес и часы работы'],
  price:'10 000', term:'3–5 дней',
  faq:[['Есть пример?','Да — «Подкаблучник» и «На Чуйкова» в разделе работ ниже, откройте с телефона.'],['Сколько стоит поддержка?','От 500 ₽ в месяц: меняем цены и чиним, если что-то сломалось.']]},
 {slug:'sayt-dlya-konditerskoy', h:'Сайт для кондитерской', q:'сайт для кондитерской',
  lead:'Каталог тортов и десертов с ценами, заказ в один клик, доставка. Заказы — сразу в мессенджер.',
  items:['Каталог с фото и ценами','Корзина и заказ','Торты на заказ: начинки, вес, дата','Доставка и самовывоз','Заказы сразу в Telegram','Отзывы покупателей'],
  price:'20 000', term:'5–10 дней',
  faq:[['Если товаров мало?','Начните с сайта за 10 000 ₽ — каталог добавим позже.'],['Можно бота вместо сайта?','Да, бот-каталог — от 7 000 ₽: витрина и заказ прямо в Telegram.']]},
 {slug:'sayt-dlya-massazhista', h:'Сайт для массажиста', q:'сайт для массажиста',
  lead:'Виды массажа, цены, абонементы и онлайн-запись. Сайт, которому доверяют с первого экрана.',
  items:['Виды массажа и длительность','Цены и абонементы','Онлайн-запись','Сертификаты и образование','Отзывы клиентов','Подарочные сертификаты'],
  price:'7 000', term:'2–3 дня',
  faq:[['Работаю на дому — подойдёт?','Да, укажем район и как добраться, а точный адрес — после записи.'],['Можно продавать сертификаты?','Да, с оплатой или по заявке в мессенджер.']]},
 {slug:'bot-dlya-zapisi-klientov', h:'Бот для записи клиентов в Telegram', q:'бот для записи клиентов',
  lead:'Клиент сам выбирает услугу, мастера и время, бот напоминает о визите. Вы больше не переписываетесь часами.',
  items:['Выбор услуги, мастера и времени','Напоминание за 2 часа','Перенос и отмена записи','Уведомления вам о каждой записи','Ответы на частые вопросы','Работает 24/7'],
  price:'5 000', term:'2–4 дня',
  faq:[['Нужен ли сайт?','Нет, бот работает сам. Но вместе с сайтом записей больше.'],['Сложно ли пользоваться?','Нет: клиент нажимает кнопки, вы видите записи в Telegram.']]},
 {slug:'zakazat-lending', h:'Заказать лендинг недорого', q:'заказать лендинг',
  lead:'Одна продающая страница под услугу или акцию за 2–3 дня. Текст, дизайн и заявки в мессенджер — под ключ.',
  items:['Продающий текст — пишем сами','Дизайн без шаблонов','Удобно с телефона','Заявки в WhatsApp и Telegram','Быстрая загрузка','Подключение домена'],
  price:'7 000', term:'2–3 дня',
  faq:[['Чем лендинг отличается от сайта?','Лендинг — одна страница под одну задачу. Сайт — несколько разделов.'],['Можно потом расширить?','Да, лендинг легко превратить в полный сайт.']]},
 {slug:'sayt-vizitka', h:'Сайт-визитка для бизнеса', q:'сайт-визитка',
  lead:'Кто вы, что делаете, сколько стоит и как связаться — на одной красивой странице. Чтобы клиенту было куда прислать ссылку.',
  items:['О вас и ваших услугах','Цены','Фото работ','Контакты и карта','Кнопки мессенджеров','Ваш домен'],
  price:'7 000', term:'2–3 дня',
  faq:[['Сколько стоит домен?','Обычно 200–900 ₽ в год, поможем выбрать и подключить.'],['Есть ли ежемесячная плата?','Нет, сайт оплачивается один раз. Поддержка — по желанию.']]},
];

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const page = p => {
  const url = `${SITE}/${p.slug}/`, title = `${p.h} — от ${p.price} ₽ за ${p.term} | BLINK`;
  const desc = `${p.h} под ключ: ${p.lead.split('.')[0].toLowerCase()}. От ${p.price} ₽, ${p.term}. Демо бесплатно — платите, когда понравилось.`;
  const ld = {"@context":"https://schema.org","@graph":[
    {"@type":"Service","name":p.h,"serviceType":p.q,"url":url,"areaServed":"RU","provider":{"@type":"Organization","name":"BLINK","url":SITE+'/',"telephone":"+79059520727"},
     "offers":{"@type":"Offer","price":p.price.replace(/\s/g,''),"priceCurrency":"RUB"}},
    {"@type":"FAQPage","mainEntity":p.faq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"BLINK","item":SITE+'/'},{"@type":"ListItem","position":2,"name":p.h,"item":url}]}]};
  const others = P.filter(o=>o!==p).map(o=>`<a href="/${o.slug}/">${o.h}</a>`).join('');
  return `<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/img/og.png"><meta property="og:url" content="${url}"><meta property="og:type" content="website">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230a0a0a'/%3E%3Ctext x='16' y='24' font-family='Georgia,serif' font-size='24' text-anchor='middle' fill='%23ff2d1a'%3E%E2%9C%B3%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oranienbaum&family=Inter+Tight:wght@400;500&display=swap">
<link rel="stylesheet" href="/css/niche.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head><body>
<header class="top"><div class="in pad"><a href="/">BLINK®</a><nav><a href="/#services">Тарифы</a><a href="/#works">Работы</a><a href="/#calc">Расчёт цены</a></nav><a href="tel:+79059520727">+7 905 952-07-27</a></div></header>
<main>
<section class="hero pad">
  <p class="crumbs"><a href="/">BLINK</a> / ${esc(p.h)}</p>
  <h1>${esc(p.h)}<span class="ast">✳</span></h1>
  <div class="hrow"><p class="lead">${esc(p.lead)}</p>
  <div class="cta"><div class="pr"><small>от</small>${p.price}<i>₽</i></div><span>${p.term} · демо бесплатно</span>
  <a class="go" href="${WA('Хочу: '+p.h.toLowerCase()+'. Можно бесплатное демо?')}" target="_blank" rel="noopener">Получить демо бесплатно →</a></div></div>
</section>
<section class="blk pad"><div class="idx"><div class="k">Что будет на сайте <small>(${p.items.length})</small></div>
  <ol class="items">${p.items.map((t,i)=>`<li><i>0${i+1}</i>${esc(t)}</li>`).join('')}</ol></div></section>
<section class="blk pad"><div class="idx"><div class="k">Как работаем <small>(3)</small></div><div class="rows">
  <div class="r1"><b><i class="n">(1)</i> Знакомство</b><span>Рассказываете об услугах, ценах и графике</span><em>15 минут</em></div>
  <div class="r1"><b><i class="n">(2)</i> Бесплатное демо</b><span>Собираем сайт с вашими данными и показываем вживую</span><em>1–2 дня</em></div>
  <div class="r1"><b><i class="n">(3)</i> Оплата и запуск</b><span>Понравилось — оплачиваете, подключаем домен и запускаем</span><em>1–3 дня</em></div>
</div></div></section>
<section class="blk pad"><div class="idx"><div class="k">Работы <small>(3)</small></div><div class="works">
  <a href="https://k41705594-boop.github.io/podkabluchnik/" target="_blank" rel="noopener"><img src="/img/podkabluchnik.jpg" alt="Сайт мастерской «Подкаблучник»" loading="lazy"><span>Подкаблучник</span></a>
  <a href="https://k41705594-boop.github.io/masterskaya-chuykova/" target="_blank" rel="noopener"><img src="/img/masterskaya-chuykova.jpg" alt="Сайт мастерской «На Чуйкова»" loading="lazy"><span>На Чуйкова</span></a>
  <a href="https://k41705594-boop.github.io/mira-beauty/" target="_blank" rel="noopener"><img src="/img/mira-beauty.jpg" alt="Сайт студии красоты MIRA" loading="lazy"><span>Студия MIRA</span></a>
</div></div></section>
<section class="blk pad"><div class="idx"><div class="k">Вопросы <small>(${p.faq.length + 1})</small></div><div class="rows">
  ${p.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n  ')}
  <details><summary>Что если не понравится?</summary><p>Демо бесплатное. Не понравилось — ничего не платите. Работаем онлайн с любым городом России.</p></details>
</div></div></section>
<section class="blk pad"><div class="idx"><div class="k">Ещё делаем</div><div class="more">${others}</div></div></section>
</main>
<footer class="foot pad"><h2>Давайте обсудим<span class="ast">✳</span></h2>
  <p class="links"><a href="tel:+79059520727">+7 905 952-07-27</a><a href="https://wa.me/79059520727" target="_blank" rel="noopener">WhatsApp ↗</a><a href="https://t.me/sibir_21" target="_blank" rel="noopener">Telegram ↗</a><a href="https://max.ru/" target="_blank" rel="noopener">MAX ↗</a></p>
  <p class="legal">© 2026 BLINK® · сайты и боты для бизнеса · <a href="/">блинк.site</a></p></footer>
<a class="fab" href="${WA('Хочу: '+p.h.toLowerCase()+'. Можно бесплатное демо?')}" target="_blank" rel="noopener">Написать в WhatsApp ↗</a>
</body></html>
`;
};

for (const p of P) { const d = path.join(ROOT, p.slug); fs.mkdirSync(d, {recursive:true}); fs.writeFileSync(path.join(d,'index.html'), page(p)); }
const today = new Date().toISOString().slice(0,10);
fs.writeFileSync(path.join(ROOT,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
${P.map(p=>`  <url><loc>${SITE}/${p.slug}/</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(ROOT,'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /tools/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('pages:', P.map(p=>p.slug).join(', '));
