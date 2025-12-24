// Liste complète des 49 notes
var notes = ["B0", "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
  "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4"];

// Mappage clavier AZERTY
var keyMap = {
  'a': 'C1', 'z': 'C#1', 's': 'D1', 'e': 'D#1', 'd': 'E1',
  'f': 'F1', 't': 'F#1', 'g': 'G1', 'y': 'G#1', 'h': 'A1', 'u': 'A#1', 'j': 'B1',
  'k': 'C2', 'i': 'C#2', 'l': 'D2', 'o': 'D#2', 'm': 'E2',
  'q': 'F2', 'p': 'F#2', 'w': 'G2', 'x': 'A2', 'c': 'B2',
  'v': 'C3', 'b': 'D3', 'n': 'E3'
};

// Mappage inverse (note -> touche)
var noteToKey = {};
for (var keyChar in keyMap) {
  noteToKey[keyMap[keyChar]] = keyChar.toUpperCase();
}

var piano = document.getElementById('piano');

// Création des touches
for (var i = 0; i < notes.length; i++) {
  var note = notes[i];
  var isBlack = note.indexOf('#') !== -1;
  var key = document.createElement('div');
  key.className = 'key ' + (isBlack ? 'black' : 'white');
  key.setAttribute('data-note', note);

  // Trouver la touche clavier correspondante
  var shortcut = noteToKey[note] || '';

  // Ajout de la note et de la touche
  var noteLabel = note.replace('#', '<sup>#</sup>');
  key.innerHTML = '<div class="label">' +
    '<span class="note-name">' + noteLabel + '</span><br>' +
    '<span class="key-shortcut">' + shortcut + '</span>' +
    '</div>';

  // Clic
  key.onclick = function (n, el) {
    return function () {
      playSound(n, el);
    };

  }(note, key);

  piano.appendChild(key);
}

function playSound(note, element) {
  // Animation
  element.classList.add('active');
  setTimeout(function () {
    element.classList.remove('active');
  }, 150);

  // Jouer le son (# encodé pour les touches noires)
  var encodedNote = note.replace('#', '%23');
  var audio = new Audio('./Mallet Note/Mallet ' + encodedNote + '.wav');
  audio.currentTime = 0;
  audio.play();
}

// Clavier physique
document.addEventListener('keydown', function (e) {
  var note = keyMap[e.key.toLowerCase()];
  if (note && !e.repeat) {
    var el = document.querySelector('[data-note="' + note + '"]');
    if (el) {
      playSound(note, el);
    }
  }
});



