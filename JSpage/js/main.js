
// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

}
window.addEventListener("resize", updateSize)
updateSize();

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = new Vue({
  el:"#app",
  data:{
    qod:"",
    modulos:[]
  },
  methods:{},
  created(){

    async function fetchAll(){
      let resPages = await fetch("./json/pages.json");
      let json = await resPages.json();

      return json
    }

    fetchAll()
  
  },
  computed:{},
  components:{
    cards:{
      props:['array'],
      template:`
      <div id="playfield" class="col-12 d-flex justify-content-around flex-wrap py-2">
        <div v-for="modulo in array" class="flip-card my-2">
          <div class="flip-card-inner">
            <div class="flip-card-front" :style="modulo.imagen">
              <h4>{{modulo.nombre}}</h4>
            </div>
            <div class="flip-card-back p-2">
              <h1>{{modulo.titulo}}</h1>
              <p>{{modulo.detalle}}</p>
              <a :href='modulo.url' class="btn btn-purple mb-0" target="_blank" rel="noopener noreferrer">Ir al micrositio</a>
            </div>
          </div>
        </div>
      </div>       
      `
    },
    quote:{
      props:["quote"],
      template:`
      <blockquote class="blockquote text-right mx-5">
        <p class="mb-0">{{quote.text}}</p>
        <div class="blockquote-footer">{{quote.author ? quote.author : "Anonimous"}}</div>
      </blockquote>
      `
    }
  }
})