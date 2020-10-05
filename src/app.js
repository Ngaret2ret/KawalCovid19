require.context("./icon/", true, /\.(png|svg|jpg|gif)$/);

import "regenerator-runtime";
import "./style/style.css";
import JudulTips from "./components/judul-tips.js";
import KontainerTips from "./components/kontainer-tips.js";
import SearchBox from "./components/search-box.js";

customElements.define('judul-tips', JudulTips);
customElements.define('kontainer-tips', KontainerTips);
customElements.define('search-box', SearchBox);

const urlKasus = "https://api.covid19api.com";
const tabelSeluruhData = document.querySelector('.seluruh-data');
const tabelRincianData = document.querySelector('.rincian');
tabelRincianData.style.display = "none";
const judulBesar = document.querySelector('.tempat-data h2');
const paginasi = document.querySelector('.paginasi');
const paginasiRinci = document.querySelector('.paginasi-rinci');
paginasiRinci.style.display = "none";

const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
let halaman = 1;
let dataKasus = null;
let dataKasusRinci = null;


window.addEventListener('load', (e) => {
  e.preventDefault();
  loadDataKasus();
});

const loadDataKasus = async () => {
  try {
    const respon = await fetch(`${urlKasus}/summary`);
    const responJson = await respon.json();      

    if (respon.status == 200) {
      dataKasus = responJson.Countries;
    } else {
      console.log(respon.status);
    }
  } catch (error) {
    console.log(error);
  }

  penomoranHalaman(dataKasus.length, dataKasus);
  tampilkanData(1, dataKasus);
};

const penomoranHalaman = (jumlahData, dataKasus) => {  
  paginasi.innerHTML = ``;
  paginasi.innerHTML += `<li class="aktif">${halaman}</li>`;

  for (let i = halaman; i < (jumlahData / 20); i++) {
    paginasi.innerHTML += `<li>${i+1}</li>`;
  }

  const nomerHalaman = document.querySelectorAll('.paginasi li');

  for (let nh of nomerHalaman) {
    nh.addEventListener('click', (e) => {
      let classAktif = document.querySelector('.paginasi .aktif');

      if (classAktif != null) {
        classAktif.classList.remove("aktif");
      }

      nh.classList.add('aktif');
      tampilkanData(nh.innerText, dataKasus);
    });
  }
}

const tampilkanData = (nomerHalaman, dataKasus) => {
  let awal = (nomerHalaman - 1) * 20;
  let akhir = nomerHalaman * 20;
  const tbodyTabelSeluruhData = tabelSeluruhData.querySelector('tbody');
  tbodyTabelSeluruhData.innerHTML = ``;

  for (let i = awal; i < akhir; i++) {
    if (dataKasus[i] != undefined) {
      tbodyTabelSeluruhData.innerHTML += `
      <tr>
        <td kode=${dataKasus[i].CountryCode}>${ i+1 }</td>
        <td><img src='https://www.countryflags.io/${dataKasus[i].CountryCode}/flat/16.png' alt='bendera'/> ${dataKasus[i].Country}</td>
        <td>${dataKasus[i].NewConfirmed}</td>
        <td>${dataKasus[i].TotalConfirmed}</td>
        <td>${dataKasus[i].TotalDeaths}</td>
        <td>${dataKasus[i].TotalRecovered}</td>
      </tr>
      `;
    }
  }

  const baris = document.getElementsByTagName('tr');
  for (let brs of baris) {
    brs.addEventListener('click', (e) => {
      e.preventDefault();
      const kodeNegara = brs.children[0].getAttribute('kode');
      const namaNegara = brs.children[1].innerText;
      const tutupButton = document.createElement('button');
      tutupButton.innerText = "Tutup";
      judulBesar.innerText = `Detail Informasi Covid-19 di ${namaNegara}`;
      judulBesar.append(tutupButton);
      tutupButton.addEventListener('click', () => {
        tabelSeluruhData.style.display = '';
        tabelRincianData.style.display = 'none';
        paginasiRinci.style.display = 'none';
        paginasi.style.display = 'flex';
        judulBesar.innerText = "🌏 Data Seluruh Dunia";
        
      });
      tabelSeluruhData.style.display = "none";
      tabelRincianData.style.display = '';
      paginasiRinci.style.display = 'flex';
      paginasi.style.display = 'none';

      loadRincianKasus(kodeNegara);
      // console.log(kodeNegara);
    });
  }
};

const loadRincianKasus = async (kodeNagara) => {
  try {
    const respon = await fetch(`${urlKasus}/total/country/${kodeNagara}`);
    const responJson = await respon.json();      

    if (respon.status == 200) {
      dataKasusRinci = responJson;
    } else {
      console.log(respon.status);
    }
  } catch (error) {
    console.log(error);
  }

  penomoranHalamanDataRinci(dataKasusRinci.length, dataKasusRinci);
  tampilkanDataRinci(1, dataKasusRinci);
};

const penomoranHalamanDataRinci = (banyakData, dataKasusRinci) => {
  paginasiRinci.innerHTML = ``;
  paginasiRinci.innerHTML += `<li class='aktif'>1`;
  for(let i = 1; i < (banyakData / 20); i++) {
    paginasiRinci.innerHTML += `<li>${i+1}</li>`;
  }

  const nhal = document.querySelectorAll('.paginasi-rinci li');

  for (let nh of nhal) {
    nh.addEventListener('click', (e) => {
      let classAktif = document.querySelector('.paginasi-rinci .aktif');

      if (classAktif != null) {
        classAktif.classList.remove("aktif");
      }

      nh.classList.add('aktif');
      tampilkanDataRinci(nh.innerText, dataKasusRinci);
    });
  }
};

const tampilkanDataRinci = (nomerHalaman, dataKasusRinci) => {
  let awal = (nomerHalaman - 1) * 20;
  let akhir = nomerHalaman * 20;
  const tbodyTabelRincianData = tabelRincianData.querySelector('tbody');
  tbodyTabelRincianData.innerHTML = ``;
  for (let i = awal; i < akhir; i++) {
    if (dataKasusRinci[i] != undefined) {
      tbodyTabelRincianData.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${penanggalan(dataKasusRinci[i].Date)}</td>
        <td>${dataKasusRinci[i].Confirmed}</td>
        <td>${dataKasusRinci[i].Deaths}</td>
        <td>${dataKasusRinci[i].Recovered}</td>
        <td>${dataKasusRinci[i].Active}</td>        
      </tr>`;
    }
  }
};

const penanggalan = (inputTanggal) => {
  const tanggal = new Date(inputTanggal);
  const formatIndo = `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
  return formatIndo;
};

const boxCari = document.querySelector('search-box');
const inputCari = boxCari.shadowRoot.querySelector('input');

inputCari.addEventListener('keyup', (e) => {
  const keyword = e.target.value;      
  const hasilCari = cariData(keyword);


  if (hasilCari.length) {
    penomoranHalaman(hasilCari.length, hasilCari);
    tampilkanData(1, hasilCari);
  } else {
    loadDataKasus();
  }
});

const cariData = (keyword) => {
    return dataKasus.filter((el) =>
      el.Country.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
  };




