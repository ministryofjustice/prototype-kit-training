//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// Add your routes here


router.post('/prototype-kit-training-page-2-submit', function (req, res) {
	// Make a variable and give it the value from the question
	var radiobuttonname = req.session.data['choicenewname']
	// Check whether the variable matches a condition
	if (radiobuttonname == "Yes"){
	// Send user to next page
	res.redirect('prototype-kit-training-page-3')}
	else {
	// Send user to ineligible / check answers page
	res.redirect('prototype-kit-training-page-4')
	} 
})


router.post('/exports-answer', function(request, response) {
    var exports = request.session.data['exports']
    if (exports.includes("Fruit") && exports.includes("Vegetables")){
        response.redirect("/fruitandvegetables")
    } 

    else if (exports.includes("Fruit")){
        response.redirect("/fruit")
    } 

    else if (exports.includes("Vegetables")){
        response.redirect("/Vegetables")
    }
    
    else if (exports.includes("Meat")){
        response.redirect("/meat")
    }
   
})


router.post('/search', function (req, res)
    {
        if( req.session.data['search-nofilters'].includes("search 1") ||
            req.session.data['search-nofilters'].includes("search 2")  
            ) 

        {
            res.redirect('search-results-routing-1');
        }

        

        else ( req.session.data['search-nofilters'].includes("") )
        {
            res.redirect('search-results-routing-2');
        }

    })

