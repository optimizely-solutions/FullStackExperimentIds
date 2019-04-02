console.log("v0.1.31");
var optly = new OptimizelyAPI({
    password: 'fsexperimentids',
    oauth_client_id: 14330300653
  });

var form = document.getElementById("simple-form")
form.onsubmit = function (event) { 
    event.preventDefault();
    var projectID = document.getElementById("projectid").value;
    optly.get("experiments?project_id=" + projectID, function(exps){
        console.log(exps);
    });
}