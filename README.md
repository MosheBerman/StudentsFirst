Students First
=============

If you're a student (faculty, see below) at any one of the 23 City Universities of New York, you've been coerced into using this archaic shopping cart named CUNY First. 	

Students First is a userscript which makes CUNY First easier to use. In a manner of speaking, it puts the students first.

What Does it Look Like?
---

Students First looks like this: 

![Login page](./images/readme/demo.png)

What Does it Do?
---

Students first makes several changes to CUNY First. When you log on to CUNY First, the website remains the same, but it looks a little different.

1. The login screen is improved. It looks nicer and will allow you to save your username in the browser if you'd like.
2. Once logged in, Students First takes you straight to the Student Center. You don't have to click on "HR/Self Service anymore.
3. Cuny First menus are cleaned up. Instead of that page-in-a-page, you get just what you're looking for.
4. I've removed the images from the Student Center menus, because they were ugly. I may put them back in the future.
5. When you log out, you'll be automatically redirected to the login page. Convenience my friends. It's all about the clicks.


Setting It Up:
---

If you're on a Mac, you can install it in Safari by downloading [this extension](https://github.com/MosheBerman/StudentsFirst/blob/master/extensions/safari/output/StudentsFirst.safariextz?raw=true). Just double click it, and Safari will install it.

If you're using Chrome, download [first.user.js](https://raw.github.com/MosheBerman/StudentsFirst/master/first.user.js) and install it. Open Settings, click "Extensions", and drag it in. For Firefox, the process should be similar. If you're having trouble, search the web for "Installing a userscript in Firefox."

Tested on on Chrome, Firefox, and Safari 6 for OS X 10.8. 

A Note For Faculty:
---

If you're faculty, don't use this yet, because Students First skips the main menu, and jumps to the Student Center. You'll miss your stop. Once I can see what the faculty login/menu looks like, I can wire it all up correctly. Hang tight for now. (If you want to show me your menu, [email me](mailto:mosheberman@icloud.com).)

How it Works:
---
Students First is like putting a little makeup on CUNY First. It doesn't change anything about the system, but it changes CUNY First, so it looks more attractive. 

From a technical perspective, Students First is a userscript that rewrites parts of the CUNY First webpages' DOM on the fly to insert custom CSS and custom DOM nodes where necessary.

Is It Secure?
---

Students First never touches your personal information, nor does it change anything on CUNY's servers. It's as secure as CUNY First itself.


License:
---
Students First and associated files may not be sold, redistributed, or licensed, without written permission from Moshe Berman. The sole exception to this is that currently enrolled CUNY students may distribute, for free, the userscript via email. 

Feedback:
===
Got a question? Suggestion? Found a bug? [Shoot me an email.](mailto:mosheberman@icloud.com)