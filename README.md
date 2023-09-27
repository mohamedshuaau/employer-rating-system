<p align="center"><img src="https://pension.gov.mv/asset/image/enlgish_website_logo.svg" width="400" alt="Laravel Logo"></p>

### This Project was build with laravel and inertia.js (react)

## Prerequisite

| Dependency | Version    |
|------------|------------|
| MySql      | `>=8.x`    |
| Node       | `>=18.x.x` |
| NPM        | `>=9.x.x`  |


------

## Installation:

- Clone the repository with `git clone {repository}`.
- Navigate to the directory and run `npm install`.
- Update the .env file with the db credentials.
- create a database (name it as you named your db in env).
- Run `prisma migrate reset`. This command will run the migrations (since the migrations were not ignored on git) and run seeders. Alternatively, you can run `prisma migrate dev` and run `prisma db seed`.
- Once everything is setup, run `npm start`
- Navigate to /client directory and run `npm install`.
- Update your .env file.
- Run `npm start`. (note: CORS has already been added, so you shouldn't face any issues. It will however probably prompt to change the port since the default set port for nest is 3000 and 3000 is default for react apps)

Perfect! Unfortunately, there is no register required. No auth implemented 😂

## Answer to Question 9:
I would say, again, log payments data. Send reminder notifications before due date. Log ratings data. Add functionality to make payments on the portal. And finally, automated payment creation instead of the manual process.
This was built with NestJS, Prisma, React, Tailwind and some other tiny libraries. Apologies in advance for using momentJS for Dates. It's bulky but it gets the job done.
There is a lot I would have improved. Like the pagination. Currently, it's not reusable and there are exactly 2 places that uses it. I have also moved the React app within this project. Why? One repo is better than two I suppose 😂
I had a lot of fun building with Nest. To be honest, this is the very first application I've built with nest. And in my defence, I could have had 2 modules instead of one but from my POV, isn't a module supposed to be larger? Suppose a User Module
would have made sense but since employers and employer payments are practically the same thing (employer payments is related to employers), I decided it would be better to have a single module.
Oh, and excuse the seeder 😂


If you have any questions, please contact me at the earliest. Good Day!
