## What is a MERN Stack ?
- Full stack technology refers to the entire depth of a computer system application, and full stack developers straddle two separate web development domains: the frontend and the backend. Front end developers work to optimize the visible parts of an application for web browsers and mobile devices.
- MERN stack stands for ReactJS, NodeJs, ExpressJs, MongoDb
- Express and node make up the middle (application) tier. ExpressJs is a server-side web framework, and Node.js is the popular and powerful Javascript server platform. MERN is the ideal approach to working with Javascript and JSON, all the way through.


## Course Outcomes
- How the web works?
- HTML and CSS
- Javascript
- ReactJs
- Redux / Redux thunk
- Axios
- NodeJs / ExpressJs / Restfull API
- JSON web tokens
- MongooseJs / MongoDb
- Git - Version control in Github
- How to deploy for free ? Netlify, Heroku and MongoDb Atlas


## How the web works ?
Client-Server Model

client -- Request --> server
client <-- Response -- server


### HTTP
- HyperText Transfer Protocol
- Messages are formatted based on this protocol.
- Ex : https://www.facebook.com
- It is an application layer using which you can share hypermedia such as HTML.
- It is designed to establish a communication between client and the server.


### DOM
- Document Object Model
- Browser constructs DOM from html document.
- It contains objects, texts, images, videos, etc.
- Building blocks of the webpage.


## File Structure in a React application
### Action:
- Purpose: Contains action creators, which are functions that create actions.
- Usage: Actions describe events that can change state or trigger side effects in the application. They are dispatched to the reducers to update the state.


### API:
- Purpose: Houses functions responsible for making API requests to the backend server.
- Usage: Handles communication with the backend, including fetching data, posting updates, and handling responses. These functions abstract away the details of HTTP requests.


### Reducers:
- Purpose: Defines how the application's state changes in response to actions.
- Usage: Reducers are pure functions that take the current state and an action as arguments and return a new state. They manage different parts of the application state by specifying how actions transform the state.


### Components:
- Purpose: Contains reusable UI components used throughout the application.
- Usage: These components are often small, self-contained units responsible for rendering a specific part of the UI. They are composed together to build the entire user interface.


### Pages:
- Purpose: Represents top-level views or screens of the application.
- Usage: Each page typically corresponds to a different route or URL in the application. Pages are composed of components and are responsible for structuring the layout and behavior of the application's screens.



## Difference between Link, Navlink and Navigate
- Link: A basic component for navigation that creates links without reloading the page.
- NavLink: An enhanced version of Link that allows you to apply an active class to the link when it matches the current route, useful for highlighting active links.
- navigate: A function for programmatically navigating to different routes, useful for navigation based on events or actions beyond simple link clicks.
