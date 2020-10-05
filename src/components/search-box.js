class SearchBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});    
    this.shadowRoot.innerHTML = `    
      <style>
        :host {
          display: flex;
          contain: content;
          justify-content: center;
        }
        input {          
          border: 1px solid #dddada;
          border-radius: 5px;
          box-shadow: none;
          text-indent : 10px;          
          width: 80%;
          color: #d71414;
          font-size: 16px;
          padding: 5px;
        }

        input::placeholder {
          color: #fba7a7;
        }

        input:focus {
          outline: none;
        }
        
      </style>
      <input type='text' placeholder='Masukkan Nama Negara' />
    `;

    
    
  }

  // const cariData = (keyword) => {
  //   return dataKasus.filter((el) =>
  //     el.Country.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  //   );
  // };

  // cariData(keyword){
  //   return dataKasus.filter((el) =>
  //     el.Country.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  //   );
  // }
}

export default SearchBox;

