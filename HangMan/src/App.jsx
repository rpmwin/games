import { useState } from 'react';
import one from './assets/hangman_images/1.jpeg';
import two from './assets/hangman_images/2.jpeg';
import three from './assets/hangman_images/3.jpeg';
import four from './assets/hangman_images/4.jpeg';
import five from './assets/hangman_images/5.jpeg';
import six from './assets/hangman_images/6.jpeg';
import seven from './assets/hangman_images/7.jpeg';
import eight from './assets/hangman_images/8.jpeg';

import './App.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [counter, setCounter] = useState(7);
  const [gameWon, setGameWon] = useState(false);
  const [guessedChars, setGuessedChars] = useState([]);
  const [gameOver, setGameOver] = useState(false); // Added gameOver state

  const selectedChar = (char) => {
    if (guessedChars.includes(char) || gameOver) return; // Don't process if the character is already guessed or game is over

    const newGuessedChars = [...guessedChars, char];
    setGuessedChars(newGuessedChars);

    if (!answer.includes(char)) {
      setCounter(counter - 1); // Decrease counter if the guessed character is not in the answer
      if (counter - 1 === 0) {
        setGameOver(true); // Set game over if counter becomes 0
      }
    }

    const won = [...new Set(answer.split(''))].every((char) =>
      newGuessedChars.includes(char),
    );
    if (won) {
      setGameWon(true);
      setGameOver(true); // Set game over if the player wins
    }
  };

  const createVariable = () => {
    const randomCategoryIndex = Math.floor(Math.random() * data.length);
    const category = data[randomCategoryIndex];
    const items = category.options;
    const randomItemIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomItemIndex];
    setCategoryName(category.name);
    setAnswer(randomItem);
    setCounter(7); // Reset the counter
    setGuessedChars([]);
    setGameWon(false);
    setGameOver(false); // Reset game over status
  };

  const data = [
    {
      name: 'VERB',
      options: ['TEST', 'PLAY', 'EAT', 'DRINK', 'SLEEP', 'WALK', 'RUN', 'SING'],
    },
    {
      name: 'FRUIT',
      options: [
        'APPLE',
        'BANANA',
        'ORANGE',
        'PINEAPPLE',
        'MANGO',
        'PAPAYA',
        'STRAWBERRY',
        'POMEGRANATE',
      ],
    },
    {
      name: 'VEGETABLE',
      options: [
        'CARROT',
        'CUCUMBER',
        'POTATO',
        'BEET',
        'CABBAGE',
        'CUCUMBER',
        'POTATO',
        'BEET',
      ],
    },
    {
      name: 'ANIMAL',
      options: [
        'DOG',
        'CAT',
        'LION',
        'TIGER',
        'LEOPARD',
        'HIPPOPOTAMUS',
        'BIRD',
        'HORSE',
      ],
    },
    {
      name: 'FOOD',
      options: ['PIZZA', 'BURGER', 'FRIES', 'SANDWICH', 'TACO'],
    },
    {
      name: 'SPORTS',
      options: [
        'FOOTBALL',
        'CRICKET',
        'BASKETBALL',
        'VOLLEYBALL',
        'TENNIS',
        'SWIMMING',
        'BOXING',
      ],
    },
    {
      name: 'COUNTRY',
      options: [
        'INDIA',
        'USA',
        'CHINA',
        'JAPAN',
        'RUSSIA',
        'FRANCE',
        'GERMANY',
        'SPAIN',
      ],
    },
    {
      name: 'COMPANY',
      options: [
        'GOOGLE',
        'FACEBOOK',
        'AMAZON',
        'MICROSOFT',
        'APPLE',
        'FACEBOOK',
      ],
    },
    {
      name: 'STATES',
      options: [
        'KARNATAKA',
        'TAMILNADU',
        'KERALA',
        'ANDHRAPRADESH',
        'TELANGANA',
        'RAJASTHAN',
        'DELHI',
        'UTTARAKHAND',
      ],
    },
    {
      name: 'COUNTRIES',
      options: [
        'CANADA',
        'BRAZIL',
        'AUSTRALIA',
        'EGYPT',
        'GERMANY',
        'JAPAN',
        'INDONESIA',
        'NIGERIA',
      ],
    },
    {
      name: 'FRUITS',
      options: [
        'WATERMELON',
        'GRAPES',
        'KIWI',
        'CHERRY',
        'PEACH',
        'APRICOT',
        'FIG',
        'PLUM',
      ],
    },
    {
      name: 'VEGETABLES',
      options: [
        'SPINACH',
        'BROCCOLI',
        'RADISH',
        'ZUCCHINI',
        'ARTICHOKE',
        'ASPARAGUS',
        'BRUSSELS SPROUTS',
        'KALE',
      ],
    },
    {
      name: 'SPORTS',
      options: [
        'GOLF',
        'RUGBY',
        'TABLE TENNIS',
        'ICE HOCKEY',
        'FENCING',
        'BADMINTON',
        'GYMNASTICS',
        'ARCHERY',
      ],
    },
    {
      name: 'COLORS',
      options: [
        'CYAN',
        'MAGENTA',
        'YELLOW',
        'BLACK',
        'WHITE',
        'ORANGE',
        'PURPLE',
        'GRAY',
      ],
    },
    {
      name: 'FLOWERS',
      options: [
        'DAFFODIL',
        'HYACINTH',
        'LAVENDER',
        'MARIGOLD',
        'PANSY',
        'TULIP',
        'SUNFLOWER',
        'IRIS',
      ],
    },
    {
      name: 'ANIMALS',
      options: [
        'GIRAFFE',
        'ELEPHANT',
        'PENGUIN',
        'KANGAROO',
        'RHINOCEROS',
        'PORCUPINE',
        'OCTOPUS',
        'ALLIGATOR',
      ],
    },
    {
      name: 'CARS',
      options: [
        'FERRARI',
        'HONDA',
        'TOYOTA',
        'VOLKSWAGEN',
        'MERCEDES-BENZ',
        'AUDI',
      ],
    },
    {
      name: 'CITIES',
      options: [
        'NEW YORK',
        'PARIS',
        'LONDON',
        'TOKYO',
        'ROME',
        'SYDNEY',
        'DUBAI',
        'MUMBAI',
      ],
    },
    {
      name: 'VEHICLES',
      options: [
        'CAR',
        'BIKE',
        'PLANE',
        'TRAIN',
        'SHIP',
        'TRUCK',
        'HELICOPTER',
        'SUBMARINE',
      ],
    },
    {
      name: 'FAMOUS LANDMARKS',
      options: [
        'EIFFEL TOWER',
        'STATUE OF LIBERTY',
        'BIG BEN',
        'GREAT WALL OF CHINA',
        'MACHU PICCHU',
        'TAJ MAHAL',
        'SYDNEY OPERA HOUSE',
        'LEANING TOWER OF PISA',
      ],
    },
    {
      name: 'BOOKS',
      options: [
        'TO KILL A MOCKINGBIRD',
        'PRIDE AND PREJUDICE',
        'THE GREAT GATSBY',
        'HARRY POTTER',
        'THE LORD OF THE RINGS',
        'WAR AND PEACE',
        '1984',
        'THE CATCHER IN THE RYE',
      ],
    },
    {
      name: 'SUPERHEROES',
      options: [
        'SUPERMAN',
        'BATMAN',
        'SPIDER-MAN',
        'WONDER WOMAN',
        'IRON MAN',
        'CAPTAIN AMERICA',
        'THOR',
        'BLACK WIDOW',
      ],
    },
  ];

  const attemptImages = [eight, seven, six, five, four, three, two, one];

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white min-w-sceen ">
      <div className="text-5xl font-bold italic border-b text-lime-600 mb-8">
        HANGMAN
      </div>

      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 flex flex-col sm:flex-row">
        <div className="w-full sm:w-3/5 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold underline mb-4">{categoryName}</h1>

          <div className="flex flex-wrap justify-center">
            {answer.split('').map((char, index) => (
              <span key={index} className="underline p-1 text-4xl">
                {char === ' ' ? ' ' : guessedChars.includes(char) ? char : '_'}
              </span>
            ))}
          </div>

          <div className="keyboard flex flex-col gap-2 w-min items-center p-5 justify-center text-xl text-black mt-4 scale-75">
            {/* Keyboard buttons */}
            <div className="flex gap-2">
              {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
                (char) => (
                  <button
                    key={char}
                    onClick={() => selectedChar(char)}
                    disabled={gameOver}
                  >
                    <p
                      className="p-2 bg-slate-300 rounded w-9 text-center hover:bg-slate-800 hover:text-white duration-300"
                      style={{
                        backgroundColor: guessedChars.includes(char)
                          ? 'green'
                          : '',
                        color: guessedChars.includes(char) ? 'white' : '',
                      }}
                    >
                      {char}
                    </p>
                  </button>
                ),
              )}
            </div>
            <div className="flex gap-2">
              {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((char) => (
                <button
                  key={char}
                  onClick={() => selectedChar(char)}
                  disabled={gameOver}
                >
                  <p
                    className="p-2 bg-slate-300 rounded w-9 text-center hover:bg-slate-800 hover:text-white duration-300"
                    style={{
                      backgroundColor: guessedChars.includes(char)
                        ? 'green'
                        : '',
                      color: guessedChars.includes(char) ? 'white' : '',
                    }}
                  >
                    {char}
                  </p>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((char) => (
                <button
                  key={char}
                  onClick={() => selectedChar(char)}
                  disabled={gameOver}
                >
                  <p
                    className="p-2 bg-slate-300 rounded w-9 text-center hover:bg-slate-800 hover:text-white duration-300"
                    style={{
                      backgroundColor: guessedChars.includes(char)
                        ? 'green'
                        : '',
                      color: guessedChars.includes(char) ? 'white' : '',
                    }}
                  >
                    {char}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {gameOver && !gameWon && (
            <p className="text-2xl text-red-500 text-center">
              You Lost! The correct answer was{' '}
              <span className="text-4xl"> {answer}</span>.
            </p>
          )}
          {gameWon && <p className="text-2xl text-green-500">You Won!</p>}
          {!gameWon && !gameOver && (
            <button
              onClick={createVariable}
              className="bg-orange-400 hover:bg-orange-800 hover:text-white text-2xl p-3 rounded mt-5"
            >
              Start Game
            </button>
          )}
          {(gameWon || gameOver) && (
            <button
              onClick={createVariable}
              className="bg-orange-400 hover:bg-orange-800 hover:text-white text-2xl p-3 rounded mt-5"
            >
              New Game
            </button>
          )}
        </div>

        <div className="mt-5 sm:ml-14  text-4xl flex flex-col justify-center items-center p-4 bg-neutral-900 border rounded-lg">
          <p className="text-3xl p-4">
            Attempts <span className="text-red-500"> LEFT : {counter}</span>
          </p>
          <img
            src={attemptImages[counter]}
            alt={`Attempts left: ${counter}`}
            className="w-min"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
