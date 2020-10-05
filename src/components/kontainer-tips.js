class KontainerTips extends HTMLElement {
  constructor() {
    super();
  }  

  connectedCallback() {
    const isiTips = [
      {
        gambar: "icon/cuci-tangan.svg",
        tips: "Cuci Tangan"
      },{
        gambar: "icon/covid-19.svg",
        tips: "Pakai Masker"
      },{
        gambar: "icon/far.svg",
        tips: "Jaga Jarak"
      },{
        gambar: "icon/rajin-berolahraga.svg",
        tips: "Rajin Berolahraga"
      },{
        gambar: "icon/makan-bergizi.svg",
        tips: "Makan Makanan Bergizi"
      }
    ];

    isiTips.forEach(tip => {
      this.innerHTML += `
        <div class="badge">
          <img src='${tip.gambar}' /> ${tip.tips}
        </div>
      `;
    });
  }
}

export default KontainerTips;

