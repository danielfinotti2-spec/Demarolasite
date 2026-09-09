// Troque ou adicione histórias aqui. Cada bloco vira um capítulo automaticamente.
const stories = [
  { title: "A grande Ceguinha", date: "Ceguinha", note: "Ceguinha", text: "Ela é ceguinha, mas é gente... trato normal.", media: { type: "image", src: "img/silly catoooo 🥹🥀.jpg", alt: "Gatinho laranja de óculos" } },
  { title: "A grande Preguiçosa", date: "Preguiçosa", note: "Preguicosa", text: " Ela é super preguiçosa, mas eu trato ela normal também...", media: { type: "video", src: "img/From Klickpin.com- Printable Wall Art Ideas That Make Everyday Better 43004-pin-id-1099089484106901256.mp4" } },
  { title: "Pipoca", date: "Pipoca", note: "continua...", text: "", media: { type: "image", src: "img/fav Cat siamois 😚.jpg", alt: "Gatinho siamês" } }
  ,{ title: "Dia de perna", date: "60 kg no leg", note: "força da Grazi", text: "Ela treina e pega 60 kg no leg. Tá forte demais... mas ainda pega menos que o Daniel kkkkkkkkk." },
  { title: "BTS", date: "Dynamite", note: "bora ouvir", text: "Porque uma história dessas precisava ter BTS no meio. Dá play aí.", media: { type: "youtube", id: "gdZLi9oWNZg" } },
  { title: "Homem treinando perna?", date: "opiniões fortes", note: "ela não curte", text: "Tem uma coisa que a Grazi não gosta: homem treinando perna. Vai entender, né? kkkkk." },
  { title: "No fim das contas", date: "pra finalizar", note: "do seu jeito", text: "Apesar de tudo, das zoeiras e de cada detalhe, ela é maneira demais. Uma pessoa única. Pena que é kid..." }
];

let current = 0;
const $ = (id) => document.getElementById(id);
const pad = (number) => String(number).padStart(2, "0");

function showMedia(mediaInfo) {
  const box = $("story-media");
  box.replaceChildren();
  if (!mediaInfo) return;
  const media = document.createElement(mediaInfo.type === "youtube" ? "iframe" : mediaInfo.type === "video" ? "video" : "img");
  if (mediaInfo.type === "youtube") {
    media.src = `https://www.youtube.com/embed/${mediaInfo.id}?rel=0`;
    media.title = "BTS - Dynamite";
    media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    media.allowFullscreen = true;
  } else media.src = encodeURI(mediaInfo.src);
  if (mediaInfo.type === "video") {
    media.classList.add("cat-video");
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
    media.muted = true;
    media.autoplay = true;
    media.loop = true;
    media.setAttribute("aria-label", "Vídeo de gatinho");
  } else if (mediaInfo.type === "image") media.alt = mediaInfo.alt;
  box.append(media);
}

function showStory(index) {
  current = (index + stories.length) % stories.length;
  const story = stories[current];
  $("chapter-number").textContent = `capítulo ${pad(current + 1)}`;
  $("story-date").textContent = story.date;
  $("story-note").textContent = story.note;
  $("story-title").textContent = story.title;
  $("story-text").textContent = story.text;
  $("counter").textContent = `${pad(current + 1)} / ${pad(stories.length)}`;
  $("chapters").querySelectorAll("button").forEach((button, item) => button.classList.toggle("active", item === current));
  $("dots").innerHTML = stories.map((_, item) => `<span class="${item === current ? "active" : ""}"></span>`).join("");
  showMedia(story.media);
}

stories.forEach((story, index) => {
  const button = document.createElement("button");
  button.innerHTML = `<span>${pad(index + 1)}</span>${story.title}`;
  button.onclick = () => showStory(index);
  $("chapters").append(button);
});

let musicPlaying = false;
function setMusic(shouldPlay) {
  const player = $("music-player");
  const button = $("music-toggle");
  musicPlaying = shouldPlay;
  player.innerHTML = shouldPlay ? '<iframe src="https://www.youtube.com/embed/gdZLi9oWNZg?autoplay=1&loop=1&playlist=gdZLi9oWNZg" title="Música do BTS" allow="autoplay; encrypted-media"></iframe>' : "";
  button.classList.toggle("playing", shouldPlay);
  button.setAttribute("aria-label", shouldPlay ? "Parar música do BTS" : "Tocar música do BTS");
  button.innerHTML = shouldPlay ? '<i class="fa-solid fa-pause"></i><span>BTS</span>' : '<i class="fa-solid fa-music"></i><span>BTS</span>';
}
$("open-stories").onclick = () => { $("site").classList.add("open"); if (!musicPlaying) setMusic(true); };
$("music-toggle").onclick = () => setMusic(!musicPlaying);
$("home").onclick = () => $("site").classList.remove("open");
$("previous").onclick = () => showStory(current - 1);
$("next").onclick = () => showStory(current + 1);
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showStory(current - 1);
  if (event.key === "ArrowRight") showStory(current + 1);
});
showStory(0);
