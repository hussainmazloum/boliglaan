let laan;
let arRente;
let ar;

document.getElementById("beregn").onclick = function () {

  laan = document.getElementById("laan").value;
  arRente = document.getElementById("rente").value;
  ar = document.getElementById("ar").value;

  // Validering av inndata (input) :

  if (isNaN(laan) ||laan <= 0 ||isNaN(arRente) ||arRente < 0 ||isNaN(ar) ||ar <= 0) {
    alert(`Vennligst skriv inn gyldige positive tall.`);
    return;
  }

// Formel for terminbeløp :

  const manedRente = arRente / 100 / 12;
  const antallManed = ar * 12;

  const x = Math.pow(1 + manedRente, antallManed);
  const terminbelop = (laan * x * manedRente) / (x - 1);

  const interest = laan * manedRente;
  const avdrag = terminbelop - interest;
  const rest_gjeld = laan - avdrag;

  let gjenværendeSaldo = laan;

  laan = Number(laan);
  arRente = Number(rente);
  ar = Number(ar);

  // Forloop :

  let tBody = document.getElementById("tBody");

  for (let i = 1; i <= antallManed; i++) {
    let renteBetaling = gjenværendeSaldo * manedRente;
    let hovedstolbetaling = terminbelop - renteBetaling;
    gjenværendeSaldo -= hovedstolbetaling;

    tBody.innerHTML += `<tr>
                        
            <td>Måned : ${i}</td>
            <td>${laan}</td>
            <td>${terminbelop.toFixed(2)}</td>
            <td>${renteBetaling.toFixed(2)}</td>
            <td>${hovedstolbetaling.toFixed(2)}</td>
            <td>${gjenværendeSaldo.toFixed(2)}</td> 
          </tr>`;

   
// Formel for total lån / total rente / effektive rente :

    let totalLaan = 0;
    let totalRente = 0;
    totalLaan += terminbelop * antallManed;
    totalRente = totalLaan - laan;

    let effek_rente = (1 + manedRente) ** 12 - 1;
    let effektive_rente = effek_rente * 100;

// Vise data 

    document.getElementById("result1").innerHTML =`Lån : <span class="red">${laan} Kr.</span> i løpet av  ${ar} år /<span class="red"> ${antallManed} måned.</span>`;
    document.getElementById("result2").innerHTML =`Total rente kostnad :<span class="red"> ${totalRente.toFixed(2)} Kr.</span>`;
    document.getElementById("result3").innerHTML =`Total lån inkludert rente :<span class="red"> ${totalLaan.toFixed(2)} Kr.</span>`;
    document.getElementById("result4").innerHTML =`Effektive rente :<span class="red"> ${effektive_rente.toFixed(2)} %</span>`;

    document.getElementById("result").style.background = "white";
  }

// Stanse faksjonen for (onclick)
  this.disabled = true;
}

//Fanksjoner for fjerne og lukke knapper
document.getElementById("fjerne").onclick = () => {if(confirm(`Er du sikker ! \n Data skal slettes . `))window.location.reload();}
document.getElementById("lukke").onclick = () => {if (confirm(`Er du sikker ! \n siden skal lukkes .`)) window.close();}



/*  console.log(`Måned :  ${i} 
    Terminbeløp : Kr. ${terminbelop.toFixed(2)}, 
    Rente       : Kr. ${renteBetaling.toFixed(2)}, 
    Avdrag      : Kr. ${hovedstolbetaling.toFixed(2)}, 
    Restegjeld  : Kr. ${gjenværendeSaldo.toFixed(2)}`); */