# DEV TINDER API's

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-Patch  /profile/edit
-Patch  /profile/password

ConnectionRequest router
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

Status: Ignored, Intrested, Accepted, Rejected

Userrouter
- GET /connnections
-GET /request/recieved
-GET /feed => gets you the profile of other users on platform

we have grouped our routers 