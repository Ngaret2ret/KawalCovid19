class JudulTips extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const emot = '💡';    
    // this.textContent = `${ emot } Tips Agar Terhindar Covid-19`;
    this.innerHTML = `
      <style>
        h2 {
          margin: 10px 20px;
        }
      </style>
      <h2>${emot} Tips Agar Terhindar Covid-19</h2>
    `;
  }
}

export default JudulTips;

