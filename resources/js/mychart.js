// require('./bootstrap');

// window.moment = require('moment');

window.$ = require('jquery');

function getChart(arrayNewClick, week){

  // $('#myChart').remove();
  //
  // $('#views-chart').prepend(`<canvas id="myChart></canvas>`);


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: week,
          datasets: [{
              label: 'Numero di Click',
              data: arrayNewClick,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(60, 80, 130, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(60, 80, 130, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
                  responsive: true,
                  maintainAspectRatio:true,
                  title: {
                      display: true,
                      text: "Visualizzazioni dell'Appartamento: Settimana del " + week[0],
                      fontSize: "14"
                  },
          scales: {
              yAxes: [{
                  ticks: {
                      stepSize: 1,
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}


function chartExample(){

  var ctx = document.getElementById('mymessageChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [1,2,3,4,5],
          datasets: [{
              label: 'Numero di Click',
              data: [1,2,3,4,5],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Vision Logged Hours'
                    },


          scales: {

            xAxes:[{

                    ticks: {
                        display: true
                    }

            }],



              yAxes: [{
                  ticks: {
                    display: false,
                    drawBorder: false,
                      beginAtZero: true
                  }
              }]
          }

      }
  });
}







function getData( id, week, clickToMatch ){
  console.log('ENTER');

  $.ajax({
    url:"/api/statistic/" + id,
    method:'GET',
    success: function(data,state){

      var datalength= data.length;

      var arrayNumOfClick = [];
      var arrayCurrentDatas = [];

      for (let key in data) {
        var dataFormat = moment(data[key]['current_date']).format("YYYY-MM-DD");
        arrayCurrentDatas.push(dataFormat);

        arrayNumOfClick.push(data[key]['number_of_click']);
      }

        for (var i = 0; i < datalength; i++) {

          if(week.includes(arrayCurrentDatas[i]) ){
            var key = week.indexOf(arrayCurrentDatas[i]);
            clickToMatch[key] = arrayNumOfClick[i];
          }
        }

        var arrayNewClick = clickToMatch;

      getChart(arrayNewClick, week);

    },
    error: function(err) {
      console.log('error', err);
    }
  });
}

function nextWeek(id){

    var mybutton = $('#chart-next').attr('click');
    var newstartdate = moment(mybutton).add( 1, 'week');

    $('#chart-prev').attr('click', newstartdate.format("YYYY-MM-DD"));
    $('#chart-next').attr('click', newstartdate.format("YYYY-MM-DD"));

    var nxtweek = [];
    var clickToMatch = [0,0,0,0,0,0,0];
    for (var i = 0; i < 7; i++) {
      var day = newstartdate.add(1, "days").format("YYYY-MM-DD");
      nxtweek.push(day);
    };

    getData(id, nxtweek, clickToMatch );
}




function prevWeek(id){

    var mybutton = $('#chart-prev').attr('click');
    var newstartdate = moment(mybutton).subtract( 1, 'week');

    $('#chart-prev').attr('click', newstartdate.format("YYYY-MM-DD"));
    $('#chart-next').attr('click', newstartdate.format("YYYY-MM-DD"));

    var prvweek = [];
    var clickToMatch = [0,0,0,0,0,0,0];
    for (var i = 0; i < 7; i++) {
      var day = newstartdate.add(1, "days").format("YYYY-MM-DD");
      prvweek.push(day);
    };

    getData(id, prvweek, clickToMatch );
}




function init(){

  var href = document.URL.split('/');
  var id = href.pop() || href.pop();

  var startdate = moment().add(1,'days');
  var week = [];
  var clickToMatch = [0,0,0,0,0,0,0];

  for (var i = 0; i < 7; i++) {
    var day = startdate.subtract(1, "days").format("YYYY-MM-DD");
    week.push(day);
  };


  getData(id, week, clickToMatch );

  var prevbuttonAttr = $('#chart-prev').attr('click', startdate.format("YYYY-MM-DD"));
  var nextbuttonAttr = $('#chart-next').attr('click', startdate.format("YYYY-MM-DD"));

  $('#chart-prev').on('click', function() {prevWeek(id)});
  $('#chart-next').on('click', function() {nextWeek(id)});

  // chartExample();

}

$(document).ready(init);