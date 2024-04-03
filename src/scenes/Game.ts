import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    wordList: string[] = ['apple', 'banana', 'cherry', 'date', 'elderberry']; // Add your word list here
    currentWord: string;
    guessGrid: Phaser.GameObjects.Text[][];

    constructor ()
    {
        super('Game');
    }

    create ()
    {
	    this.camera = this.cameras.main;
	    this.camera.setBackgroundColor(0x00ff00);

	    this.background = this.add.image(512, 384, 'background');
	    this.background.setAlpha(0.5);

	    // Choose a random word from the word list
	    this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];

	    // Create a 5x5 grid for the letters
	    this.guessGrid = [];
	    for (let i = 0; i < 5; i++) {
		    this.guessGrid[i] = [];
		    for (let j = 0; j < 5; j++) {
			    this.guessGrid[i][j] = this.add.text(20 + j * 40, 20 + i * 40, '_', { // Adjust the position and initial text
				    fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
				    stroke: '#000000', strokeThickness: 8,
				    align: 'center'
			    });
		    }
	    }
    }

    // Add a method to handle user input
    handleInput(letter: string, row: number, col: number) {
        // Update the guess grid with the input letter
        this.guessGrid[row][col].setText(letter);

        // Check if the guess is correct
        if (this.currentWord[row] === letter) {
            this.guessGrid[row][col].setColor('#00ff00'); // Green for correct letter
        } else if (this.currentWord.includes(letter)) {
            this.guessGrid[row][col].setColor('#ffff00'); // Yellow for correct letter in wrong position
        } else {
            this.guessGrid[row][col].setColor('#ff0000'); // Red for incorrect letter
        }
    }
}

