//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// Add your routes here


router.post('/prototype-kit-training-page-2-submit', function (req, res) {
// Make a variable and give it the value from 'how-many-balls'
var radiobuttonname = req.session.data['choicenewname']
// Check whether the variable matches a condition
if (radiobuttonname == "Yes"){
// Send user to next page
res.redirect('prototype-kit-training-page-3')}
else {
// Send user to ineligible / check answers page
res.redirect('prototype-kit-training-page-4')
} })