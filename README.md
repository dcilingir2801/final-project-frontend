## FINAL PROJECT | Airbnb Optimization Tools

![Game Logo](src/assets/airbnb_logo_navbar.png)


This project is a React-based web application that imitades the Airbnb website with the addition of a new Optimization Tool. It utilizes data fetched from a mock backend to display information about mock properties and listings, allowing the user to visually comprehend the differences between their own properties and similiar listings in their area, encouraging to optimize their properties accordingly. This helps getting better price/value offerings for both hosts and travellers.


## Main Functionalities (MVP)

Overall, the application aims to provide property owners with insights into their property's performance and potential areas for improvement, while also offering a user-friendly interface for managing property listings.

- **Landing Page**: Serves as the initial page for users visiting the application. Provides information about the application's features and updates. Allows users to sign up or sign in to access the full functionality of the app.
- **User Authentication**: Allows users to sign up for new accounts or sign in to existing ones. Implements authentication flows using JWT tokens.
- **Properties Overview**: Displays an overview of listed properties. Allows users to view details of each property, including description, price, and location. Provides options to optimize each property, potentially suggesting improvements based on data analysis.
- **Dashboard**: Displays property details, including title and image. Allows users to change the current listing. Provides visualization charts such as Price Area Chart and Amenities Pie Chart. Offers insights on potential improvements for the property.
- **404 Error Handling**: Renders a custom error page with a friendly message when a requested route is not found. Provides helpful links to guide users to relevant sections of the application. 

<br>

## Backlog Functionalities

- Extend Dashboard with additional charts and dynamic values.

## Technologies Used

<h3>Frontend</h3>
The frontend of this project is built using React.js, a popular JavaScript library for building user interfaces. Key components and pages include:

<u><h4>Components</h4></u>
- **AmenitiesPieChart**: This component displays a donut chart representing the distribution of amenities among similar listings in the user's area. It allows users to select amenities to consider investing in based on the data.
- **OccupancyAreaChart**: This component visualizes occupancy rates over time, allowing users to compare their rates with other hosts and providing insights into property performance.
- **AuthTabs**: This component is responsible for rendering either a sign-up form or a sign-in form based on the current state. It is used for user authentication purposes.
- **Footer**: The footer component contains various sections such as support, hosting, and information about Airbnb. It provides links to different sections of the Airbnb website.
- **IsAnon**: This component is a route guard that ensures that the children components are only rendered if the user is not logged in. If the user is logged in, it redirects them to the home page.
- **IsPrivate**: Similar to IsAnon, this component acts as a route guard but ensures that the children components are only rendered if the user is logged in. If the user is not logged in, it redirects them to the login page.
- **Navbar**: The Navbar component represents the navigation bar of the application. It includes links to various sections of the app, user profile options, and dropdown menus for additional functionalities.
- **PriceAreaChart**: This component displays an area chart comparing the user's earnings with other hosts' earnings over a period of time. It provides insights into how the user's earnings compare with others in the area.
- **SignIn**: This component renders a sign-in form allowing users to log in to their accounts. It also includes options to sign in with social media accounts such as Facebook, Google, and Apple.
- **SignUp**: The SignUp component renders a sign-up form allowing users to create new accounts. Similar to the sign-in form, it also provides options to sign up using social media accounts.

<u><h4>Auth Context</h4></u>
The `AuthContext` in this React application manages the authentication state of the user. It provides information about whether the user is logged in, loading authentication data, and the current user.

- **AuthProviderWrapper**: This component is a wrapper around the context provider. It initializes the authentication state, checks if the user is logged in using a stored token, and fetches user data if available.

- **AuthContext**: 
The AuthContext object created using `React.createContext()` serves as the context for the authentication state. It provides the following values to its consumers:
- `isLoggedIn`: A boolean value indicating whether the user is currently logged in.
- `isLoading`: A boolean value indicating whether authentication data is being loaded.
- `user`: An object representing the current user, containing user data such as username, email, etc.
- `storeToken`: A function to store the authentication token in the browser's local storage.
- `authenticateUser`: A function to authenticate the user by verifying the stored token and fetching user data.
- `logOutUser`: A function to log out the user by removing the stored token and reloading the page.


<u><h4>Pages</h4></u>
- **Dashboard**: Renders the dashboard page, displaying property details and visualization charts.
- **LandingPage**. Represents the landing page of the application, providing information about features and options to sign up or sign in.
- **NotFound**: Renders a 404 error page with an error message and helpful links when a requested route is not found.
- **PropertiesOverview**: Displays an overview of listed properties, allowing users to view details or optimize each property.

<h3>Backend</h3>
The github for the Backend can be found <a href="https://github.com/dcilingir2801/final-project-backend">here</a>.

The backend structure consists of configuration files, a database directory, error handling, middleware, models for listings, properties, and users, routes, environment variables, the main application file (app.js), and server setup (server.js). The data is stored in MongoDB Compass.

<h4>Dependencies<h4>
Production Dependencies: <br><br>

- @headlessui/react: ^1.7.18
- @headlessui/tailwindcss: ^0.2.0
- @remixicon/react: ^4.2.0
- @tremor/react: ^3.14.1
- axios: ^1.6.7
- leaflet: ^1.9.4
- react-leaflet: ^4.2.1
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.0 <br><br>

Development Dependencies: <br>

- @tailwindcss/forms: ^0.5.7
- @types/react: ^18.2.56
- @types/react-dom: ^18.2.19
- @vitejs/plugin-react: ^4.2.1
- autoprefixer: ^10.4.17
- eslint: ^8.56.0
- eslint-plugin-react: ^7.33.2
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.5
- postcss: ^8.4.35
- tailwindcss: ^3.4.1
- vite: ^5.1.4

## Project Structure

- node_modules
- public
  - vite.svg
- src
  - assets
  - components
    - AmenitiesPieChart.jsx
    - AmenitiesPieChart.module.css
    - AuthTabs.jsx 
    - CheckInChart.jsx
    - CheckInChart.module.css
    - Footer.jsx
    - Footer.module.css
    - IsAnon.jsx
    - IsPrivate.jsx
    - Navbar.jsx
    - Navbar.module.css
    - OccupancyAreaChart.jsx
    - OccupancyAreaChart.module.css
    - PriceAreaChart.jsx
    - PriceAreaChart.module.css
    - SignIn.jsx
    - SignIn.module.css
    - SignUp.jsx
    - SignUp.module.css
  - context
    - auth.context.jsx
  - pages
    - Dashboard.jsx
    - Dashboard.module.css
    - LandingPage.jsx
    - LandingPage.module.css
    - NotFound.jsx
    - NotFound.module.css
    - PropertiesOverview.jsx
    - PropertiesOverview.module.css
  - App.css
  - App.jsx
  - index.css
  - main.jsx
- eslintrc.cjs
- .gitignore
- index.html
- package-lock.json
- package.json
- postcss.config.js
- README.md
- tailwind.config.js
- vite.config.js


## Extra Links

<h3>Presentation Slides</h3>
<a href="https://docs.google.com/presentation/d/1Ha3CSFtR3rAzwQI0zqWrDqaEU3A6yFDU2WUH_lkwdyQ/edit?usp=sharing">Click here</a>

<h3>Deploy</h3>
*not deployed yet*

## Credits

Images and original website design is Airbnb property. <br>


