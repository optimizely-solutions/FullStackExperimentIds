console.log("Fullstack IDs v0.2.4");
var csv = "";

var optly = new OptimizelyAPI({
    password: 'fsexperimentids',
    oauth_client_id: 14330300653
  });

function download_csv() {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'experiments_by_id.csv';
    hiddenElement.click();
}


var form = document.getElementById("simple-form")
form.onsubmit = function (event) { 
    event.preventDefault();
    var projectID = document.getElementById("projectid").value;
    optly.get("experiments?per_page=100&project_id=" + projectID, function(exps){
        console.log(exps);
        var htmlString = "";
        var button = "<button onclick='download_csv()'>Download CSV</button>";
        for (let i = 0; i < exps.length; i++) {
            var experiment = exps[i];
            htmlString += "<p>" + experiment.id + " ----> " + experiment.key + "</p>";
            csv += experiment.id + "," + experiment.key + "\n";
        }
        document.getElementById("experiments").innerHTML = htmlString;
        document.getElementById("download").innerHTML = button;
    });
}

