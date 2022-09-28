const template = document.createElement('template');
template.innerHTML = `
<div>
    <div class="col up">
        <input class="left" type="checkbox" value="" id="text">
        <label class="left" for="text">
        Text
        </label>
        <div id="amp" hidden>
            <label class="right nametag" for="amplitude">Amplitúda</label>
            <input type="number" class="right" name="amplitude" id="amplitude" min="0.0" max="5.0" step="0.5">
        </div>
        </div> 
        <br>
        <div class="col down">
            <input class="left" type="checkbox" value="" id="slider">
            <label class="left" for="slider">
        Slider
        </label>
        <div class="slidecontainer" id="slide" hidden>
            <input type="range" min="0" max="5" value="1" class="range range-wrap" id="myRange" name="myRange" step="0.5">
            <output id="bubble"></output>
        </div>
    </div>
</div>
<style>
input[type=text] {
    background-color: white;
    color: black;
    border: black;
    border: 1px solid;
    width: 80%;
}
label {
    font-weight: bold;
    font-size: large;
}
.nametag {
    align-items: right;
    padding: 3px 10px;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: white;
    text-align: center;
    white-space: nowrap;
    background-color: navy;
    border: 1px solid;
    font-weight: bold;
  }
.labels {
    color: red;
    background-color: white;
    font-family: "Lucida Grande", "Arial", sans-serif;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    width: 60px;     
    border: 2px solid black;
    white-space: nowrap;
}
.content {
    background-color: white;
    display: inline-block;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 5px solid black;
    width: 50%;
    color: black;
}

.col {
    margin: 5px;
}

.left {
    float: left;
}
.up {
    padding-top: 30px;
  }
  
  .range-wrap {
    position: static;
    margin: 1rem auto 3rem;
    
  }
  .range {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;  
    background: navy;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  .range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: red;
    cursor: pointer;
  }
  
  .range::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: red;
    cursor: pointer;
  }
  
  #bubble {
    background: navy;
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: bold;
    font-size: large;
  }
</style>`;


class Amplitude extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        var slider = this.shadowRoot.querySelector('#myRange');
        const output = this.shadowRoot.querySelector('#amplitude');
        const bubble = this.shadowRoot.querySelector('#bubble');
        output.value = slider.value; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {
            output.value = this.value;
            const val = slider.value;
            bubble.innerHTML = val;
        }
        output.oninput = function() {
            slider.value = this.value;
            bubble.innerHTML = this.value;
        }

        this.shadowRoot.querySelector('#text').addEventListener('click', () => 
        {
            var input = this.shadowRoot.querySelector("#text"); 
            var slide = this.shadowRoot.querySelector("#slider");
            var inputBlock = this.shadowRoot.querySelector("#amp");
            var slideBlock = this.shadowRoot.querySelector("#slide");
            if(input.checked) {
                inputBlock.hidden = false;
            }
            else inputBlock.hidden = true;

            slide.checked = false;
            slideBlock.hidden = true;
        });

        this.shadowRoot.querySelector('#slider').addEventListener('click', () => 
        {
            var input = this.shadowRoot.querySelector("#text"); 
            var slide = this.shadowRoot.querySelector("#slider");
            var inputBlock = this.shadowRoot.querySelector("#amp");
            var slideBlock = this.shadowRoot.querySelector("#slide");
            if(slide.checked) {
                slideBlock.hidden = false;
            }
            else slideBlock.hidden = true;

            input.checked = false;
            inputBlock.hidden = true;
        });
    }

}


window.customElements.define('amplitude-setter', Amplitude);