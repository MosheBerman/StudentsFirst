// ==UserScript==
//
// @name Students First
//
// @namespace	http://mosheberman.com
// @description   Implements a cleaner interface over CUNY First, and fixes some UI issues.
// @version 0.4
//
// @include      https://*cunyfirst.cuny.edu/*
// @include      http://*cunyfirst.cuny.edu/*
// @include		 https://impweb.cuny.edu/selfservice/activation/start.action
//
// @author Moshe Berman
//
// ==/UserScript==

/* 
 *	School selection
 *
 *	This code tells us what school we're working with.
 *	This is helpful for things like hiding or showing 
 *	inactive tabs.
 *
 */

var schoolNames = ["Baruch",
"Borough of Manhattan Community College",
"Brooklyn College",
"City College of New York",
"CUNY Graduate Center",
"CUNY Graduate School of Journalism",
"CUNY School of Professional Studies",
"CUNY School of Law",
"College of Staten Island",
"Hostos Community College",
"Hunter College",
"John Jay College of Criminal Justice",
"Kingsborough Community College",
"LaGuardia Community College",
"Lehman College",
"Macaulay Honors College at CUNY",
"Medgar Evers College",
"New York City College of Technology",
"The New Community College at CUNY",
"Queens College",
"Queensborough Community College",
"CUNY School of Public Health",
"College of Staten Island",
"York College"
];

function currentSchool()
{
	// For now, stick to BC
	return schoolNames[2];
}

/* 
 *	Page selection
 *
 *	This code tells us what page we're on.
 *	This is helpful for page-specific customizations.
 *
 */

/*
 *	IMPORTANT: This drives a lot of the logic flow.
 * 	An array of pages we know about...
 */

var pages = ["unknown", "default", "self service", "login", "claim"];

// Slugs and stuff to help find pages
var claimSlug = "selfservice/activation/start.action";	//	Sign Up page
var loginSlug = "Portal_Login";	//	Log in page
var defaultPageParam = "tab=DEFAULT";	//	Default page
var selfServiceParam = "pt_fname=CO_EMPLOYEE_SELF_SERVICE";	//	The self service page

/* This function attempts to determine the current page based on the URL. */
function getCurrentPage ()
{

	var location = baseURL(window.location.toString());
	var params = URLParams(window.location.toString());

	// If the defaultPageSlug is in the array, we're in the default page	
	if(contains(params, defaultPageParam))
	{
		return pages[1]		//	Default tab
	}
	
	//	If the URL params contain the self service params, we're looking at the home page 
	else if(contains(params, selfServiceParam))
	{
		return pages[2];
	}

	//	If we've got the login slug, so we're at the log in page
	else if(location.search(loginSlug))
	{
		return pages[3];
	}

	//	If the URL contains the claim page slug, we're in the claim your ID page
	else if(location.search(claimSlug) >= 0)
	{
		return pages[4];	//	Claim page
	}


	return pages[0];
}

// A link to the control panel page - it has an iFrame which we want to load as *the* page.
var selfServiceLink = "https://hrsa.cunyfirst.cuny.edu/psp/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE";

//	This is the page we actually want to see when we log in/
var selfServiceFrameLink = "https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE&PortalActualURL=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentURL=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentProvider=HRMS&PortalCRefLabel=Base%20Navigation%20Page&PortalRegistryName=EMPLOYEE&PortalServletURI=https://hrsa.cunyfirst.cuny.edu/psp/cnyhcprd/&PortalURI=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/&PortalHostNode=HRMS&NoCrumbs=yes&PortalCacheContent=true&PSCache-Control=max-age%3d360%2crole&PortalKeyStruct=yes"

/* Entry point of the script, called above. */

function main()
{
	console.log("Students First is running. I'm so sorry we have to do this...");
	
	var currentPage = getCurrentPage();

	console.log("[SF] Page Key:" currentPage);

	if(currentPage == pages[1])
	{
		//	default - go to self service
		console.log('Default, redirecting....');
		goToSelfService();

	}
	else if(currentPage == pages[2])
	{
		//	self service
	}
	else if(currentPage == pages[3])
	{

	}
	else if(currentPage == pages[4])
	{

	}
	else
	{
		//Unknown
	}
}

/*
 *
 *	Jump to the self service page
 *
 */

 function goToSelfService()
 {
 	console.log('Redirecting to Self Service...');
 	window.location = selfServiceFrameLink;
 }

/*
 *	Build a skeleton UI to work with.
 *
 *	We'll load page specific stuff 
 *	into here as necessary.
 *
 */

function cleanUI()
{

}

/*
 *	Login Page
 *
 *	This code modifies the login page so that 
 *  it makes a little more sense. 
 *
 *	We make use of the drop down menu at the
 *	top of the page, and replace the ridiculous
 *	top banner with something a little nicer. :-)
 *
 */

/* Add some relevant info to the main menu on the login page. */

function mainMenuLoginPage()
{

	var menu = document.getElementById("mainnav");

	//	Clear the menu	
	menu.innerHTML = "";

	menu.appendChild(navList());
}

/* Login Utilities */

function navList()
{
	var list = document.createElement("ul");

	//	Move the "password links to the top"
	var claimLink = listNodeWithLink("https://impweb.cuny.edu/selfservice/activation/start.action", "Get a Username");
	var aboutLink = listNodeWithLink("https://github.com/MosheBerman/StudentsFirst", "About Students First");

	list.appendChild(claimLink);
	list.appendChild(aboutLink);
	
	return list;	
}

/*
 *	Landing Page
 *
 *	This code modifies the landing page so that 
 *  it makes a little more sense. 
 *
	Indended fixes:

	- Hide side menu
	- Shrink warnings, notifications
	- Add some large buttons
 *
 */

 // TODO: Implement this

/*
 *	General Utility functions
 *
 *	These miscellaneous functions are used
 *  throughout the Students First userscript.
 */

function listNodeWithLink(url, content)
{
	
	// Create a list node
	var listItem = document.createElement("li");

	//	Create an anchor node
	var node = document.createElement("a");
	node.setAttribute("href", url);
	
	//	Set the anchor's text
	var text = document.createTextNode(content);
	node.appendChild(text);

	//	Wire the anchor to the list item
	listItem.appendChild(node);
	
	return listItem;
}

/*
 *	Test for local storage support - in case we want to save settings
 */

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

/*
 *	Checks for a value in an array
 */

 function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/*
 *	URL Utilities
 */ 

 function baseURL(url)
 {
 	var split = url.split("?");
 	return split[0];
 }

 function URLParams(url)
 {
	var paramsAndAndURL = url.split("?");
	var paramString = paramsAndAndURL[1] ? paramsAndAndURL[1] : "";
	var paramsArray = paramString.split("&");

	return paramsArray;
 }

 /* Let's go! */

main();
