# Development

### Link to Deployed Website
If you used the stencil code, this is `https://tiredpig002.github.io/react/`

### Goal and Value of the Application
The website contains some often used DnD treasures and items. The filtering and 
sorting functionality allows DMs and players to quickly search through the items
and reference the ones that they need to use. They can add to their references 
so they can quickly access the items they have in their inventory, as well as
the aggregate value of those items.

### Usability Principles Considered
The filters and sorting algorithms should be easy to use and learnable.
I made sure the filters were all checkboxes and organized in a way where the 
user can easily identify the categories it is sorting by and differentiate 
between the sorting and the filtering. 

I considered making the filtering part floating and follow the scroll of the 
website, but I ended up struggling with the react components a little too much.

### Organization of Components
There are mainly 3 components in this project:
 > A GalleryItem component, which represents each item card displayed on the 
    screen.
 > A CheckBox component for the filtering capabilities
 > A Radio component for the sorting capabilities
The CheckBox and Radio components the user will interact with to decide sorting
and filtering functionality, allowing the website to properly show the 
corresponding GalleryItems. 

The GalleryItems mostly show the properties, description, and an image of the 
item, as well as a button to add it to the user's references.

### How Data is Passed Down Through Components
### How the User Triggers State Changes
For simply displaying, data is passed into Radio and CheckBoxes in the App class
by inputting proper parameters as props in the return statement. For example, 4
the Radio that allows a user to sort by name has a name, form it belongs to, and 
a sortBy function which allows it to change the sortBy state variable.

The GalleryItem pulls data in from "data.json" in "src/assets". Each item in
data.json is called on for a GalleryItem, which then takes the dictionary and
displays the corresponding keys and values within a div, and also finds the 
image to be displayed as well. 

The App class contains the state variables reference list, filters, and sorting 
type.

It contains functions that modify the filters list and sorting type, and passes
those functions to the Radio and CheckBox components so that upon user 
interaction, those functions will be activated and the components will pass in
the information (i.e. Radio will change the sorting type from "Name" to "Cost", 
Checkbox will add "consumable" and remove "attunement" from the filters list).

The App also contains a function which returns the "add to references" button 
displayed on each GalleryItem, which upon interaction, triggers a function that
takes in a string which it will add to the list of references within App. That 
button is then passed to each GalleryItem, which will input its name. 

Then, the program will return a new gallery list that is sorted and filtered
correctly to the states and display that list. 



