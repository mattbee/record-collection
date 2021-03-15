# 1. Use Rails for the API backend code

## Status
Accepted

## Context
The record collection API needs a backend technology. The options available are Rails or Django (with the [Django Rest Framework](https://www.django-rest-framework.org/)) both of which provide a good base for the API.

## Decision
Rails using the API flag and replacing the view layer with JSON views for the API is the better choice, as Ruby is a more familiar technology and the language that Logikcull recommend for this project.

## Consequences
Authentication will be slightly more difficult than using Django, but not a huge problem. It could be skipped in the first iteration or just use an API key method. As it's a personal app, and could be running locally, the auth question can be answered later.
