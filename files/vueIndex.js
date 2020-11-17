var app = new Vue({
  el: '#app',
  data () {
    return {
      countryList: null
    }
  },
  async mounted () {
    await axios
      .get('https://api.covid19api.com/summary')
      .catch(function (error) {console.log(error)})
      .then(res => (this.countryList = res.data.Countries));
  }
});

var app2 = new Vue({
  el: '#app2',
  data () {
    return {
      globalData: null
    }
  },
  mounted () {
    axios
      .get('https://api.covid19api.com/summary')
      .catch(function (error) {console.log(error)})
      .then(res => (this.globalData = res.data.Global));
  }
});

function formatNum(number){
	var n = new Intl.NumberFormat().format(number);
	return n.slice(0, 20).concat(" ").concat(n.slice(10, 12));
};

function searchFunction() {
  var td, txtValue;
  var input = document.getElementById("searchCountry");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("app");
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
};

function loadPage() {
	document.getElementById("arrowLoad").style.color = "rgba(255,255,255,1)";
	document.getElementById("arrowLoad").style.marginTop = "0px";
}