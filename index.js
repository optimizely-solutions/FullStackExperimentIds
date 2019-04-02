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

optly.get("projects?per_page=100", function(projects){
    var options = "";
    for (let i = 0; i < projects.length; i++) {
        var project = projects[i];
        options += "<option value='" + project.id + "'>" + project.name + "</option>";
    }
    document.getElementById("projectid").innerHTML = options;
    document.getElementById('projectspinner').style.display = "none";
    document.getElementById('getexperiments').style.display = "block";
});

var form = document.getElementById("simple-form")
form.onsubmit = function (event) { 
    event.preventDefault();
    document.getElementById('spinner').style.display = "block";
    document.getElementById('experimentlist').style.display = "none";
    var projectID = document.getElementById("projectid").value;
    optly.get("experiments?per_page=100&project_id=" + projectID, function(exps){
        console.log(exps);
        var htmlString = "";
        if (exps.length < 1){
            var htmlString = "No Experiments Found";
        }
        var button = "<button onclick='download_csv()'>Download CSV</button>";
        for (let i = 0; i < exps.length; i++) {
            var experiment = exps[i];
            htmlString += "<p>" + experiment.id + " ----> " + experiment.key + "</p>";
            csv += experiment.id + "," + experiment.key + "\n";
        }
        document.getElementById("experiments").innerHTML = htmlString;
        document.getElementById("download").innerHTML = button;
        document.getElementById('spinner').style.display = "none";
        document.getElementById('experimentlist').style.display = "block";
    });
}

