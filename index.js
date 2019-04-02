console.log("Fullstack IDs v0.2.2");
var optly = new OptimizelyAPI({
    password: 'fsexperimentids',
    oauth_client_id: 14330300653
  });

var form = document.getElementById("simple-form")
form.onsubmit = function (event) { 
    event.preventDefault();
    var projectID = document.getElementById("projectid").value;
    optly.get("experiments?per_page=100&project_id=" + projectID, function(exps){
        console.log(exps);
        var htmlString = "";
        var csvString = "";
        for (let i = 0; i < exps.length; i++) {
            var experiment = exps[i];
            htmlString += "<p>" + experiment.id + " ----> " + experiment.key + "</p>";
            csvString += experiment.id + "," + experiment.key + "\n";
        }
        document.getElementById("experiments").innerHTML = htmlString;
        document.getElementById("csv").innerHTML = csvString;
    });
}