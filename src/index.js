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
            table.render()
        },
        render: () => {
            let htmlTable = `<table class ="table table-hover"><thead><tr><th>Squadra</th><th>Punti</th></tr></thead><tbody>`;
            htmlTable += data.map((row) =>
                "<tr>" + row.map((col) =>
                    "<td>" + col + "</td>"
                ).join("") + `<td><button type="button" class="btn btn-danger">X</button></td>`
            ).join("") + `</tr>`;
            htmlTable += "</tbody></table";
            parentElement.innerHTML = htmlTable;

            document.querySelectorAll(".btn-danger").forEach((button,index) => button.onclick = () => {
                data.splice(index,1);
                table.render();
            })
        }
    }
}
const createForm = (parentElement) => {
    let data;
    let callback = null;

    return {
        setLabels: (labels) => { data = labels; },
        onsubmit: (callbackInput) => { callback = callbackInput },
        render: () => {
            parentElement.innerHTML =
                data.map((name, index) => {
                    return `<div class="form-label">` + name[0] + `\n<input class ="form-control" id="` + name[1] + `" type="` + name[2] + `" /></div>`;
                }).join('\n')
                + `<button type='button' class="btn btn-success" id='submit'>Submit</button>`;
            document.querySelector("#submit").onclick = () => {
                const result = data.map((name) => {
                    const value = document.querySelector("#" + name[1]).value;
                    document.querySelector("#" + name[1]).value = "";
                    return value;
                });
                callback(result);
            }
        },
    };
};

const form = createForm(document.querySelector('#formDiv'));
const table = createTable(document.querySelector("#tableDiv"));
const pro = new Promise((resolve, reject) => {
    try{
        form.setLabels([["Nome Squadra", "namesq", "text"], ["Punti", "punti", "number"]]);
        form.onsubmit(table.add);
        form.render();
        table.render()
        resolve("Operazione completata");
    }
    catch(error){
        reject(error);
    }
})

pro.then(v => console.log(v)).catch(e => console.log(e));
