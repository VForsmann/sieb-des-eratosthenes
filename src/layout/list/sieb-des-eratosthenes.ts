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
            <ion-button expand="block" @click="${this.sieben}">Sieben!</ion-button>
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

    sieben() {
        const maxFactor = Math.floor(Math.sqrt(this.N));
        for(let dividend = 2; dividend < maxFactor; dividend++) {
            for(let number = dividend + 1; number <= this.N; number++) {
                if(number % dividend === 0) {
                    this.nonprimes.push(number)
                }
            }
        }

        this.requestUpdate();
    }

    reset() {
        this.nonprimes = [];
    }
}