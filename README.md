
This project was built using Asp.Net Core 6 with Web API, Rest API, as a Monolite.

I divided my project into different layers:

1. application layer (which includes controllers, wwwroot for static files, and middlewares)
2.  Service layer for business logic,
3.  Repository for connecting to the database Entity Framework Core 6 as then ORM with a DB-first approach.
4.  DTO for transferring data to the client using Auto Mapper.

The layers are connected using dependency injection, using ORM library of Entity Framework Core 6 (DB first).
A special attention was given on browser caching, using async await and scaling
Error handling was done for all over the server site. and all errors were logged and managed using the Nlog library. 
Configuration is used for some changes and all enters to the site are records using rating middleware
