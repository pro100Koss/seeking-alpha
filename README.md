# This is a short description of test task

* After opening the application, you will be able to set state for each cell manually. After that you need to click "Start game". 
* Also, you can load a few presets: 4x4, 5x5 and 6x6.
* To restart the game just refresh the page.

#Technical details
* As I have not too much time, I decided not to use the Redux store. Yes, I guess it's not a good idea, but it's just because i have not too much time for that. Ideally Redux store should be there. Hopefully we can discuss it on out meeting.
* `Game` component was developed with using react class component. I did it as an example to show you that I know both. the rest of components was writen with using functional components and in some cases I was used hooks.
* `GameMapService` is not the ideal place where to put some logic, but it's much better the having it inside the components. I would like to have a Redux + Middlewares for it. For example `Saga`.
* Also, I decided to use jest for the tests. I didn't cover all functionality with a test, but show some examples. 
