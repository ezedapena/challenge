
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
    pages:[],
    current: "principal",
    dialog: ""
    
  },
  methods:{
    start(){
      app.current = "secondary"
    },
    html(){
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/html.css"

    },
    css(){
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/css.css"
    },
    js(){
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/js.css"
    },
    help(){
      
      switch(app.dialog){
        case "":
          app.dialog= "one"
          break;
        case "one":
          app.dialog = "two"
          break;
        case "two":
          app.dialog = "three"
          break;
        case "three":
        app.dialog = "question"
        break;
      }

    },
    cancel(){
      app.dialog = ""
    }
  },
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
      template:`
      <div class="d-flex justify-content-center flex-wrap">
        <img src="img/start.png" alt="start button"  onclick="app.start()" class="linkimgs">
        <img src="img/play.png" alt="play button"  class="linkimgs">
        <img src="img/start.png"  class="linkimgs">

      </div>
      
      `

    },
    secondary:{
      props:['array'],
      template:`
    
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <template v-if="array.length != 0">
        <div class="carousel-inner">
        <div class="carousel-item active slide" id="linkHTML" :style="array[0].bg">
          <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.html()">
            <img src="img/htmlogo.png" class="imgResponsive">
            <img src="img/htmlimage.png" height="50%">
          </div>
        </div>
        <div class="carousel-item slide" id="linkCSS" :style="array[1].bg">
          <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.css()">
          <img src="img/csslogo.png" class="imgResponsive">
          <img src="img/cssimage.png" height="50%">

          </div>
        </div>
        <div class="carousel-item slide" id="linkJS" :style="array[2].bg">
          <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.js()">
          <img src="img/jslogo.png" class="imgResponsive">
          <img src="img/jsimage.png" height="50%">

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
      </template>
      </div>
      `
    },
    page:{
      props:['var'],
      components:{

        one:{
          template: `<div id="dialog-div"><p>Hey you! <br> I´m Captain Miler</p></div>`
      },
        two:{
          template: `<div id="dialog-div"><p>I need your help!<br> Did you study enough?</p></div>`
      },
      three:{
        template:`<div id="dialog-div"><p> Mr. Code is back! <br>Are you ready to face him?</p></div>`
      },
      question:{
        template: `<div id="fight"><button type="button" class="btn btn-success" href="">Let's go get him!</button>
        <button type="button" class="btn btn-danger" onclick="app.cancel()">No, Let me study more</button></div>`
      }
      },
      
      template:`
      <div class="col-10">
        <div id="vfor">
        <!-- <div v-for="label in labels" class="divHTML border"> -->
          <div class="divHTML border">
            <div class="transparent-shadow"><h3 class="px-5 py-2">label.name</h3></div>
            
            <h4 class="px-5 py-2">label.title</h4>
            <p class="px-5 py-2">label.detail</p>
          </div>
        </div>
      
          <div id="SOS"><component :is="this.var"></component><img src="img/head.png"  onclick="app.help()" id="head"></div>
        </diV>
      `
    },
    
    
    
  }
  
})