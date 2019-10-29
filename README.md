# Cloud-Based Client Management System using Laravel and VueJS

An application that allows freelancers and clients to communicate for business and business transactions (invoices). 

### Freelancer
As a freelancer, you will obtain your own dashboard that cradles your clients and services. You will have permission to Create, Read, Update and Delete (C.R.U.D) clients, services, log entries and payment preferences. 

### Client
As a client, you will also obtain your very own dashboard. You will have the ability to monitor the progress of services displayed via the freelancer's log entries and make a transaction for the services inside this application itself via Stripe API. 

This app features a live-communication functionality for all users to utilise.

### What you need to run this code
1. MAMP, XAMP or any local SQL Database solution
2. Composer
3. Node && NPM

### How To Run this Code
1. Clone the repo by running ```git clone https://github.com/eoanodea/IADTY3PPClientMangementSystem.git``` from your command prompt
2. ```cd IADTY3PPClientMangementSystem/```
2. Run ```cp example.env .env``` and fill your Database details into the newely created .env file
3. Run ```composer update && npm i && npm run dev```
4. Start the development server by running ```php artisan serve```


