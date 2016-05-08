$(function () {
    var obj = JSON.parse(data);
    console.dir(obj);
    var dates = [];
    var weightValues = [];
    var datasets_arr = [];
    var dataset = [];
    //this will be used for looping through json fields
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (/^[0-9]{2,3}$/.test(obj[key])){
                dataset.push([key, obj[key]]);
            } else {
                if (dataset.length > 0){
                    datasets_arr.push(dataset);
                    console.log('dataset: '+dataset);
                }
                dataset = [];
                dataset.push([key, obj[key]]);

            }
        }
    }

    var labels = []

    for (var i = 0; i < datasets_arr.length; i++){
        console.log('datasets_arr['+i+'] = '+ datasets_arr[i]);
        if (datasets_arr[i].length > 1){
            for (var j = 1; j < datasets_arr[i].length; j++){
                labels.push(datasets_arr[i][j][0]);
                console.log("labelis: "+ datasets_arr[i][j][0])
            }
        }
    }
    //console.log('datasets_arr[0][0] = '+ datasets_arr[0][0]);

    // console.log("dates = " + dates);
    // console.log("weightValues = " + weightValues);
    // console.dir("obj_arr = " + obj_arr);
    console.dir("datasets_arr = " + datasets_arr);


    // obj_arr.sort(function(a, b) {
    //     a = a[1];
    //     b = b[1];
    //
    //     return a < b ? -1 : (a > b ? 1 : 0);
    // });
    //
    // for (var i = 0; i < obj_arr.length; i++) {
    //     var key = obj_arr[i][0];
    //     var value = obj_arr[i][1];
    //
    //
    // }

    var colors = ['white', 'green', 'red', 'blue'];

    //console.log("datasets_arr[1][1][1] =" + datasets_arr[1][1][1]);

    function rotateColors() {
        var first_color = colors.shift();
        colors.push(first_color);
        return "\""+colors[0]+"\"";
    }

    var datasets = [];

    function loadDatasets() {
        //gali tekti perdaryti kad ne tik datasetus loadintu bet ir visa barChartData
        //last_label loope updeitinsi pamates kad weight susideda is raidziu (vadinasi ten workouto pavadinimas) ir pagal tai uzdesi labeli.
        //taip pat padaryti nextColor() funkcija kuri kai keiciasi keiciasi labelis pakeistu ir spalva
        var last_label = '';
        var last_color = '';
        for (var i = 0; i < datasets_arr.length; i++){
            for (var j = 0; j < datasets_arr.length; j++) {
                datasets.push({
                    label: datasets_arr[i][0][1],
                    backgroundColor: "rgba(151,187,205,0.5)",
                    //data: [80],
                    // cia reikia grazinti masyva
                    data: datasets_arr[i][j][1],
                    borderColor: rotateColors(),
                    borderWidth: 0,
                });
            }
        }
        return datasets;
    }

    var barChartData = {
        //TODO pakeisti i datas kada buvo padaryti svorio irasai
        labels: labels,
        //TODO kiekvienam svorio irasui sukurti atskira dataseto irasa ir kiekvienam priskirti workouta (pagal tai ir uzvadinti "label". skirtingiems labeliams uzdeti skirtingas spalvas
        datasets:
            loadDatasets()
        //{
        //    label: dataset[0][1],
        //    backgroundColor: "rgba(151,187,205,0.5)",
        //    data: [80],
        //    // cia reikia grazinti masyva
        //    // data: datasets_arr[i+1][j][1],
        //    borderColor: rotateColors(),
        //    borderWidth: 0,
        //}


    };

    window.onload = function () {
        var ctx = document.getElementById("myChart");
        window.myBar = new Chart(ctx, {
            type: 'line',
            data: barChartData,
            options: {
                responsive: true,
            }
        });
    };
})
