# Cheap Eats

## Core Technical Areas
- Visuals (HTML, CSS, Javascript, Polymer Custom Elements)
- API Logic (AJAX, Google Maps, Yelp, Parsing Information)
- Firebase Logic (Account Management, Private/Public Nodes, Profile Feed)

### Visuals
* One HTML Page
  * Login/Register Prompt
  * Main Interface
    * Input Search via API
      * Budget ($, $$, $$$), ZIP, Optional Food Genre
    * View Personal Results
    * Public Favorites Feed
    * Logout
    
### API Logic
* Call to Yelp with three parameters
  * Budget ($, $$, $$$), ZIP, Optional Food Genre
* Parse Response

### Firebase Logic
* User Registration
  * Simple Facebook auth or similar
* Login/logout state
* Store personal information passed from API parsing
  * Location
  * Picture
  * Budget
  * Food Genre
  * Hours Open
* Store Public Favorites
  * Location
  * Picture
  * Budget
  * Food Genre
  * Hours Open
