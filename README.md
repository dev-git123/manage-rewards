<h1 align="center">REST APIs that manage rewards that built with expressJS</h1>

## `Overview of Project`
### This project will allow user to 
   >> #### i) generate and fetch rewards
   >> #### ii) redeem rewards

--------------------
## `API`


Method | Attempt |Path Parameter| Query string parameters| sample url | Description
--- |--- | --- | --- | --- | --- 
Get  |/users/:id/rewards | id `(userId)`| at `(requestedDate in ISO String format)` | /users/1/rewards?at=2022-04-30T14:48:00.000Z|1)create user with requested userId   2)generate and fetch rewards for the whole week of the user
Patch  |/users/:id/rewards/:availableAt/redeem | id`(userId)`,   availableAt`(requestedDate in ISO String format)`|   | /users/1/rewards/2022-04-27T10:30:00.000Z/redeem|1) update the redeemedAt column of the requested rewards  2) return msg that includes data or error msg


``** Please take note that Weekly Rewards will be considered from Sunday through to Saturday whenever the user requested for any day of the week **``

--------------------


## Tech Specs 
### 1) `express`
### 2) `jest`
### 3) ` in-memory data structure`

-----------------------


## How to run project on dev environment

#### 1) `npm install`

#### 2) `npm start`

-----------------------
## How to run test

#### 1) `npm install`

#### 2) `npm test`
