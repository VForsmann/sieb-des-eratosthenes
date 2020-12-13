import { css, customElement, html, internalProperty, LitElement } from "lit-element";

@customElement("sieb-des-eratosthenes")
export default class SiebDesEratosthenes extends LitElement {
    @internalProperty() N: number = 50;
    @internalProperty() nonprimes: number[] = [];
    @internalProperty() algorithms = [
        {
            value: "01",
            description: "Nicht optimiert. Laufzeit: (n^2)/2",
            onSelect: () => this.divisionSieb(this.N),
        },
        {
            value: "02",
            description: "Optimiert. Laufzeit: n",
            onSelect: () => this.divisionSiebOptimiert(this.N),
        }
    ];
    @internalProperty() algorithm = this.NOTOPTIMIZEDsiebdesEratosthenes

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <ion-item>
                <ion-label position="fixed">N</ion-label>
                <ion-input min="10" type="number" @input="${this.Ninput}" value=${this.N}></ion-input>
            </ion-item>
            <ion-select @ionChange="${this.selectAlgorithm}" value="01">
                ${this.algorithms.map((algorithm) => {
                    return html`<ion-select-option value="${algorithm.value}">${algorithm.description}</ion-select-option>`;
                })}
            </ion-select>
            <ion-button expand="block" @click="${this.siebenNew}">Sieben!</ion-button>
            <ion-button expand="block" @click="${this.reset}">Reset!</ion-button>
            ${this.renderSieb()}
        `;
    }

    selectAlgorithm(e: CustomEvent) {
        console.log(e);
        const value = e.detail.value;
        this.algorithm = this.algorithms.find(elem => elem.value === value)!.onSelect;
    }

    Ninput(e: InputEvent) {
        const value = parseInt((e.target as HTMLInputElement).value);
        if (value > 0) {
            this.N = parseInt((e.target as HTMLInputElement).value);
        }
    }

    renderSieb() {
        if (this.N > 0) {
            const numberArray = Array.from(Array(this.N));
            return html`
                <style>
                    div.line {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }

                    div.row {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }

                    span.element {
                        display: block;
                        width: 10%;
                        height: 100px;
                        text-align: center;
                        line-height: 100px;
                        border: 1px solid lightgray;
                    }

                    span.nonprime {
                        background-color: rgb(255, 102, 102);
                    }

                    @media only screen and (max-width: 600px) {
                        span.element {
                            height: 50px;
                            line-height: 50px;
                        }
                    }
                </style>
                <div class="line">
                    <div class="row">
                        ${numberArray.map((elem: any, index: number) => {
                            return html`
                                <span id="element_${index + 1}" class="element ${this.nonprimes.includes(index + 1) ? "nonprime" : "prime"}"
                                    >${index + 1}</span
                                >
                            `;
                        })}
                    </div>
                </div>
            `;
        } else {
            return null;
        }
    }

    // m als Obergrenze der Liste, die das Sieb des Eratosthenes berücksichtigt
    // function SiebDesEratosthenes(m) {
    //     var liste = array[2..m]
    //     var primzahlen = [];
    //       // Untere Gauss-Klammer (siehe Optimierungen)
    //     var lowerGauss = Math.floor(Math.sqrt(m))

    //     for(var i = 2; i < lowerGauss; i++) {
    //        // Prüfen ob i bereits entfernt wurde
    //       if(liste.contains(i)) {
    //         //Markierte Zahl ist eine Primzahl
    //         primzahlen.push(i);
    //         // Alle Vielfachen von i werden aus der Liste entfernt
    //         // Beginnend bei i*i (siehe Optimierungen)
    //         for(var j = i*i; j < m; j+=i) {
    //            liste.remove(j);
    //         }
    //       }
    //     }

    //    return primzahlen;
    //  }

    //  function isPrimzahl(zahl) {
    //    const primzahlen = SiebDesEratosthenes(zahl);
    //    return primzahlen.contains(zahl);
    //  }

    siebenNew() {
        const primarys = this.algorithm(this.N);
        const nonprimarys = Array.from(Array(this.N).keys())
            .map((e) => e + 1)
            .filter((e) => !primarys.includes(e));
        this.nonprimes = nonprimarys;
        this.requestUpdate();
    }

    siebdesEratosthenes(m: number) {
        let liste = Array.from(Array(m - 1).keys()).map((e) => e + 2);
        const lowerGauss = Math.floor(Math.sqrt(m));
        let zaehler = 0;
        for (let i = 2; i <= lowerGauss; i++) {
            if (liste.includes(i)) {
                for (let j = i * i; j <= m; j = j + i) {
                    if (liste.indexOf(j) >= 0) {
                        liste.splice(liste.indexOf(j), 1);
                    }
                    zaehler = zaehler + 1;
                }
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        return liste;
    }

    NOTOPTIMIZEDsiebdesEratosthenes(m: number) {
        let liste = Array.from(Array(m - 1).keys())
            .map((e) => e + 2)
            .map((e) => {
                return { number: e, prime: true, marked: 0 };
            });
        let zaehler = 0;
        for (let i = 2; i <= m; i++) {
            for (let j = i + 1; j <= m; j++) {
                const eintrag = liste.find((e) => e.number === j);
                if (eintrag!.number % i === 0) {
                    eintrag!.prime = false;
                    eintrag!.marked++;
                }
                zaehler++;
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        const result = liste.filter((elem) => elem.prime).map((elem) => elem.number);
        return result;
    }

    divisionSieb(m: number) {
        let liste = Array.from(Array(m - 1).keys()).map((e) => e + 2);
        let zaehler = 0;
        for(let i = 2; i <= m; i++) {
            for(let j = i+1; j <= m; j++) {
                if(j % i === 0) {
                    this.removeArrayElement(liste, j);
                }
                zaehler++;
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        return liste;
    }

    divisionSiebOptimiert(m: number) {
        let liste = Array.from(Array(m - 1).keys()).map((e) => e + 2);
        const lowerGauss = Math.floor(Math.sqrt(m));
        let zaehler = 0;
        for(let i = 2; i <= lowerGauss; i++) {
            if (liste.includes(i)) {
                for(let j = i * i; j <= m; j+=i) {
                    this.removeArrayElement(liste, j);
                    zaehler++;
                }
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        return liste;
    }

    removeArrayElement(array: any[], element: any) {
        const index = array.indexOf(element);
        if(index >= 0) {
            array.splice(index, 1);
        }

    }

    reset() {
        this.nonprimes = [];
    }
}
