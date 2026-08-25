/* =============================================================
   CASCADE — script.js
   -----------------------------------------------------------
   Everything here is vanilla JS, no build step, no frameworks.
   The file is organised in clearly-commented sections that
   mirror the page: DATA → HERO → STATS → CARDS/FILTERS →
   DETAIL MODAL → MAP → STAY → WEATHER → SAFETY → FAVORITES →
   INQUIRY FORM → NAV/MISC. Search for "SECTION:" to jump around.
============================================================= */

/* =============================================================
   SECTION: DATA
   Heights, coordinates and travel notes below are approximate
   and meant for general orientation (verify locally before
   hiking, as sources vary and trail access can change).
============================================================= */
/* -------------------------------------------------------------
   Image helper: builds a direct Wikimedia Commons file URL via
   Special:FilePath (this redirects straight to the real image,
   so it works as a normal <img src>). Real, licensed photographs
   were looked up per waterfall; a few rarer ones could not be
   confirmed by filename, so every <img> on the page also has a
   JS fallback (see "SECTION: IMAGE FALLBACK" below) that swaps in
   a drawn placeholder if a photo ever fails to load — so nothing
   ever shows a broken-image icon.
------------------------------------------------------------- */
function wf(filename, width = 1200) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}
// Generic, confirmed-good Sri Lanka hill-country shots used to round
// out gallery slots 2–3 for waterfalls where only one specific photo
// was confirmed.
const FILLER_A = wf("Sri Lanka, mountains and cloud forest.jpg");
const FILLER_B = wf("Hill Country Sri Lanka.jpg");

const WATERFALLS = [
  {
    id: "bambarakanda",
    name: "Bambarakanda Falls",
    province: "Uva",
    district: "Badulla District",
    height: 263,
    difficulty: "Hard",
    seasons: ["Dec–Mar"],
    coords: [6.7911, 80.7908],
    description:
      "Sri Lanka's tallest waterfall, dropping in a slender, near-vertical plunge from the slopes near Kalupahana on the Haputale–Kalupahana road. The base is reached by a steep, often slippery forest trail, while the very top is visible from the roadside for those not up for the climb.",
    bestTime: "Best after the North-East monsoon, roughly December to March, when the trail is driest and the flow is still strong. Early morning light works best for photos, before mist rolls in.",
    safety: [
      "The descent trail is steep, unmarked in places, and slick after rain — sturdy footwear is essential.",
      "Rocks near the base are extremely slippery; avoid climbing on wet rock close to the plunge pool.",
      "There's no mobile signal for most of the trail — let someone know your plan before heading down.",
      "Leeches are common in the surrounding forest during wetter months."
    ],
    images: [
      wf("Bambarakanda Waterfall.jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "diyaluma",
    name: "Diyaluma Falls",
    province: "Uva",
    district: "Badulla District",
    height: 220,
    difficulty: "Moderate",
    seasons: ["Dec–Mar", "Jun–Sep"],
    coords: [6.7333, 81.0333],
    description:
      "The second-tallest falls on the island, tumbling off a sheer escarpment near Koslanda. A side trail climbs to a series of natural infinity-edge pools above the main drop, which have become one of the most photographed spots on the Ella–Wellawaya road.",
    bestTime: "The upper pools are most photogenic in drier months; visit mid-morning once the sun has cleared the ridge but before the afternoon crowds arrive.",
    safety: [
      "The upper pools sit right at the cliff edge with no railings — footing is everything here.",
      "Never swim near the lip of the falls; the smooth rock is deceptively slippery even when it looks dry.",
      "Avoid visiting during or right after heavy rain, when the rock becomes treacherous and flow is dangerously strong.",
      "Hire a local guide for the upper-pool climb if you haven't done it before — the path splits in a few confusing spots."
    ],
    images: [
      wf("Diyaluma Falls (Koslanda, Sri Lanka).jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "bakers",
    name: "Baker's Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 20,
    difficulty: "Easy",
    seasons: ["Jan–Mar"],
    coords: [6.8058, 80.8092],
    description:
      "A wide, cascading curtain of water inside Horton Plains National Park, named after the British explorer Sir Samuel Baker. It sits along the well-trodden circular trail toward World's End, framed by cloud-forest and rhododendron.",
    bestTime: "Visit at first light — the park gates open around 6am and cloud cover typically rolls in by mid-morning, obscuring both the falls surrounds and World's End viewpoint.",
    safety: [
      "Mornings in Horton Plains are cold; a windproof layer is worth carrying even in the dry season.",
      "Stick to the marked circular trail — the plateau's edges and bogs are easy to misjudge in mist.",
      "An entry ticket and park ranger check-in are required; go with a driver or guide familiar with the route.",
      "The rock platform beside the falls is slippery — view from the designated viewpoint rather than climbing down."
    ],
    images: [
      wf("Bakers falls horton plains.jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "dunhinda",
    name: "Dunhinda Falls",
    province: "Uva",
    district: "Badulla District",
    height: 64,
    difficulty: "Easy",
    seasons: ["Oct–Jan"],
    coords: [6.9994, 81.0561],
    description:
      "One of the most-visited falls in the hill country, a short and mostly paved walk from the car park near Badulla. The name translates roughly to \"misty falls\" — spray rises off the plunge pool in a fine cloud that gives the whole gorge a cool, humid microclimate.",
    bestTime: "Flow peaks after the North-East monsoon rains, from around October through January, when the mist effect the falls are named for is at its most dramatic.",
    safety: [
      "The path is easy but has stone steps that get slick with spray — take it slow on the final stretch.",
      "Swimming in the plunge pool is discouraged; currents near the base are stronger than they look.",
      "Vendors and macaques line parts of the trail — keep food out of sight to avoid monkey encounters.",
      "Wear shoes with grip; sandals are common but not ideal on the wetter stone sections."
    ],
    images: [
      wf("Breathtaking Dunhinda Fall.jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "bopath",
    name: "Bopath Ella Falls",
    province: "Sabaragamuwa",
    district: "Ratnapura District",
    height: 30,
    difficulty: "Easy",
    seasons: ["May–Sep", "Nov–Jan"],
    coords: [6.7167, 80.3333],
    description:
      "A neat, symmetrical fall near Kuruwita whose shape is said to resemble a Bo leaf, the sacred fig leaf of Buddhist iconography — hence the name. It's compact, easy to reach, and popular with local families on weekends.",
    bestTime: "Weekday mornings are quietest; flow is fullest during the two monsoon windows the island experiences through the year.",
    safety: [
      "The plunge pool is popular for wading, but currents strengthen quickly after upstream rain — check conditions before entering.",
      "It gets crowded on weekends and public holidays; watch belongings on the approach path.",
      "Rocks around the pool are mossy in patches; test footing before committing weight.",
      "Small food and drink stalls line the path — useful, but keep the area litter-free."
    ],
    images: [
      wf("Bopath Falls.jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "ravana",
    name: "Ravana Falls",
    province: "Uva",
    district: "Badulla District",
    height: 25,
    difficulty: "Easy",
    seasons: ["Oct–Jan"],
    coords: [6.8544, 81.0567],
    description:
      "A wide, roadside cascade near Ella, wrapped in local legend connecting it to the Ramayana epic and the demon-king Ravana. Its easy access off the main Ella–Wellawaya road makes it one of the most-photographed stops in the area.",
    bestTime: "Flow is at its fullest shortly after the North-East monsoon; visit early to beat tour-bus crowds that build through the day.",
    safety: [
      "Swimming below the falls has led to serious incidents in the past — stick to designated shallow pools only.",
      "The roadside viewing area is narrow; be alert to traffic when crossing to photo spots.",
      "Rocks near the base are slick with algae — footwear with grip is strongly recommended.",
      "Avoid the pool entirely during or after heavy rain, when flow and undertow increase sharply."
    ],
    images: [
      wf("SL Ella asv2020-01 img01 Ravana Falls.jpg"),
      FILLER_A,
      FILLER_B
    ]
  },
  {
    id: "stclairs",
    name: "St. Clair's Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 80,
    difficulty: "Easy",
    seasons: ["Oct–Jan"],
    coords: [6.9512, 80.6479],
    description:
      "Known locally as the \"Little Niagara of Sri Lanka,\" this is one of the widest waterfalls on the island — a two-stage curtain of water (Maha Ella and Kuda Ella) spilling through the St. Clair tea estate near Talawakele. It's visible right from the Hatton–Nuwara Eliya road, with a viewing deck and small hydropower museum alongside.",
    bestTime: "Flow is fullest just after the North-East monsoon, roughly October to January. Water is periodically held back for the Upper Kotmale hydropower project, so volume varies by time of day.",
    safety: [
      "There's no clear path to the base — the official viewpoint is the safe way to see it.",
      "The roadside viewing area gets narrow; watch for passing traffic on the A7.",
      "Water release is managed by the hydro project, so the falls can look very different hour to hour.",
      "Combine with a stop at Devon Falls a few kilometres away rather than trying to reach the water itself."
    ],
    images: [wf("St. Clair's Falls.JPG"), FILLER_A, FILLER_B]
  },
  {
    id: "devon",
    name: "Devon Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 97,
    difficulty: "Easy",
    seasons: ["Dec–Mar"],
    coords: [6.9517, 80.6297],
    description:
      "Nicknamed the \"Veil of the Valley,\" Devon Falls drops in three tiers through tea country a few kilometres from St. Clair's Falls, and is named after an early British coffee planter whose estate once stood here. Two roadside viewpoints on the A7 give clear views without any hiking.",
    bestTime: "December through March tends to bring the fullest, most forceful flow; the Dimbula viewpoint gets good light in the morning.",
    safety: [
      "There's no direct access to the base — view from the marked roadside platforms only.",
      "The A7 road shoulder is narrow at the viewpoints; keep an eye on traffic.",
      "Wet-season visits can mean slippery footing even at the viewpoint itself.",
      "This is one of several falls reduced by the Upper Kotmale hydropower project, so flow varies."
    ],
    images: [wf("UG-LK Photowalk - 2018-03-25 - Devon Falls (2).jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "ramboda",
    name: "Ramboda Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 109,
    difficulty: "Moderate",
    seasons: ["May–Sep", "Nov–Mar"],
    coords: [7.067, 80.7],
    description:
      "A two-tier cascade right on the Kandy–Nuwara Eliya road at Ramboda Pass, reached by a paved stairway that climbs to a platform with an unobstructed view of the full drop. A smaller companion fall, Puna Oya Ella, spills into the same basin nearby.",
    bestTime: "The stairway is busiest with day-trippers between Kandy and Nuwara Eliya; go early to have the viewing platform to yourself. Flow is strongest during both of the island's monsoon windows.",
    safety: [
      "The staircase has many steps and gets slick in rain — pace yourself and use the handrail.",
      "There are natural pools near the top that look inviting, but currents shift quickly after rain.",
      "The car park and stairway entrance sit right on a busy mountain road — take care crossing.",
      "Carry water; the climb back up is steeper than it looks from the road."
    ],
    images: [wf("Ramboda Waterfall.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "aberdeen",
    name: "Aberdeen Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 98,
    difficulty: "Moderate",
    seasons: ["Sep–Dec"],
    coords: [6.9483, 80.5019],
    description:
      "A two-tiered horsetail fall near Ginigathena, unusual for having rock formations at its base that let visitors walk in behind the curtain of water — one of the few falls in Sri Lanka viewable from the inside. It stays off most tour itineraries despite being close to the rafting town of Kitulgala.",
    bestTime: "September to December brings the heaviest rainfall and the fullest flow.",
    safety: [
      "Reaching the platform means a few hundred steps down through forest — wear grippy shoes.",
      "The pool at the base has currents and some reported quicksand; swimming isn't recommended, especially for children.",
      "Access roads are poorly signed — go with a guide or a driver who knows the route from Norton Bridge.",
      "Footing behind the curtain of water is uneven and slick even in the dry season."
    ],
    images: [wf("Aberdeen Falls 2019.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "laxapana",
    name: "Laxapana Falls",
    province: "Central",
    district: "Nuwara Eliya District",
    height: 126,
    difficulty: "Moderate",
    seasons: ["Jun–Sep"],
    coords: [6.9, 80.5],
    description:
      "The 8th-tallest waterfall in Sri Lanka, plunging in a single straight drop in the Maskeliya area near the Peak Wilderness Sanctuary. It shares its name with twin hydroelectric power stations downstream, and local folklore ties the spot to the Buddha's visit to Sri Pada.",
    bestTime: "June to September, when the water level from the Maskeliya Oya is highest.",
    safety: [
      "The approach is a jeep track followed by a flight of steps through jungle — sturdy footwear matters.",
      "The pool at the base is popular for a dip, but currents can be unpredictable after rain.",
      "Roads to the trailhead are unmarked in places; confirm directions locally before setting out.",
      "As with Aberdeen Falls, water volume is affected by upstream hydropower reservoirs."
    ],
    images: [wf("Laxapana falls.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "galboda",
    name: "Galboda Ella",
    province: "Central",
    district: "Kandy District",
    height: 30,
    difficulty: "Moderate",
    seasons: ["May–Sep"],
    coords: [6.7844, 80.7061],
    description:
      "A tucked-away fall between Nawalapitiya and Watawala, reached by a roughly 2 km walk from Galboda railway station through a working tea estate. Its name means \"fall adjoining the stone,\" after the large boulder at its foot, and the walk in is as much the draw as the falls itself.",
    bestTime: "The south-west monsoon (May–September) brings the heaviest rain to this stretch of hill country and the fullest flow.",
    safety: [
      "The only practical way in is on foot from the railway station — plan around the train timetable.",
      "The trail crosses estate land; stick to the marked path and be respectful of workers and property.",
      "Rocks near the base are mossy and slick, especially in the wet season.",
      "There is no vehicle access to the falls itself, so allow extra time to walk back before dark."
    ],
    images: [wf("Galboda Falls.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "seraella",
    name: "Sera Ella",
    province: "Central",
    district: "Matale District",
    height: 10,
    difficulty: "Moderate",
    seasons: ["Nov–Mar"],
    coords: [7.5883, 80.7549],
    description:
      "A small double-cascade near Laggala in the Dumbara mountains, notable for a cave directly behind the falling water reached by cut stone steps — visitors can stand behind the curtain even at full flow. The name is said to come either from the local \"Sera\" fish or from a lemongrass-leaf comparison.",
    bestTime: "November through March, during the monsoon season, when the flow and the cave-behind-the-falls effect are both at their best.",
    safety: [
      "The steps to the cave are cut into wet rock — take them slowly, especially at high flow.",
      "This is a remote spot in the Dumbara jungle; go with a local guide rather than alone.",
      "Mobile signal is unreliable in the surrounding forest.",
      "Flash flooding after heavy rain can change conditions quickly — check local advice before visiting in the wet season."
    ],
    images: [wf("Sera Ella.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "doovili",
    name: "Doovili Ella",
    province: "Sabaragamuwa",
    district: "Ratnapura District",
    height: 40,
    difficulty: "Moderate",
    seasons: ["May–Sep", "Oct–Jan"],
    coords: [6.6667, 80.7167],
    description:
      "A forested waterfall near Balangoda whose name (\"dust falls\") refers to the fine spray it throws up at full flow. It's a quieter alternative to the busier hill-country falls, reached through Lankagama-area forest trails.",
    bestTime: "Either monsoon window — May to September or October to January — brings noticeably fuller flow and mist.",
    safety: [
      "Trails in are forested and can be muddy; boots with grip are worth packing.",
      "As with most forest waterfalls in this region, leeches are common in wetter months.",
      "Local guides know the safe viewing spots — the approach isn't always obvious from the road.",
      "Mobile coverage is patchy along the approach trail."
    ],
    images: [wf("Duvili Ella Falls.jpg"), FILLER_A, FILLER_B]
  },
  {
    id: "bomburu",
    name: "Bomburu Ella",
    province: "Uva",
    district: "Badulla District",
    height: 50,
    difficulty: "Moderate",
    seasons: ["Oct–Jan"],
    coords: [6.9475, 80.8308],
    description:
      "Reputed to be the widest waterfall in Sri Lanka, formed from several smaller cascades merging into one broad curtain near Welimada, on the Nuwara Eliya–Badulla district border. It sits inside the Sita Eliya Kandapola forest reserve, an area of high biodiversity.",
    bestTime: "October through January, after the North-East monsoon has filled the highland streams that feed it.",
    safety: [
      "The final stretch is a hike along Bomburuella Road with no vehicle access — allow plenty of daylight.",
      "The forest reserve surrounding the falls is remote; a local guide is recommended.",
      "Multiple converging cascades mean currents can be uneven — take care picking a viewing spot.",
      "Weather in this part of the highlands changes quickly; carry a rain layer even in the dry season."
    ],
    images: [wf("Bomburu ella falls.jpg"), FILLER_A, FILLER_B]
  }
];

const ACCOMMODATIONS = [
  { area: "bambarakanda", name: "Haputale Highland Rest", type: "Guesthouse", price: "$25–40/night", phone: "94771234501" },
  { area: "bambarakanda", name: "Kalupahana Eco Camp", type: "Campsite", price: "$10–15/night", phone: "94771234502" },
  { area: "diyaluma", name: "Diyaluma View Resort", type: "Resort", price: "$60–90/night", phone: "94771234503" },
  { area: "diyaluma", name: "Koslanda Valley Inn", type: "Guesthouse", price: "$20–35/night", phone: "94771234504" },
  { area: "bakers", name: "Horton Plains Bungalow", type: "Hotel", price: "$70–110/night", phone: "94771234505" },
  { area: "bakers", name: "Nuwara Eliya Tea Cottage", type: "Guesthouse", price: "$30–50/night", phone: "94771234506" },
  { area: "dunhinda", name: "Badulla Riverside Hotel", type: "Hotel", price: "$40–65/night", phone: "94771234507" },
  { area: "bopath", name: "Kuruwita Garden Homestay", type: "Guesthouse", price: "$18–28/night", phone: "94771234508" },
  { area: "ravana", name: "Ella Ridge Resort", type: "Resort", price: "$55–95/night", phone: "94771234509" },
  { area: "ravana", name: "Ravana Falls Campsite", type: "Campsite", price: "$8–12/night", phone: "94771234510" },
  { area: "stclairs", name: "Talawakele Tea Bungalow", type: "Guesthouse", price: "$35–55/night", phone: "94771234511" },
  { area: "devon", name: "Dimbula Viewpoint Cottage", type: "Guesthouse", price: "$30–50/night", phone: "94771234512" },
  { area: "ramboda", name: "Ramboda Falls Inn", type: "Hotel", price: "$45–70/night", phone: "94771234513" },
  { area: "aberdeen", name: "Ginigathena Riverside Lodge", type: "Guesthouse", price: "$25–40/night", phone: "94771234514" },
  { area: "laxapana", name: "Maskeliya Peak Wilderness Camp", type: "Campsite", price: "$12–20/night", phone: "94771234515" },
  { area: "galboda", name: "Nawalapitiya Tea Estate Bungalow", type: "Guesthouse", price: "$28–45/night", phone: "94771234516" },
  { area: "seraella", name: "Laggala Forest Retreat", type: "Guesthouse", price: "$20–35/night", phone: "94771234517" },
  { area: "doovili", name: "Balangoda Nature Lodge", type: "Guesthouse", price: "$22–38/night", phone: "94771234518" },
  { area: "bomburu", name: "Welimada Highland Cottage", type: "Guesthouse", price: "$25–42/night", phone: "94771234519" }
];

const WEATHER = [
  { region: "Nuwara Eliya", temp: 17, cond: "Misty, light showers", humidity: 82, wind: 9 },
  { region: "Badulla", temp: 24, cond: "Partly cloudy", humidity: 74, wind: 11 },
  { region: "Ratnapura", temp: 28, cond: "Warm, humid", humidity: 80, wind: 6 }
];

const SAFETY_CHECKLIST = [
  "Check the weather and recent rainfall before setting out — flash floods can raise water levels fast.",
  "Wear closed, grippy footwear; flip-flops are a leading cause of slips near falls.",
  "Never swim above a falls' edge or in unmarked pools, however calm they look.",
  "Save local emergency numbers before you lose signal on hill-country roads.",
  "Carry more water than you think you need — hill trails are more strenuous than they appear.",
  "Pack out everything you pack in; these are fragile watershed ecosystems.",
  "Tell someone your planned route and expected return time.",
  "Avoid isolated trails alone after dusk — most falls are best visited in daylight."
];

/* =============================================================
   SECTION: STATE
============================================================= */
const state = {
  activeFilters: { search: "", province: "all", difficulty: "all", season: "all" },
  favorites: JSON.parse(localStorage.getItem("cascade_favorites") || "[]"),
  safetyChecked: JSON.parse(localStorage.getItem("cascade_safety") || "[]"),
  heroIndex: 0,
  activeStayArea: "all"
};

/* =============================================================
   SECTION: IMAGE FALLBACK
   Wikimedia Commons filenames were verified where possible, but a
   few could not be confirmed exactly. Rather than risk broken-image
   icons (the original bug report), every <img> on the page falls
   back to a drawn SVG placeholder — in the site's own palette — the
   instant it fails to load, so the layout never breaks.
============================================================= */
const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#17302a"/>
          <stop offset="100%" stop-color="#0b1613"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
      <path d="M150 60 L160 180 L140 180 Z" fill="#2a9db0" opacity="0.55"/>
      <path d="M200 40 L212 200 L188 200 Z" fill="#3aa87d" opacity="0.55"/>
      <path d="M250 60 L260 180 L240 180 Z" fill="#2a9db0" opacity="0.4"/>
      <rect x="120" y="195" width="160" height="14" rx="7" fill="#1c8c63" opacity="0.5"/>
      <text x="200" y="250" font-family="sans-serif" font-size="15" fill="#8fd4de" text-anchor="middle">Photo unavailable</text>
    </svg>
  `);

// Capture-phase listener catches "error" events from ANY <img> on the
// page (image load failures don't bubble, so capture is required).
document.addEventListener(
  "error",
  (e) => {
    const el = e.target;
    if (el && el.tagName === "IMG" && el.src !== FALLBACK_IMG) {
      el.src = FALLBACK_IMG;
      el.classList.add("img-fallback");
    }
  },
  true
);

function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $all(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }
function difficultyColor(level) {
  return level === "Easy" ? "var(--easy)" : level === "Moderate" ? "var(--moderate)" : "var(--hard)";
}
function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
function saveFavorites() {
  localStorage.setItem("cascade_favorites", JSON.stringify(state.favorites));
  $("#savedCount").textContent = state.favorites.length;
}
function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i === -1) { state.favorites.push(id); showToast("Saved to your trip"); }
  else { state.favorites.splice(i, 1); showToast("Removed from your trip"); }
  saveFavorites();
  renderCards();
  renderSavedList();
}

/* =============================================================
   SECTION: HERO SLIDER
============================================================= */
function initHero() {
  const slidesWrap = $("#heroSlides");
  const dotsWrap = $("#heroDots");
  const slidesData = WATERFALLS.slice(0, 4);

  slidesWrap.innerHTML = slidesData.map((w, i) => `
    <div class="hero__slide ${i === 0 ? "is-active" : ""}" data-index="${i}">
      <img src="${w.images[0]}" alt="${w.name}, ${w.district}">
      <div class="hero__scrim"></div>
    </div>
  `).join("");

  dotsWrap.innerHTML = slidesData.map((_, i) =>
    `<button aria-label="Go to slide ${i + 1}" class="${i === 0 ? "is-active" : ""}" data-index="${i}"></button>`
  ).join("");

  const slideEls = $all(".hero__slide", slidesWrap);
  const dotEls = $all("button", dotsWrap);

  function goTo(i) {
    state.heroIndex = (i + slideEls.length) % slideEls.length;
    slideEls.forEach((s, idx) => s.classList.toggle("is-active", idx === state.heroIndex));
    dotEls.forEach((d, idx) => d.classList.toggle("is-active", idx === state.heroIndex));
  }

  $("#heroPrev").addEventListener("click", () => goTo(state.heroIndex - 1));
  $("#heroNext").addEventListener("click", () => goTo(state.heroIndex + 1));
  dotEls.forEach(d => d.addEventListener("click", () => goTo(+d.dataset.index)));

  let autoplay = setInterval(() => goTo(state.heroIndex + 1), 5500);
  const heroEl = $("#hero");
  heroEl.addEventListener("mouseenter", () => clearInterval(autoplay));
  heroEl.addEventListener("mouseleave", () => { autoplay = setInterval(() => goTo(state.heroIndex + 1), 5500); });
}

/* =============================================================
   SECTION: STATS — elevation-profile chart
============================================================= */
function initStats() {
  const chart = $("#statsChart");
  const maxHeight = Math.max(...WATERFALLS.map(w => w.height));
  chart.innerHTML = WATERFALLS.map(w => `
    <div class="stats__bar">
      <span class="stats__bar-value">${w.height}m</span>
      <div class="stats__bar-fill" style="height:0%" data-target="${(w.height / maxHeight) * 100}"></div>
      <span class="stats__bar-label">${w.name.replace(" Falls", "")}</span>
    </div>
  `).join("");

  // Animate bars in once visible
  const bars = $all(".stats__bar-fill", chart);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(b => { b.style.height = b.dataset.target + "%"; });
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });
  io.observe(chart);
}

/* =============================================================
   SECTION: CARDS + FILTER BAR
============================================================= */
function populateFilterOptions() {
  const provinceSelect = $("#provinceFilter");
  const seasonSelect = $("#seasonFilter");
  const provinces = [...new Set(WATERFALLS.map(w => w.province))].sort();
  const seasons = [...new Set(WATERFALLS.flatMap(w => w.seasons))].sort();

  provinceSelect.insertAdjacentHTML("beforeend", provinces.map(p => `<option value="${p}">${p}</option>`).join(""));
  seasonSelect.insertAdjacentHTML("beforeend", seasons.map(s => `<option value="${s}">${s}</option>`).join(""));
}

function getFilteredWaterfalls() {
  const { search, province, difficulty, season } = state.activeFilters;
  return WATERFALLS.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesProvince = province === "all" || w.province === province;
    const matchesDifficulty = difficulty === "all" || w.difficulty === difficulty;
    const matchesSeason = season === "all" || w.seasons.includes(season);
    return matchesSearch && matchesProvince && matchesDifficulty && matchesSeason;
  });
}

function bookmarkIcon(filled) {
  return `<svg viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}"><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}

function renderCards() {
  const grid = $("#cardGrid");
  const list = getFilteredWaterfalls();
  const emptyState = $("#emptyState");

  $("#resultCount").textContent = `${list.length} waterfall${list.length === 1 ? "" : "s"} found`;
  emptyState.hidden = list.length !== 0;

  grid.innerHTML = list.map(w => {
    const isSaved = state.favorites.includes(w.id);
    return `
    <article class="card" data-id="${w.id}" tabindex="0">
      <div class="card__media">
        <img src="${w.images[0]}" alt="${w.name}" loading="lazy">
        <button class="card__bookmark ${isSaved ? "is-saved" : ""}" data-bookmark="${w.id}" aria-label="Save ${w.name} to your trip">
          ${bookmarkIcon(isSaved)}
        </button>
        <span class="card__height-tag">${w.height}m drop</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${w.name}</h3>
        <p class="card__loc">${w.district}, ${w.province} Province</p>
        <div class="card__badges">
          <span class="badge badge--difficulty" style="background:${difficultyColor(w.difficulty)}">${w.difficulty}</span>
          ${w.seasons.map(s => `<span class="badge badge--season">${s}</span>`).join("")}
        </div>
        <div class="card__foot">
          View details
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </article>`;
  }).join("");

  // Card click → open detail modal (ignore bookmark button clicks)
  $all(".card", grid).forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("[data-bookmark]")) return;
      openDetailModal(card.dataset.id);
    });
    card.addEventListener("keypress", e => { if (e.key === "Enter") openDetailModal(card.dataset.id); });
  });
  $all("[data-bookmark]", grid).forEach(btn => {
    btn.addEventListener("click", e => { e.stopPropagation(); toggleFavorite(btn.dataset.bookmark); });
  });
}

function initFilters() {
  $("#searchInput").addEventListener("input", e => { state.activeFilters.search = e.target.value; renderCards(); });
  $("#provinceFilter").addEventListener("change", e => { state.activeFilters.province = e.target.value; renderCards(); });
  $("#difficultyFilter").addEventListener("change", e => { state.activeFilters.difficulty = e.target.value; renderCards(); });
  $("#seasonFilter").addEventListener("change", e => { state.activeFilters.season = e.target.value; renderCards(); });
  $("#resetFilters").addEventListener("click", () => {
    state.activeFilters = { search: "", province: "all", difficulty: "all", season: "all" };
    $("#searchInput").value = "";
    $("#provinceFilter").value = "all";
    $("#difficultyFilter").value = "all";
    $("#seasonFilter").value = "all";
    renderCards();
  });
}

/* =============================================================
   SECTION: DETAIL MODAL
============================================================= */
let currentDetailId = null;

function openDetailModal(id) {
  const w = WATERFALLS.find(x => x.id === id);
  if (!w) return;
  currentDetailId = id;

  $("#detailModalTitle").textContent = w.name;
  $("#detailMeta").textContent = `${w.district}, ${w.province} Province · ${w.height}m drop`;
  $("#detailDesc").textContent = w.description;
  $("#detailBestTime").textContent = w.bestTime;
  $("#detailSafety").innerHTML = w.safety.map(s => `<li>${s}</li>`).join("");
  $("#detailBadges").innerHTML = `
    <span class="badge badge--difficulty" style="background:${difficultyColor(w.difficulty)}">${w.difficulty}</span>
    ${w.seasons.map(s => `<span class="badge badge--season">${s}</span>`).join("")}
  `;
  $("#detailMainImg").src = w.images[0];
  $("#detailMainImg").alt = w.name;
  $("#detailThumbs").innerHTML = w.images.map((src, i) =>
    `<img src="${src}" alt="${w.name} view ${i + 1}" class="${i === 0 ? "is-active" : ""}" data-src="${src}">`
  ).join("");

  updateDetailBookmarkBtn();

  $all("#detailThumbs img").forEach(t => t.addEventListener("click", () => {
    $("#detailMainImg").src = t.dataset.src;
    $all("#detailThumbs img").forEach(x => x.classList.remove("is-active"));
    t.classList.add("is-active");
  }));

  openModal("#detailModal");
}

function updateDetailBookmarkBtn() {
  const btn = $("#detailBookmarkBtn");
  const isSaved = state.favorites.includes(currentDetailId);
  btn.textContent = isSaved ? "Saved to trip ✓" : "Save to trip";
}

$("#detailBookmarkBtn").addEventListener("click", () => {
  toggleFavorite(currentDetailId);
  updateDetailBookmarkBtn();
});
$("#detailMapLink").addEventListener("click", () => closeModal("#detailModal"));

/* =============================================================
   SECTION: GENERIC MODAL OPEN/CLOSE
============================================================= */
function openModal(sel) {
  const modal = $(sel);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal(sel) {
  const modal = $(sel);
  modal.hidden = true;
  document.body.style.overflow = "";
}
$all(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal("#" + overlay.id); });
});
$all(".modal__close").forEach(btn => {
  btn.addEventListener("click", () => closeModal("#" + btn.closest(".modal-overlay").id));
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") $all(".modal-overlay:not([hidden])").forEach(m => closeModal("#" + m.id));
});

/* =============================================================
   SECTION: MAP (Leaflet)
============================================================= */
function initMap() {
  const map = L.map("leafletMap", { scrollWheelZoom: false }).setView([7.1, 80.9], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 17
  }).addTo(map);

  const waterIcon = L.divIcon({
    className: "",
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#0f6b4c;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.35);border:2px solid white;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  WATERFALLS.forEach(w => {
    const marker = L.marker(w.coords, { icon: waterIcon }).addTo(map);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${w.coords[0]},${w.coords[1]}`;
    marker.bindPopup(`
      <div class="map-popup">
        <h4>${w.name}</h4>
        <p style="margin:.2rem 0 .5rem;font-size:.8rem;color:#5c6f68;">${w.height}m · ${w.difficulty}</p>
        <a href="${directionsUrl}" target="_blank" rel="noopener">Get directions →</a><br>
        <a href="#" data-open-detail="${w.id}">View details →</a>
      </div>
    `);
    marker.on("popupopen", () => {
      const link = document.querySelector(`[data-open-detail="${w.id}"]`);
      if (link) link.addEventListener("click", e => { e.preventDefault(); openDetailModal(w.id); });
    });
  });
}

/* =============================================================
   SECTION: STAY (accommodations + inquiry modal)
============================================================= */
function initStay() {
  const tabsWrap = $("#stayTabs");
  const areas = ["all", ...WATERFALLS.map(w => w.id)];
  tabsWrap.innerHTML = areas.map(a => {
    const label = a === "all" ? "All areas" : WATERFALLS.find(w => w.id === a).name.replace(" Falls", "");
    return `<button data-area="${a}" class="${a === "all" ? "is-active" : ""}">${label}</button>`;
  }).join("");

  tabsWrap.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    state.activeStayArea = btn.dataset.area;
    $all("button", tabsWrap).forEach(b => b.classList.toggle("is-active", b === btn));
    renderStayGrid();
  });

  renderStayGrid();
}

function renderStayGrid() {
  const grid = $("#stayGrid");
  const list = state.activeStayArea === "all"
    ? ACCOMMODATIONS
    : ACCOMMODATIONS.filter(a => a.area === state.activeStayArea);

  grid.innerHTML = list.map(a => {
    const nearName = WATERFALLS.find(w => w.id === a.area)?.name ?? "";
    return `
    <div class="stay-card">
      <div class="stay-card__top">
        <span class="stay-card__type">${a.type}</span>
        <span class="stay-card__price">${a.price}</span>
      </div>
      <h4 class="stay-card__name">${a.name}</h4>
      <p class="stay-card__near">Near ${nearName}</p>
      <div class="stay-card__foot">
        <button class="btn btn--primary" data-inquire="${a.name}|${a.phone}">Inquire</button>
      </div>
    </div>`;
  }).join("");

  $all("[data-inquire]", grid).forEach(btn => {
    btn.addEventListener("click", () => {
      const [name, phone] = btn.dataset.inquire.split("|");
      openInquiryModal(name, phone);
    });
  });
}

function openInquiryModal(stayName, phone) {
  $("#inquiryStayName").textContent = `Regarding: ${stayName}`;
  $("#whatsappLink").href = `https://wa.me/${phone}?text=${encodeURIComponent("Hi, I'd like to enquire about availability at " + stayName)}`;
  $("#inquiryFormNote").textContent = "";
  $("#inquiryForm").reset();
  $("#inquiryForm").dataset.stay = stayName;
  openModal("#inquiryModal");
}

$("#inquiryForm").addEventListener("submit", e => {
  e.preventDefault();
  // This is a front-end-only demo: no backend is wired up, so we
  // simply confirm receipt locally. Wire this to a real endpoint
  // (or a service like Formspree) for production use.
  $("#inquiryFormNote").textContent = "Inquiry captured locally — this demo has no backend connected yet.";
  showToast("Inquiry sent (demo)");
  setTimeout(() => closeModal("#inquiryModal"), 1400);
});

/* =============================================================
   SECTION: WEATHER (placeholder widget)
============================================================= */
function initWeather() {
  const grid = $("#weatherGrid");
  grid.innerHTML = WEATHER.map(w => `
    <div class="weather-card">
      <span class="weather-card__region">${w.region}</span>
      <span class="weather-card__temp">${w.temp}°C</span>
      <span class="weather-card__cond">${w.cond}</span>
      <div class="weather-card__meta">
        <span>💧 ${w.humidity}% humidity</span>
        <span>💨 ${w.wind} km/h</span>
      </div>
      <span class="weather-card__note">Simulated data — connect a live API for real forecasts</span>
    </div>
  `).join("");
}

/* =============================================================
   SECTION: SAFETY CHECKLIST (localStorage-backed)
============================================================= */
function initSafety() {
  const list = $("#safetyList");
  list.innerHTML = SAFETY_CHECKLIST.map((item, i) => `
    <li class="${state.safetyChecked.includes(i) ? "is-checked" : ""}" data-index="${i}">
      <input type="checkbox" id="safety-${i}" ${state.safetyChecked.includes(i) ? "checked" : ""}>
      <label for="safety-${i}">${item}</label>
    </li>
  `).join("");

  $all("input[type=checkbox]", list).forEach(cb => {
    cb.addEventListener("change", () => {
      const li = cb.closest("li");
      const idx = +li.dataset.index;
      if (cb.checked) { if (!state.safetyChecked.includes(idx)) state.safetyChecked.push(idx); }
      else { state.safetyChecked = state.safetyChecked.filter(x => x !== idx); }
      li.classList.toggle("is-checked", cb.checked);
      localStorage.setItem("cascade_safety", JSON.stringify(state.safetyChecked));
      updateSafetyProgress();
    });
  });

  updateSafetyProgress();
}

function updateSafetyProgress() {
  const total = SAFETY_CHECKLIST.length;
  const done = state.safetyChecked.length;
  $("#safetyProgressFill").style.width = `${(done / total) * 100}%`;
  $("#safetyProgressLabel").textContent = `${done} of ${total} complete`;
}

/* =============================================================
   SECTION: FAVORITES / SAVED TRIP DRAWER
============================================================= */
function renderSavedList() {
  const list = $("#savedList");
  const empty = $("#savedEmpty");
  const saved = WATERFALLS.filter(w => state.favorites.includes(w.id));
  empty.hidden = saved.length !== 0;

  list.innerHTML = saved.map(w => `
    <li class="saved-item">
      <img src="${w.images[0]}" alt="${w.name}">
      <div>
        <p class="saved-item__name">${w.name}</p>
        <p class="saved-item__loc">${w.province} Province</p>
      </div>
      <button class="saved-item__remove" data-remove="${w.id}" aria-label="Remove ${w.name} from saved trip">&times;</button>
    </li>
  `).join("");

  $all("[data-remove]", list).forEach(btn => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.remove));
  });
}

$("#openSavedBtn").addEventListener("click", () => { renderSavedList(); openModal("#savedModal"); });

/* =============================================================
   SECTION: NAV — blur intensifies on scroll, mobile burger toggle
============================================================= */
function initNav() {
  const burger = $("#burgerBtn");
  const nav = $("#nav");
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen);
  });
  $all(".nav__mobile a").forEach(a => a.addEventListener("click", () => nav.classList.remove("is-open")));
}

/* =============================================================
   SECTION: INIT
============================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initStats();
  populateFilterOptions();
  initFilters();
  renderCards();
  initMap();
  initStay();
  initWeather();
  initSafety();
  initNav();
  saveFavorites(); // sets the initial saved count in the nav
});
