## Game.tsx

Sould run after all asset and dom complets loading
get the canvas and get 2D canvas
call the render methos of Game and animate() with requestanimationfream(animate)

## Game

Contains the main logic of the codebase and holds all other objects

- take canvas as arg in constructure

- will have render method that renders game multiple times in 1s

## Player

Responsibel for player movement and it will have only instance in the game

- will have game instance refrence

## Projectile

Create a object pool to reuse the projectile instance and increse the performance by avoding rapid creation and deletion of objects and GC
Handel the leger/Bullet that the player will be shooting

## Enemy

Handel enemy wave and their properties
