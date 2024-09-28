/*
1) Scrivere una web app con due componenti:
a) un componente tabella che mostra una tabella con due colonne (nome squadra e punti)  inizialmente vuota che espone due metodi:
- render(): esegue la render della tabella
- add(row): aggiunge una riga ai dati della tabella, contenente il nome della squadra e i suoi punti. Il metodo add esegue anche un ordinamento della tabella con punteggio decrescente (per una guida di sort leggere qui: https://cipiaceinfo.it/docs/programmazione/javascript/manipolazione-dati/)

b) un componente form, che contiene i seguenti campi:
- nome squadra (tipo testo)
- punti (tipo number)
ed un pulsante submit. Alla pressione del pulsante, il componente creerà una nuova lista nel formato [squadra, punti] e invierà i dati al componente tabella tramite metodo add(row)  e poi eseguirà la render(). 
*/
const createTable = (parentElement) => {
    const data = [];
    return {
        add: (row) => {
            data.push(row);
            data.sort((a, b) => b[1] - a[1]);
        },
        render: () => {
            let htmlTable = `<table class ="table table-hover"><thead><tr><th>Squadra</th><th>Punti</th></tr></thead><tbody>`;
            htmlTable += data.map((row) =>
                "<tr>" + row.map((col) =>
                    "<td>" + col + "</td>"
                ).join("")
            ).join("") + "</tr>";
            htmlTable += "</tbody></table";
            parentElement.innerHTML = htmlTable;
        }
    }
}
const createForm = (parentElement) => {
    let data;
    let callback = null;
  
    return {  
      setLabels: (labels) => { data = labels; },  
      onsubmit: (callbackInput) => { callback = callbackInput},
      render: () => { 
        parentElement.innerHTML = 
          data.map((name, index) => {
              return `<div>`+name+`\n<input id="`+name+`" type="text" /></div>`;
            }).join('\n')
            + "<button type='button' id='submit'>Submit</button>";  
        document.querySelector("#submit").onclick = () => {
          const result = data.map((name) => {
            return document.querySelector("#" + name).value;
          });
          callback(result);
        }          
      },
    };
  };
  
  const form = createForm(document.querySelector('#app'));
  form.setLabels(["Nome", "Punti"]);
  form.onsubmit(console.log);
  form.render();

/*
const table = createTable(document.querySelector("#app"));
table.add(["Torino", 11]);
table.add(["Napoli", 10]);
table.add(["Udinese", 10]);
table.add(["Milan", 15]);
table.add(["Inter", 5]);
table.render();*/