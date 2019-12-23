var longstring = "HETKISAVIJF TIENATZVOOR OVERMEKWART HALFSPMOVER VOORTHGEENS TWEEAMCDRIE VIERVIJFZES ZEVENONEGEN ACHTTIENELF TWAALFPMUUR"

for (var i = 0; i < longstring.length; i++) {
  if(longstring[i] == " ") continue
  document.querySelector(".grid").innerHTML += `<span id="${i}" class="inactive">${longstring[i]}</span>` 
}

var hours = {
  0: [108,109,110,111,112,113],
  1: [55,56,57],
  2: [60,61,62,63],
  3: [67,68,69,70],
  4: [72,73,74,75],
  5: [76,77,78,79],
  6: [80,81,82],
  7: [84,85,86,87,88],
  8: [96,97,98,99],
  9: [90,91,92,93,94],
  10: [100,101,102,103],
  11: [104,105,106],
  12: [108,109,110,111,112,113]
}

const formatTime = async(d) => {
  var res = [0,1,2,4,5],
      d = new Date(d),
      h = d.getHours() > 11 ? d.getHours() - 12 : d.getHours(),
      m = d.getMinutes()
  try {
    switch (parseInt((m % 5) >= 2.5 ? parseInt(m / 5) * 5 + 5 : parseInt(m / 5) * 5)) {
      case 0:
        res = [...res,...hours[h],116,117,118];
        break;
      case 5:
        res = [...res,...hours[h],7,8,9,10,43,44,45,46];
        break;
      case 10:
        res = [...res,...hours[h],12,13,14,15,43,44,45,46];
        break;
      case 15:
        res = [...res,...hours[h],30,31,32,33,34,43,44,45,46];
        break;
      case 20:
        res = [...res,...hours[(h+1)],12,13,14,15,19,20,21,22,36,37,38,39];
        break;
      case 25:
        res = [...res,...hours[(h+1)],7,8,9,10,19,20,21,22,36,37,38,39];
        break;
      case 30:
        res = [...res,...hours[(h+1)],36,37,38,39];
        break;
      case 35:
        res = [...res,...hours[(h+1)],7,8,9,10,24,25,26,27,36,37,38,39];
        break;
      case 40:
        res = [...res,...hours[(h+1)],12,13,14,15,24,25,26,27,36,37,38,39];
        break;
      case 45:
        res = [...res,...hours[(h+1)],30,31,32,33,34,19,20,21,22];
        break;
      case 50:
        res = [...res,...hours[(h+1)],12,13,14,15,19,20,21,22];
        break;
      case 55:
        res = [...res,...hours[(h+1)],7,8,9,10,19,20,21,22];
        break;
    }
    return res;
  } catch(e) {
    console.log(h)
  }
}

function run(d) {
  document.querySelector("h1").innerText = d.toLocaleTimeString()
  formatTime(d).then(ids => {
    Array.prototype.forEach.call(document.querySelectorAll('.active'), (elements) => elements.classList = "inactive");
    ids.forEach(n => document.getElementById(n).classList = "active")
  })
}

const set = (val) => run(new Date(`December 7 2003 ${Math.floor(val / 60)}:${val - (Math.floor(val / 60) * 60)}`))

setInterval(()=>run(new Date()),1000)
