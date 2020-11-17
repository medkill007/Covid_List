var app = new Vue({
  el: '#app',
  data () {
    return {
      countryList: null,
      pickedDays: 7
    }
  },
  /*default get*/
  async mounted () {
    await axios
      .get('https://api.covid19api.com/country/'+countryCut(window.location.search, " "))
      .catch(function (error) {console.log(error)})
      .then(res => (this.countryList = res.data));

    var dataList = [];
    var fixDays=this.pickedDays;
    var x=this.countryList.length;
    var o=0;
    /*datas reverse and United Kingdom have Provinces and last day difference calc*/
    for (var i = x-1; i >= x-this.pickedDays; i--) {
      if (this.countryList[i].Province=="") {
        dataList.push(this.countryList[i]);
      } else {
        this.pickedDays++;
        o--;
      }
      if (o!=0 && dataList.length>=2) {
        dataList[o-1].newConfirmed = dataList[o-1].Confirmed-dataList[o].Confirmed;
        dataList[o-1].newDeaths = dataList[o-1].Deaths-dataList[o].Deaths;
        dataList[o-1].newRecovered = dataList[o-1].Recovered-dataList[o].Recovered;
      }
      if(o<fixDays && dataList.length>=2){
        dataList[o].newConfirmed = 0;
        dataList[o].newDeaths = 0;
        dataList[o].newRecovered = 0;
      }
      o++;
    }
    this.countryList=null;
    this.countryList=dataList;
  },
  /*check days buttons and run get*/
  methods:{
    currentValue(newValue){
      if (this.pickedDays!=newValue) {
        this.pickedDays=newValue;
        this.runGet();
        console.log(this.pickedDays);
      }
    },
    async runGet(){
      await axios
        .get('https://api.covid19api.com/country/'+countryCut(window.location.search, " "))
        .catch(function (error) {console.log(error)})
        .then(res => (this.countryList = res.data));

      var dataList = [];
      var fixDays=this.pickedDays;
      var x=this.countryList.length;
      var o=0;
      /*datas reverse and United Kingdom have Provinces and last day difference calc*/
      for (var i = x-1; i >= x-this.pickedDays; i--) {
        if (fixDays>22 && dataList.length>1) {
          if(dataList[0].Date.substring(5, 7)!=this.countryList[i].Date.substring(5, 7)){
            break;
          }
        }
        if (this.countryList[i].Province=="") {
          dataList.push(this.countryList[i]);
        } else {
          this.pickedDays++;
          o--;
        }
        if (o!=0 && dataList.length>=2) {
          dataList[o-1].newConfirmed = dataList[o-1].Confirmed-dataList[o].Confirmed;
          dataList[o-1].newDeaths = dataList[o-1].Deaths-dataList[o].Deaths;
          dataList[o-1].newRecovered = dataList[o-1].Recovered-dataList[o].Recovered;
        }
        if(o<fixDays && dataList.length>=2){
          dataList[o].newConfirmed = 0;
          dataList[o].newDeaths = 0;
          dataList[o].newRecovered = 0;
        }
        o++;
      }
      this.countryList=null;
      this.countryList=dataList;
    }
  }
});
function countryCut(c, char) {
  return c.substring(c.indexOf("=")+1).replace(/%20/g, char);
};
function formatNum(number){
  var n = new Intl.NumberFormat().format(number);
  return n.slice(0, 20).concat(" ").concat(n.slice(10, 12));
};
function formatTime(number) {
  return number.substring(0, number.indexOf("-", number.indexOf("-") + 1)+3);
}

var daysButton1=document.getElementById('button1');
var daysButton2=document.getElementById('button2');
var daysButton3=document.getElementById('button3');

daysButton1.onclick = function() {
  this.classList.add("active");
  daysButton2.className = daysButton2.className.replace(/\bactive\b/g, "");
  daysButton3.className = daysButton3.className.replace(/\bactive\b/g, "");
};
daysButton2.onclick = function() {
  this.classList.add("active");
  daysButton1.className = daysButton1.className.replace(/\bactive\b/g, "");
  daysButton3.className = daysButton3.className.replace(/\bactive\b/g, "");
};
daysButton3.onclick = function() {
  this.classList.add("active");
  daysButton1.className = daysButton1.className.replace(/\bactive\b/g, "");
  daysButton2.className = daysButton2.className.replace(/\bactive\b/g, "");
};
/*
 async mounted () {
    await axios
      .get('https://api.covid19api.com/countries')
      .catch(function (error) {console.log(error)})
      .then(res => (this.countryList = res.data));

    var dataList = [];
    for (var i = 0; i < this.countryList.length; i++) {
      await axios
        .get('https://api.covid19api.com/country/'+this.countryList[i].Country)
        .then(res => (dataList.push(res.data[res.data.length - 1])))
        .catch(error => {console.log(error.response)});
    }
    this.countryData=dataList;
  }*/