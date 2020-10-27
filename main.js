const debug = false;
const data = {
  dutch: {
    letters: "HETKISAVIJF TIENATZVOOR OVERMEKWART HALFSPMOVER VOORTHGEENS TWEEAMCDRIE VIERVIJFZES ZEVENONEGEN ACHTTIENELF TWAALFPMUUR",
    base: [0, 1, 2, 4, 5],
    next: 15,
    hours: {
      0: [108, 109, 110, 111, 112, 113],
      1: [55, 56, 57],
      2: [60, 61, 62, 63],
      3: [67, 68, 69, 70],
      4: [72, 73, 74, 75],
      5: [76, 77, 78, 79],
      6: [80, 81, 82],
      7: [84, 85, 86, 87, 88],
      8: [96, 97, 98, 99],
      9: [90, 91, 92, 93, 94],
      10: [100, 101, 102, 103],
      11: [104, 105, 106],
      12: [108, 109, 110, 111, 112, 113]
    },
    minutes: {
      0: [116, 117, 118],
      5: [7, 8, 9, 10, 43, 44, 45, 46],
      10: [12, 13, 14, 15, 43, 44, 45, 46],
      15: [30, 31, 32, 33, 34, 43, 44, 45, 46],
      20: [12, 13, 14, 15, 19, 20, 21, 22, 36, 37, 38, 39],
      25: [7, 8, 9, 10, 19, 20, 21, 22, 36, 37, 38, 39],
      30: [36, 37, 38, 39],
      35: [7, 8, 9, 10, 24, 25, 26, 27, 36, 37, 38, 39],
      40: [12, 13, 14, 15, 24, 25, 26, 27, 36, 37, 38, 39],
      45: [30, 31, 32, 33, 34, 48, 49, 50, 51],
      50: [12, 13, 14, 15, 19, 20, 21, 22],
      55: [7, 8, 9, 10, 19, 20, 21, 22],
      60: [116, 117, 118]
    }
  },
  english: {
    letters: "ITLISASAMPM ACQUARTERDC TWENTYFIVEX HALFSTENFTO PASTERUNINE ONESIXTHREE FOURFIVETWO EIGHTELEVEN SEVENTWELVE TENSEOCLOCK",
    base: [0, 1, 3, 4],
    next: 30,
    hours: {
      0: [101, 102, 103, 104, 105, 106],
      1: [60, 61, 62],
      2: [80, 81, 82],
      3: [66, 67, 68, 69, 70],
      4: [72, 73, 74, 75],
      5: [76, 77, 78, 79],
      6: [63, 64, 65],
      7: [96, 97, 98, 99, 100],
      8: [84, 85, 86, 87, 88],
      9: [55, 56, 57, 58],
      10: [108, 109, 110],
      11: [89, 90, 91, 92, 93, 94],
      12: [101, 102, 103, 104, 105, 106]
    },
    minutes: {
      0: [113, 114, 115, 116, 117, 118],
      5: [30, 31, 32, 33, 48, 49, 50, 51],
      10: [41, 42, 43, 48, 49, 50, 51],
      15: [12, 14, 15, 16, 17, 18, 19, 20, 48, 49, 50, 51],
      20: [24, 25, 26, 27, 28, 29, 48, 49, 50, 51],
      25: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 48, 49, 50, 51],
      30: [36, 37, 38, 39, 48, 49, 50, 51],
      35: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 45, 46],
      40: [24, 25, 26, 27, 28, 29, 45, 46],
      45: [12, 14, 15, 16, 17, 18, 19, 20, 45, 46],
      50: [41, 42, 43, 45, 46],
      55: [30, 31, 32, 33, 45, 46],
      60: [113, 114, 115, 116, 117, 118]
    }
  }
};

if (debug) {
  for (i of document.getElementsByClassName("debug")) { i.classList.remove("d-none") };
}

for (let i = 0; i < data[language].letters.length; i++) {
  if (data[language].letters[i] == " ") continue;
  document.querySelector(".grid").innerHTML += `<span id="${i}" class="inactive">${data[language].letters[i]}</span>`;
}

//base stays constantly active
data[language].base.forEach(i => document.getElementById(i).classList = "init");

const formatTime = async (i) => {
  let 
    d = new Date(i),
    h = d.getHours() > 11 ? d.getHours() - 12 : d.getHours(),
    m = d.getMinutes();
  m = parseInt((m % 5) >= 2.5 ? parseInt(m / 5) * 5 + 5 : parseInt(m / 5) * 5);
  return [...data[language].hours[m > data[language].next ? h + 1 : h], ...data[language].minutes[m]];
}

const run = (d) => {
  document.querySelector("h1").innerText = d.toLocaleTimeString();
  formatTime(d).then(ids => {
    Array.prototype.forEach.call(document.querySelectorAll('.active'), (elements) => elements.classList = "inactive");
    ids.forEach(n => document.getElementById(n).classList = "active");
  })
}

const set = (val) => run(new Date(`December 7 2003 ${Math.floor(val / 60)}:${val - (Math.floor(val / 60) * 60)}`));

run(new Date());
setInterval(() => run(new Date()), 10000);

