# Rates provider

A simple API a kind of self test

## Before running

    Please note it's use Redis

## Running

    $npm install
    or
    $npm server

## Use

    GET http://localhost:5000/api/v1/rates/<ISO date>?symbols=<comma separated>

    example:
- get the last rates (All)
   http://localhost:5000/api/v1/rates
- get the last rates USD and EUR
  http://localhost:5000/api/v1/rates?symbols=usd
- get USD rates at 2121-04-04
  http://localhost:5000/api/v1/rates/2021-04-05?symbols=usd
  
