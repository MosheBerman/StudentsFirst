// ==UserScript==
//
// @name Students First
//
// @namespace	http://mosheberman.com
// @description   Implements a cleaner interface over CUNY First, and fixes some UI issues.
// @version 0.5
//
// @include      https://*cunyfirst.cuny.edu/*
// @include      http://*cunyfirst.cuny.edu/*
// @include		 https://impweb.cuny.edu/selfservice/activation/start.action
//
// @author Moshe Berman
//
// ==/UserScript==

/* -------- Configurable Global variables ----------- */

var stylesheetURL = "https://raw.github.com/MosheBerman/StudentsFirst/master/css/sf.css";
var petitionURL = "http://www.change.org/petitions/city-university-of-new-york-fix-cuny-first";

/* -------- Scraping related Global variables ----------- */

var pages = [	"unknown",
 				"default",
 				"self service",
 				"login",
 				"claim",
 				"logged out"];

// Slugs and stuff to help find pages
var claimSlug = "selfservice/activation/start.action";	//	Sign Up page
var loginSlug = "Portal_Login1.html";	//	Log in page
var loggedOutSlug= "oam/logout.html";	//	Log out page

var defaultPageParam = "tab=DEFAULT";	//	Default page
var selfServiceParam = "pt_fname=CO_EMPLOYEE_SELF_SERVICE";	//	The self service page

//A link to the control panel page - it has an iFrame which we want to load as *the* page.
var selfServiceFrameURL = "https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE&PortalActualURL=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentURL=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP&PortalContentProvider=HRMS&PortalCRefLabel=Base%20Navigation%20Page&PortalRegistryName=EMPLOYEE&PortalServletURI=https://hrsa.cunyfirst.cuny.edu/psp/cnyhcprd/&PortalURI=https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/&PortalHostNode=HRMS&NoCrumbs=yes&PortalCacheContent=true&PSCache-Control=max-age%3d360%2crole&PortalKeyStruct=yes"
var loginURL = "https://hrsa.cunyfirst.cuny.edu/oam/Portal_Login1.html";
var logoutURL = "https://hrsa.cunyfirst.cuny.edu/psp/cnyhcprd/EMPLOYEE/HRMS/?cmd=logout";



var schoolNames = ["Baruch College",
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
"York College"];

/* 
 *	School selection
 *
 *	This code tells us what school we're working with.
 *	This is helpful for things like hiding or showing 
 *	inactive tabs.
 *
 */

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

function getCurrentPage ()
{

	var location = baseURL(window.location.toString());
	var params = URLParams(window.location.toString());

	// If the defaultPageSlug is in the array, we're in the default page	
	if(contains(params, defaultPageParam) && params.length == 1)
	{
		return pages[1]		//	Default tab
	}
	
	//	If the URL params contain the self service params, we're looking at the home page 
	else if(contains(params, selfServiceParam))
	{
		return pages[2];
	}

	//	If we've got the login slug, so we're at the log in page
	else if(containsSubstring(location, loginSlug))
	{
		return pages[3];
	}

	//	If the URL contains the claim page slug, we're in the claim your ID page
	else if(containsSubstring(location, claimSlug))
	{
		return pages[4];	//	Claim page
	}
	//	If the url contains a logged out slug, redirect home
	else if(containsSubstring(location, loggedOutSlug))
	{
		goToLogin();
	}


	return pages[0];
}

/* Entry point of the script, called above. */

function main()
{

	//	Debug confirmation - show that the script is installed
	console.log("Students First is running. I'm so sorry we have to do this...");

	//	Break out of those frames!
	if (top.location!= self.location) {
		top.location = self.location.href
	}

	//	Detect the current page and take action! Action, I say!
	var currentPage = getCurrentPage();

	//	Log out the current page key
	console.log("[SF] Page Key: " + currentPage);

	if(currentPage == pages[1])
	{
		//	default - go to self service
		console.log('Default, redirecting....');
		goToSelfService();

	}
	else if(currentPage == pages[2])
	{
		//	self service
		mainMenu();
		document.getElementsByTagName("table")[0].setAttribute("width", "960px");
		document.getElementsByTagName("table")[0].style.margin = "auto";
	}
	else if(currentPage == pages[3])
	{
		//	Login
		mainMenuLoginPage();
	}
	else if(currentPage == pages[4])
	{
		//	Claim your ID page
	}
	else
	{
		mainMenu();
	}

	//	Install a fresh stylesheet
	installCSS();

	//	Clean up breadcrumbs and titles...
	cleanPage();	
	
	retina();

}

/*
 *	Jump to the self service page
 */

 function goToSelfService()
 {
 	window.location = selfServiceFrameURL;
 }

 /*
 *	Jump to the login page
 */

 function goToLogin()
 {
 	window.location = loginURL;
 }

/*
 *	Build a skeleton UI to work with.
 *
 *	We'll load page specific stuff 
 *	into here as necessary.
 *
 */

function freshUI()
{

}

/*
 *	Clean up an existing CF Page
 *
 */

var breadcrumbs = "EOPP_SCBREADCRUMBSECTION";
var titleSectionsClass = "EOPP_SCPAGETITLESECTION";

function cleanPage()
{
	/*	Kill all breadcrumbs */
	var crumbs = document.getElementsByClassName(breadcrumbs);

	for (var i = crumbs.length - 1; i >= 0; i--) {

		removeNode(crumbs[i]);
	};

	/* Edit the title */

	var titles = document.getElementsByClassName(titleSectionsClass);

	for (var i = titles.length - 1; i >= 0; i--) {
		if(containsSubstring(titles[i].innerText, "Self Service") || containsSubstring(titles[i].innerText, "CUNY First"))
		{
			titles[i].innerText = "Students First";
		}
	};
}

/* 
 *	Main Menu
 *
 *	Render a main menu for self service subpages.
 *
 */

function mainMenu()
{
	var page = document.getElementsByClassName("PSPAGE")[0];	//	The body tag was stupidly named as such

	var mainMenu = document.createElement("div");
	mainMenu.setAttribute("id", "students-first-menu");

	var mainMenuButton = link(selfServiceFrameURL, "Main Menu");
	mainMenuButton.setAttribute("id", "students-first-main-menu-link");
	mainMenuButton.setAttribute("class", "students-first-link");	
	mainMenu.appendChild(mainMenuButton);

	var logOutButton = link(logoutURL, "Log Out");
	logOutButton.setAttribute("id", "students-first-logout-link");
	logOutButton.setAttribute("class", "students-first-link");	
	mainMenu.appendChild(logOutButton);

	page.insertBefore(mainMenu, page.firstChild);
}

function installCSS()
{

	 var head = document.getElementsByTagName('head')[0];

	// var stylesheet = css();

	// var domainSetter = document.getElementsByTagName("script")[0];

	head.appendChild(css());
	
}

function css()
{
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = stylesheetURL;
	return cssNode;
}
/*
 *	Login Page
 *
 *	This code modifies the login page so that 
 *  it makes a little more sense. 
 *
 */

/* Add some relevant info to the main menu on the login page. */

function mainMenuLoginPage()
{

	/* Set the title */
	document.title = "Students First Login";

	/* Remove the login page... */
	removeNode(document.getElementById("container"));

	/* Create a navigation list. */
	var nav = navList();

	/* Title */
	var title = loginTitle();

	/* Create a login view. */
	var login = loginForm();

	/* Create a wrapper... */
	var wrapper = loginWrapper();

	/* Wire it all up */
	document.body.appendChild(wrapper);
	wrapper.appendChild(title);
	wrapper.appendChild(login);
	wrapper.appendChild(nav);
}

/* Creates a title for the login. */
function loginTitle()
{

	var boldTitleText = document.createTextNode("Students First.");
	var logInText = document.createTextNode(" Please log in.");
	var boldNode = document.createElement("strong");

	boldNode.appendChild(boldTitleText);

	var title = document.createElement("h3");
	title.appendChild(boldNode);
	title.appendChild(logInText);
	title.setAttribute("id", "students-first-login-title");
	return title;
}

/* Creates the login form proper */
function loginForm()
{
	var formNode = document.createElement("form");
	formNode.setAttribute("name", "loginform");	
	formNode.setAttribute("id", "students-first-login-form");
	formNode.setAttribute("action", "/bookmark/hsitas.html");
	formNode.setAttribute("method", "post");

	var nameInput = input("login", "login", "username students-first-input-text");
	nameInput.setAttribute("placeholder", "Username");

	var passwordInput = input("password", "password", "password students-first-input-text", "password");
	passwordInput.setAttribute("placeholder", "Password");

	formNode.appendChild(nameInput);
	formNode.appendChild(passwordInput);	
	formNode.appendChild(input("submit", "submit", "", "submit"));

	return formNode;
}

function loginWrapper()
{
	var wrapperNode = document.createElement("div");
	wrapperNode.setAttribute("id", "students-first-login-wrapper");
	return wrapperNode;
}

function label(forAttr, classAttr)
{
	var labelNode = document.createElement("label");
	labelNode.setAttribute("for", forAttr);
	labelNode.setAttribute("class", classAttr);
	return labelNode;
}

function input(idAttr, nameAttr, classAttr, type)
{

	type = typeof type != 'undefined' ? type : "text";

	var inputNode = document.createElement("input");
	inputNode.setAttribute("id", idAttr);
	inputNode.setAttribute("name", nameAttr);
	inputNode.setAttribute("type", type);
	inputNode.setAttribute("class", classAttr);
	return inputNode;
}

/* Login Utilities */

function navList()
{
	var list = document.createElement("ul");

	//	Move the "password links to the top"
	var menuClaimURL = listNodeWithURL("https://impweb.cuny.edu/selfservice/activation/start.action", "Get a Username");
	var menuForgotURL = listNodeWithURL("https://impweb.cuny.edu/selfservice/activation/start.action", "I Forgot My Password");
	var menuChangeURL = listNodeWithURL("https://impweb.cuny.edu/selfservice/changepwd/start.action", "I Want to Change My Password");	
	var menuPetitionURL = listNodeWithURL(petitionURL, "Tell CUNY to Put Students First!");
	var menuAboutURL = listNodeWithURL("https://github.com/MosheBerman/StudentsFirst", "About Students First");

	list.appendChild(menuForgotURL);
	list.appendChild(menuChangeURL);	
	list.appendChild(menuClaimURL);
	// list.appendChild(menuAboutURL);
	// list.appendChild(menuPetitionURL);
	
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

 // TODO: Implement this - for now, redirect

/*
 *	General Utility functions
 *
 *	These miscellaneous functions are used
 *  throughout the Students First userscript.
 */

/*
 *	DOM Utilities
 */

//	Removes a node from the DOM
 function removeNode(node)
 {
 	node.parentNode.removeChild(node);
 }

//	Create a link and wrap it in a list element
function listNodeWithURL(url, content)
{
	
	// Create a list node
	var listItem = document.createElement("li");

	var node = link(url, content);

	//	Wire the anchor to the list item
	listItem.appendChild(node);
	
	return listItem;
}

//	Create a link, an "a tag"
function link(url, content)
{
	//	Create an anchor node
	var node = document.createElement("a");
	node.setAttribute("href", url);
	
	//	Set the anchor's text
	var text = document.createTextNode(content);
	node.appendChild(text);

	return node;
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
 *
 */

 function containsSubstring(haystack, needle)
 {
 	return haystack.search(needle) >= 0;
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

/* Retina-izer from retinajs.com */

function retina()
{
// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2

(function(){function t(e){this.path=e;var t=this.path.split("."),n=t.slice(0,t.length-1).join("."),r=t[t.length-1];this.at_2x_path=n+"@2x."+r}function n(e){this.el=e,this.path=new t(this.el.getAttribute("src"));var n=this;this.path.check_2x_variant(function(e){e&&n.swap()})}var e=typeof exports=="undefined"?window:exports;e.RetinaImagePath=t,t.confirmed_paths=[],t.prototype.is_external=function(){return!!this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain)},t.prototype.check_2x_variant=function(e){var n,r=this;if(this.is_external())return e(!1);if(this.at_2x_path in t.confirmed_paths)return e(!0);n=new XMLHttpRequest,n.open("HEAD",this.at_2x_path),n.onreadystatechange=function(){return n.readyState!=4?e(!1):n.status>=200&&n.status<=399?(t.confirmed_paths.push(r.at_2x_path),e(!0)):e(!1)},n.send()},e.RetinaImage=n,n.prototype.swap=function(e){function n(){t.el.complete?(t.el.setAttribute("width",t.el.offsetWidth),t.el.setAttribute("height",t.el.offsetHeight),t.el.setAttribute("src",e)):setTimeout(n,5)}typeof e=="undefined"&&(e=this.path.at_2x_path);var t=this;n()},e.devicePixelRatio>1&&(window.onload=function(){var e=document.getElementsByTagName("img"),t=[],r,i;for(r=0;r<e.length;r++)i=e[r],t.push(new n(i))})})();
}

 /* Let's go! */

main();
