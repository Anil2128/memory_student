function game() {
  let max,
    imgMix,
    counter,
    img1,
    img2,
    pairCounter,
    startTime,
    soundSwitch,
    clickCounter;

  const memSound = {
    pair: "sound/mp3/pong.mp3",
    lose: "sound/mp3/spawn.mp3",
    ende: "sound/mp3/winner.mp3",
  };

  // playSound(memSound.pair)
  function playSound(src) {
    if (soundSwitch) {
      const audio = new Audio();
      audio.src = src;
      audio.volume = 0.1;
      audio.play();
    }
  } // ENDE playSound

  function initVaris() {
    max = 16; // Gesamtzahl Bilder
    clickCounter = 0;
    const imgSet = loadImgSet();
    imgMix = mixArr(imgSet);
    counter = 0; // 1. Bild - 2. Bild
    img1 = null; // speichert das 1. Bild
    img2 = null; // speichert das 2. Bild
    pairCounter = 0; // zählt die gefundenen Paare
    startTime = null; // ZeitStempel für die Zeitmessung
    soundSwitch = false; // Sound On - Sound Off

    // Textfelder entleeren
    el("#zeit").innerHTML = "";
    el("#klicks").innerHTML = "";
  } //ENDE initVaris

  function createField() {
    for (let i = 0; i < max; i++) {
      const img = create("img");
      img.setAttribute("src", "img_1/memory_1.gif");
      // Attribut zur Synchronisierung mit Array - Index
      img.setAttribute("data-index", i);
      img.addEventListener("click", gameLogic);
      el("#game").append(img);
    }
  } //ENDE createField

  function loadImgSet() {
    const imgPool = []; // Pool anlegen
    const set = [];
    for (let i = 1; i < 26; i++) {
      const path = `img_1/p_${i}.gif`; // alle 25 Bilder werden im Pool(Array) gespeichert
      imgPool.push(path);
    }
    // 8 Bildpaare
    for (let i = 0; i < max / 2; i++) {
      const index = Math.floor(Math.random() * imgPool.length); // Zufälliger Index
      const path = imgPool.splice(index, 1)[0]; // gewähltes Bild aus Pool löschen und in variable "path"(Zeile 29) speichern
      set.push(path); // das Bild doppelt in das Array (Set Zeile 26) speichern
      set.push(path);
    }

    return set;
  } // ENDE loadImgSet

  // nur zum testen
  function changeImg(img) {
    // img1 = this; // 1. Bild gespeichert
    const index = parseInt(img.getAttribute("data-index"));
    const path = imgMix[index];
    img.src = path;
    //Img Element wird von der Function befreit
    img.removeEventListener("click", gameLogic);
  } // Ende changeImg

  function gameLogic() {
    // Klicks zählen und Ausgabe
    // clickCounter ++;
    clickCounter++;
    console.log(clickCounter);
    el("#klicks").innerText = `Du hast ${clickCounter} mal geklickt`;

    if (clickCounter === 1) {
      //1. Klick - Spielbeginn
      startTime = new Date();
    }

    counter++;
    // console.log(counter);

    if (counter === 1) {
      img1 = this; // 1. Bild gespeichert
      changeImg(img1);
    }

    if (counter === 2) {
      img2 = this; //2. Bild gespeichert
      changeImg(img2);

      // Vergleich der Bilder
      if (img1.src === img2.src) {
        // 2 gleiche Bilder
        playSound(memSound.pair);

        img1.src = "img_1/wow.gif";
        img2.src = "img_1/wow.gif";
        counter = 0; // Counter Reset

        // Spiel Ende erkennen
        pairCounter++;
        if (pairCounter === max / 2) {
          // if (pairCounter === 1) { //schneller Spiel beenden
          playSound(memSound.ende);
          // Spiel Ende
          // Alle Bilder in der Original Lage zeigen
          group("#game img").forEach((bild, index) => {
            bild.src = imgMix[index];
          });
          // Zeitmessung
          const stopTime = new Date();
          const sekunden = Math.floor((stopTime - startTime) / 1000);
          el("#zeit").innerText = `Du hast ${sekunden} Sekunden gespielt`;
        }
      } else {
        // 2 ungleiche Bilder
        playSound(memSound.lose);
        setTimeout(() => {
          img1.src = "img_1/memory_1.gif";
          img2.src = "img_1/memory_1.gif";
          img1.addEventListener("click", gameLogic);
          img2.addEventListener("click", gameLogic);
          counter = 0;
        }, 500);
      }
    }
  } // ENDE gameLogic
  //#################################################
  // Ausführen und Zuweisen

  el("#audio").addEventListener("click", function () {
    soundSwitch = !soundSwitch;
    if (soundSwitch) {
      this.innerHTML = "Sound Off";
    } else {
      this.innerHTML = "Sound On";
    }
  });
  initVaris();
  createField();
  // loadImgSet();
} //ENDE GAME

//############### NICHT WEITER SCHREIBEN #################################
game();
