
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener("resize", updateSize)
updateSize();

const app = new Vue({
  el:"#app",
  data:{
    qod:"",
    labels: "asd",
    modulos:[],
    dialog: "none"
  },
  async created(){
    var firebaseConfig = {
      apiKey: "AIzaSyBRPTYrGurdv3LGoLbIe3Z7bCSzf1GTiv0",
      authDomain: "challenge-mil3r.firebaseapp.com",
      databaseURL: "https://challenge-mil3r.firebaseio.com",
      projectId: "challenge-mil3r",
      storageBucket: "challenge-mil3r.appspot.com",
      messagingSenderId: "501597643651",
      appId: "1:501597643651:web:e765718303a21aa7b70cb6",
      measurementId: "G-JY3E9447J4"
    };
    firebase.initializeApp(firebaseConfig);
      await firebase.database().ref('HTMLInfo/').once('value')
        .then(function(snapshot){
            app.labels = snapshot.val()
        })
  },
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
  methods:{
    help(){
      
      switch(app.dialog){
        case "none":
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
      app.dialog = "none"
    }
  
  }
})