const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
//const request=require("request");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.use(express.static("public"));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/Signup.html");
});


app.post("/", (req, res) => {

    const fName = req.body.firstname;
    const sName = req.body.secondname;
    const eMail = req.body.Email;



    const data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: sName
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/4474aa7158";


    const options = {
        method: "POST",
        auth: "naincy1:13fec4f0a1a7b9c6d4b9902e01110cb3-us12"
    }

    const request = https.request(url, options, (response) => {
        if ((response.statusCode) === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));

        });


    });

    request.write(jsonData);
    request.end();



    //console.log(fName,sName,eMail);

});

app.post("/failure", (req, res) => {

    res.redirect("/");

});


app.listen(port, function () {

    console.log("server is running on port 3000");
});


//03fec4f0a1a7b9c6d4b9902e01110cb3-us12
//4474aa7158



///code added by paras pipre