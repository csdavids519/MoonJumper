# *Moon Jumper*
---
![MoonJumperLogo](documentation/images/logo.png)

Moon Jumper is a simple game where players can test their skills avoiding dangerous objects on the surface of the moon. First time visitors are greeted at the welcome page with the option to view game rules, game controls, and other game hints.

The live site can be found here: [Moon Jumper](https://csdavids519.github.io/MoonJumper/)


![Responsive](documentation/images/amiresponsive.png)


## Deployment to GitHub Pages

- The live site was deployed to GitHub pages. 

- The site was deployed to GitHub pages. The steps to deploy are as follows:
    - In the GitHub repository, navigate to the Settings tab
    - From the source section drop-down menu, select the Master Branch
    - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

- The repository on Git Hub can be found at this link: [GitHub repository](https://github.com/csdavids519/MoonJumper)

---
## User Stories

### First Time Visitor Goals:
- Game instructions are easy to find and understand.
- Game rules are easy to find and understand.
- Navigating to game information and game play screen is simple.

### Returning Visitor Goals:
- Returning visitors familiar with game rules and controls should have quick access to the game area.

---
## Features
- Users are greeted with a welcome page that will also display the game rules and hints.
- Clicking the start game button will bring users to the game board scree, where a game board is created relative to the users screen size. 


### Welcome page
- Welcome page to all users, link provided for new users to learn game rules and game controls.

![Welcome page](documentation/images/welcome_small.png)

### Controls / Game info page
- Here users can read more about the game functions and learn about the game controls.

![Controls page](documentation/images/controlshints_small.png)


### Game board
  - Visit the game board page to play Moon Jumper.

![Game page](documentation/images/gameboard_small.png)


## Technologies Used
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) was used as the foundation of the site.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/css) - was used to add the styles and layout of the site.
- [JavaScript](https://www.javascript.com/) - was used to create the game functions.
- [VSCode](https://code.visualstudio.com/) was used as the code editor.
- [GitHub](https://github.com/) was used to host the code of the website.
- [SourceTree](https://www.sourcetreeapp.com/) was used to manage the version control.
- [GIMP](https://www.gimp.org/) was used to edit and resize images.
- [OpenArt](https://openart.ai/home) was used to develop the game play images used.  
- Google Dev Tools was used for website testing.
- Google Light House was used for website testing.
- [Responsive Design Checker](https://responsivedesignchecker.com/) was used to check the responsiveness of the site on multiple screen sizes.
- [Am I responsive](https://ui.dev/amiresponsive) was used to generate an image of the site on different screen sizes.
- [Markup Validation Service](https://validator.w3.org/) Was used to validate the HTML code.
- [CSS Validation Service](https://jigsaw.w3.org/css-validator/) Was used to validate the CSS code.
- [JS Hint](https://jshint.com/) was used to validate the JavaScript code.

---
## Design

### Color Scheme
![Color Pallet](documentation/images/colorpallet.png)

- The color scheme and font for the welcome and how to pages was chosen for high contrast and fun look and easy readability.
- The gray scale color scheme of the game board was chosen to set the mood of the moon setting consistent with the game story. 


## Testing

### Tests
 - Screen size responsiveness of the website [Responsive Design Checker](https://responsivedesignchecker.com/) was used to view the site on multiple screen sizes.
    - The site responded as expected on all screen sizes, the game board is able to adjust to the screen size on page load.
 - All buttons and links were tested on multiple devices.
    - All buttons are working as expected and linked to the correct locations.
 - All clickable links have been checked for a change in mouse pointer. 
    - All buttons change the mouse pointer as expected on all links
 - All pages have been checked in multiple browser types including Chrome, Firefox, Edge
    - Moon Jumper is running without issues in all browsers tested


### Light House Tests
- See below for Chrome Light House test results on each web page.

#### Index page:
![Light House Index](documentation/images/lighthouse_index.png)

#### Game board page:
![Light House Game board](documentation/images/lighthouse_gameboard.png)


### Code Validation Tests 
- See below the results of the JS, HTML and CSS validators.
#### HTML Validation Index
![HTML Validation Index](documentation/images/validatorhtml_index.png)

#### HTML Validation Game Board
![HTML Validation Game board](documentation/images/validatorhtml_gameboard.png)

#### CSS Validation
![CSS Validation](documentation/images/validatorhtml_css.png)

#### JS Hints Index - No warnings or errors found.
![JS Hints Index](documentation/images/jshint_index.png)

#### JS Hints Moon Jumper - No warnings or errors found.
![JS Hints Moon Jumper](documentation/images/jshint_moonjumper.png)


### Resolved Bugs / Known Issues
- While adding multiple jump objects, the issue arose that no objects would get displayed. This is because at game load the jump objects array is empty and the first check is to see what object is loaded.
The solution was to create a "first jump object", on game start a "small rock" jump object is loaded to the first line of the jump array. Once the first object is loaded the random objects can be created to the jump object array.

- The jump object array would not get cleared after objects passed the game board. This was due to the first line in the array having a different format and no screen position to measure. The solution was to remove the first array line by checking the second array line. when the second object passed a screen position limit the first object is removed from the array.

### Open Bugs / Issues
- No open software bugs or issues are found.

### Future improvements
- Improve animations during game play, such as updating score count.
- Add more complicated variation to game play to manage game difficulty, such as managing what size jump objects come and how often.
- Add animations to the 'Space Man' to display new action when jumping or using jet pack.
- Attention can be taken to improve the Google Lighthouse performance score. 
- Make all game difficulty parameter and image sizes responsive to the users screen for consistent pay experience.

---
## Credits

 ### Media
- [OpenArt](https://openart.ai/home) was used to develop the game play images for the 'space man', and jump objects.
- [Vecteezy](https://www.vecteezy.com/) provided the image used for the game board background.
- [Pngtree](https://pngtree.com/freepng/computer-keyboard-transparent_8957497.html) provided the image of a keyboard layout used for the came controls hints.

### Acknowledgments
- [Iuliia Konovalova](https://github.com/IuliiaKonovalova) Who has been a knowledgeable and encouraging mentor on this project.
- [Kevin Powell](https://www.youtube.com/@KevinPowell) Who provided lessons on using CSS modals.
- [ImKennyYip](https://github.com/ImKennyYip/flappy-bird?tab=readme-ov-file) This project has been based on the lessons learned from ImKennyYip's YouTube tutorial on how to make Flappy Bird.
- [GitHub](https://pages.github.com/) Pages for free hosting of the live site. 
- [w3school](https://www.w3schools.com) Was used as a reference for all html, css, and javascript questions.
- [Text compare](https://www.textcompare.org/) used to compare Moon Jumper to the reference Flappy Bird project.

## ImKennyYip Flappy Bird
Moon Jumper is based on ImKennyYip's version of Flappy Bird.
See a side to side code comparison of the two projects here [Flappy Bird code compare](https://www.textcompare.org/javascript/?id=665c29f374842dd2bc031234).
