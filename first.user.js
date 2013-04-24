// ==UserScript==
//
// @name Students First
//
// @namespace	http://mosheberman.com
// @description   Implements a cleaner interface over CUNY First, and fixes some UI issues.
// @version 0.02
//
// @include      https://*cunyfirst.cuny.edu/*
// @include      http://*cunyfirst.cuny.edu/*
//
// @author Moshe Berman
//
// ==/UserScript==

/* Let's go! */

main();

/* Global variables, yuck! */

// A link to the control panel...
var selfServiceLink = "https://hrsa.cunyfirst.cuny.edu/psp/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE";
var selfServiceFrameLink = "https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE&PortalActualURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fEMPLOYEE%2fHRMS%2fs%2fWEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fEMPLOYEE%2fHRMS%2fs%2fWEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentProvider=HRMS&PortalCRefLabel=Base%20Navigation%20Page&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsp%2fcnyhcprd%2f&PortalURI=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalCacheContent=true&PSCache-Control=max-age%3d360%2crole&PortalKeyStruct=yes"

/* Entry point of the script, called above. */

function main()
{
	console.log("Students First is running. I'm so sorry we have to do this...");
	
	mainMenuLoginPage();
}

/* Clean up the main UI */

function cleanUI()
{

}

/*
 *	SECTION: Login Page
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
 *	SECTION: Landing Page
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

/*
 *	SECTION: General Utility functions
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