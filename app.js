var express = require('express')
var app = express()
var twilio = require('twilio')
var bodyParser = require('body-parser');
var accountSid = 'AC468bd62626fda86125a71584d80b3c6b'; // Your Account SID from www.twilio.com/console
var authToken = '68cd271f75df2bb8579c216e643a8618';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use(express.static('public'));
app.use('/views', express.static(__dirname + '/views'));
app.set('view engine','ejs')

app.get('/',function(req,res){
	res.render('index')
})
otp = ''
app.post('/',function(req,res){
	console.log(req.body)
	otp = Math.floor(Math.random()*90000) + 10000;
	client.messages.create({
    body: 'Your One time password is ' + otp,
    to: req.body.phone,  // Text this number
    from: '+12565783677' // From a valid Twilio number
}, function(err, message) {
    if(err) {
        console.error(err.message);
    }

});
	res.render('verify-otp')
})

app.post('/verify-otp',function(req,res){
	if(req.body.otp == otp){
		res.send('<script>alert("You have successfully verified")</script>')
	}
	else{
		res.send(
			res.send('<script>alert("Invalid OTP")</script>')
			)
	}
})

app.listen('3000',function(err){
	console.log('Server started on port 3000')
})