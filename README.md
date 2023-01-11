# The_Elements
This is a very, very simple game that I am making in my free time. 
The gameplay is somewhat mild and there is no art, but I'm using the excuse of "it's my first time."
It uses mostly Javascript, since I knew how to use its event listeners to track keystrokes to make an object move.

RULES
- The player controls the blue rectangle
- The red are blocks (or walls)
- The green is a "portal"
- The orange is enemy type 0
- The grey is enemy type 1
- The pink and gold abomination is enemy type 2
- The dark blue is enemy type 3, it can move in a direction
    - Takes one step every second
    - When it hits a wall, it turns around 180 degrees
- The purple is enemy type 4, it can move in a direction
    - Takes one step every half second
    - When it hits a wall, it turns 90 degrees counter-clockwise
- Hitting an enemy results in game over

CONTROLS
- Arrows keys or WASD to move
- Spacebar when the player's top left corner is in the portal to advance to the next level

OTHER COOL FEATURES
- Accessibility - So far everything has good color contrast
                - Levels are designed using percentages, so the game can grow and shrink to a user's screen
                - Yes this means you can change the screen dimensions to move enemies around
- Local storage - The level counter is stored in local storage, so it saves progress
                - Yes this means you can crack open a console and set what level you're on to cheat, but what's the fun in that?