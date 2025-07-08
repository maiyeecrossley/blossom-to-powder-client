# Blossom to Powder: Wandering Japan's Four Seasons

<img src="https://res.cloudinary.com/ddwlpgsjq/image/upload/v1751971764/Screenshot_2025-07-08_at_11.48.12_x3vkpr.png" width="500" alt="image of Blossom to Powder logo"> 


### [Blossom to Powder: Wandering Japan's Four Seasons](https://blossom-to-powder.netlify.app/)

## Description

Blossom to Powder is a full-stack web application designed as a travel planner for trips around Japan. The idea was inspired by my trip there with my husband, and my then 5-6 month old baby.

The planner allows the users to browse locations across Japan by season, add places of interest to a personalised itinerary, and explore the country's natural beauty throughout the year.
When the user signs up for an account, they can log in to manage their trips by creating and editing their itineraries, and keep track of their planned adventures.

The idea came from wanting a simple way to plan trips around Japan during seasonal highlights, eg cherry blossoms in Spring, wisteria tunnels in Summer, maple leaves in Autumn, and snow festivals in Winter.

The app focuses on building a Django REST API for the back-end, secured with DRF's authentication system, designed to handle multiple reationships between users, locations and itineraries with CRUD functionality. This is paired with React's front-end that interacts with the protected endpoints, allowing logged in users to browse seasonal locations, and manage their personalised travel plans.

## Time Frame

This solo project took 10 days from initial planning to deployment. I used tools like Trello for managing user stories, and Excalidraw for designing wireframes.

## Tech Stack

- Python
- Django REST Framework
- PostgreSQL
- React
- JavaScript
- HTML
- CSS
- Git
- GitHub
- Postman (for testing)
- Heroku (for back-end hosting)
- Netlify (for front-end hosting)

## Planning

During the planning stage, I used [Trello](https://trello.com/b/05IlXUmF/blossom-to-powder) to help me break down the user stories, and prioritise features to have an MVP ready.

I created an [entity relationship diagram](https://dbdiagram.io/d/Blossom-to-Powder-67bed9ad263d6cf9a081a5df) to help map out the different data models, and to visualise how users, locations, and itineraries would relate to each other in the database. This helped clarify the model relationships, making it easier to design the PostgreSQL schema and structure the Django serializers and API routes.

I created the wireframes in [Excalidraw](https://res.cloudinary.com/ddwlpgsjq/image/upload/v1751971826/blossom-to-powder-wireframe_eredv3.png) to map out the main pages and user flows, helping me visualise how users would browse by season, view location details, and build their itineraries.

## Build Process

I began by setting up the back-end using Django REST Framework, splitting the logic into five apps:
- users
- seasons
- search_tags
- locations
- itineraries

I used a custom model for the users so I had the ability to extend it at a later time, and then used Django's migration system to create all the tables in PostgreSQL.

In the seasons model, I defined an enum of the four seasons (with a start/end months) and helper methods to check whether that given date fell into that range.

The search_tags app was a simple tag model for keyword filtering.

The locations model carried fields for name, description, latitude/longitude, plus many-to-many fields to both Seasons and SearchTags.

The itineraries app held a name, date range, and an owner ForeignKey to User, whilst the through-table ItineraryLocation let me associate each location with a visit date, if desired.

Once the models were in place, 

## Challenges

#### Challenge #1

Designing the database to support the multiple relationships between the users, itineraries, locations, seasons, and search tags was quite complex. I needed to ensure the itineraries could link to multiple locations (each with their own optional visit dates), and locations could belong to multiple seasons and tags. This required careful planning with the ERD and several tweaks to the Django models to get this correct.


#### Challenge #2

Using Django REST Framework's authentication system so that only logged in users could create or edit itineraries meant writing custom permissions, and thoroughly testing the protected endpoints. It was a learning curve to ensure that every route had the correct restricted access based on the authenticated user, such as admin, or the user.

#### Challenge #3

Working within the time limit meant that I had to make quick decisions with UI libraries. I chose Bootstrap for its built-in modals, which helped speed up adding the pop-ups for the forms and information, but it also took longer than expected to customise. This restricted my styling choices within CSS modules compared to using MUI, or writing my own styles.

## Wins
- Happy with the way how the final app looks, albeit some edits required on the margins of the modals.
- I liked how the dynamic filtering on the frontend turned out, letting users browse locations by season in a really intuitive way.
- I managed to protect routes and handle authentication state in React, so only logged-in users could create, edit, or delete their itineraries, which was a key part of the app.
- This project also helped me get more confident using React hooks to handle data fetching, forms, and keeping everything in sync across components.

## Key Learnings

- I learned how to model more complex relationships in Django, like many-to-many and through-tables, which was essential for linking itineraries with multiple locations and optional visit dates.
- Implementing DRF’s authentication and permissions gave me a better understanding of how to secure an API and restrict data access based on the logged-in user.
- I got more comfortable writing serializers to handle nested data, so related models like locations and seasons could be returned cleanly in the API.
- Working with React hooks really helped me see how to keep different parts of the UI in sync, especially when handling form inputs, API data, and authentication state.
- Planning the data structure upfront using an ERD made the whole build process smoother, and showed me how valuable it is to have the relationships mapped out before writing code.
- The importance of balancing speed with flexibility. By choosing Bootstrap modals, although has saved me time in the short run, it also taught me to weigh up how much custom styling I might need later on.

## Bugs
At the moment, when you navigate to "My Trips", then "+Add New Trip", the Login dialog appears in front of the creating itinerary form. This causes the application to freeze unless you have an account and are able to log in.
I will be addressing this bug in due course.


## Future Improvements
- Integrating MapBox or Google Maps - this was one of the initial ideas for this application. It's to help users plan how to get from A to B, including local transport options between locations on their itinerary.
- Calendar view so users can see when they have planned to visit each location within their itinerary, making trip planning clearer.
- Improve some of the styles, paying more attention to margins
- User profiles to allow users to view and update their account details, and maybe see a history of their past itineraries.
- More filtering options to better align with the search tags.

#### Asset Attributions
- [Japan in Spring - Pinterest](https://i.pinimg.com/736x/35/d9/13/35d9139d6ae9e50a78c2338c0069d1bb.jpg)
- [Japan in Summer - Pinterest](https://i.pinimg.com/736x/40/f3/8d/40f38dadb3e7054c99de7b0debf11aae.jpg)
- [Japan in Autumn - Pinterest](https://i.pinimg.com/736x/9f/b6/a8/9fb6a8b560ce854ac37438373f0e78d1.jpg)
- [Japan in Winter - Pinterest](https://i.pinimg.com/736x/73/62/48/736248125d0ceeedef7a2e492e08645b.jpg)
- [Placeholder image - Pinterest](https://i.pinimg.com/736x/85/15/4e/85154e6d638b066d9b8a178c410d90c0.jpg)


#### Tools

- Trello - for user story planning
- Excalidraw - to draw out wire frames
- [Google Fonts - Merriweather](https://fonts.google.com/specimen/Merriweather)
- [Google Fonts - Sriracha](https://fonts.google.com/specimen/Sriracha)
