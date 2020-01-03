var documentation = `
#######################################
#-----------------------Documentation---------------------#
#######################################


How To Play
-----------------------------------------------------------
Select The Number of Players by clicking the "toggle" 
buttons and enter their names. A player can either be 
played by a human or the computer. Once you clicked the 
"start" button the game begins. 

The current player is indicated to the top left and has to 
roll the die. If the current player is played by the
computer, the die will be rolled automatically. Then, the
token corresponding to the current player has to be moved
as many fields as the number shown on the die. Now it is 
time to select the category with the same number as the 
field the current player is standing on and get a new 
question. Select one of the answers and click the "check
Answer" button. If it is the computers turn, an answer will
be selected automatically. The button will turn red or
green depending on whether or not the answer was correct.

The goal of the game is to answer one question of each 
category correctly. Your current score is displayed on the
top right of the screen. If you want to go back and see 
previous questions you can take a look at the question
history to the right.


Technologies Used
-----------------------------------------------------------
# Canvas to draw the board

# Drag and Drop to move game pieces

# Web Storage to store questions in local storage and 
answers (otherwise fetching questions would take 1-2
seconds every time)

# WebSockets to play online
`;