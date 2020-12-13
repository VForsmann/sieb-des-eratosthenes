import { css, customElement, html, internalProperty, LitElement } from 'lit-element';

@customElement("sieb-des-eratosthenes")
export default class SiebDesEratosthenes extends LitElement {

    @internalProperty() N: number = 100;
    @internalProperty() nonprimes: number[] = [];

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <ion-item>
                <ion-label position="fixed">N</ion-label>
                <ion-input min="10" type="number" @input="${this.Ninput}" value=${this.N}></ion-input>
            </ion-item>
            <ion-button expand="block" @click="${this.siebenNew}">Sieben!</ion-button>
            <ion-button expand="block" @click="${this.reset}">Reset!</ion-button>
            ${this.renderSieb()}
        `
    }

    Ninput(e: InputEvent) {
        const value = parseInt((e.target as HTMLInputElement).value)
        if(value > 0) {
            this.N = parseInt((e.target as HTMLInputElement).value);
        }

    }

    renderSieb() {
        if(this.N > 0) {
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
                                <span id="element_${index+1}" class="element ${this.nonprimes.includes(index+1) ? "nonprime" : "prime"}">${index+1}</span>
                            `
                        })}
                    </div>
                </div>
            `
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
        const primarys = this.siebdesEratosthenes(this.N);
        const nonprimarys = Array.from(Array(this.N).keys()).map(e => e+1).filter(e => !primarys.includes(e));
        this.nonprimes = nonprimarys;
        this.requestUpdate();

    }

    siebdesEratosthenes(m: number) {
        let liste = Array.from(Array(m-1).keys()).map(e => e+2);
        const lowerGauss = Math.floor(Math.sqrt(m))
        let zaehler = 0;
        for(let i = 2; i <= lowerGauss; i++) {
            if(liste.includes(i)) {
                for(let j = i*i; j <= m; j=j+i) {
                    if(liste.indexOf(j) >= 0) {
                        zaehler = zaehler + 1;
                        liste.splice(liste.indexOf(j), 1);
                    }
                }
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        return liste;
    }

    NOTOPTIMIZEDsiebdesEratosthenes(m: number) {
        let liste = Array.from(Array(m-1).keys()).map(e => e+2);
        let zaehler = 0;
        for(let i = 2; i <= m; i++) {
            if(liste.includes(i)) {
                for(let j = i+i; j <= m; j=j+i) {
                    zaehler = zaehler + 1;
                    if(liste.indexOf(j) >= 0) {
                        liste.splice(liste.indexOf(j), 1);
                    }
                }
            }
        }
        alert("Sieb des Eratostehens hat " + zaehler + " Iterationen benötigt!");
        return liste;
    }

    // siebenOld() {
    //     const maxFactor = Math.floor(Math.sqrt(this.N));
    //     for(let dividend = 2; dividend < maxFactor; dividend++) {
    //         for(let number = dividend + 1; number <= this.N; number++) {
    //             if(number % dividend === 0) {
    //                 this.nonprimes.push(number)
    //             }
    //         }
    //     }

    //     this.requestUpdate();
    // }

    reset() {
        this.nonprimes = [];
    }
}