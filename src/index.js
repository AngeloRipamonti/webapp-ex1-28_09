/*
1) Scrivere una web app con due componenti:
a) un componente tabella che mostra una tabella con due colonne (nome squadra e punti)  inizialmente vuota che espone due metodi:
- render(): esegue la render della tabella
- add(row): aggiunge una riga ai dati della tabella, contenente il nome della squadra e i suoi punti. Il metodo add esegue anche un ordinamento della tabella con punteggio decrescente (per una guida di sort leggere qui: https://cipiaceinfo.it/docs/programmazione/javascript/manipolazione-dati/)
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


const table = createTable(document.querySelector("#app"));
table.add(["Torino", 11]);
table.add(["Napoli", 10]);
table.add(["Udinese", 10]);
table.add(["Milan", 15]);
table.add(["Inter", 5]);
table.render();