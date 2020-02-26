
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
    pages:[]
  },
  methods:{},
  created(){
    
    async function fetchAll(){
      let resPages = await fetch("./json/pages.json");
      let json = await resPages.json();
      
      return json
    }
    fetchAll()
    .then(data => {
      app.pages=data.pages;
      
    })
  },
  computed:{},
  components:{
    principal:{
      props:['array'],
      template:`
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
   
        <div class="carousel-inner">
        <div class="carousel-item active slide" id="linkHTML" :style="array[0].bg">
          <div class="d-flex justify-content-center flex-column align-items-center" >
            <h2>{{array[0].nombre}}</h2>
            <a href="HTMLpage/html.html" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Go to HTML!</a>
          </div>
        </div>
        <div class="carousel-item slide" id="linkCSS" :style="array[1].bg">
          <div class="d-flex justify-content-center flex-column align-items-center" >
            <h2>{{array[1].nombre}}</h2>
            <a href="CSSpage/css.html" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Go to CSS!</a>
          </div>
        </div>
        <div class="carousel-item slide" id="linkJS" :style="array[2].bg">
          <div class="d-flex justify-content-center flex-column align-items-center" >
            <h2>{{array[2].nombre}}</h2>
            <a href="JSpage/js.html" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Go to JS!</a>
          </div>
        </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
      </div>
      </div>
      `
    }
  }
})