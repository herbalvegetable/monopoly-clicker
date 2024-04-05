'use client';

import { useState, useEffect, useRef } from 'react';

import styles from "./page.module.css";

import BoardSquare from './components/BoardSquare/BoardSquare';

export default function Home() {

	// top, right, bottom, left
	const BOARD = [
		[
			{ type: 'go' },
			{ type: 'property', title: 'Mediterranean Avenue', cost: 60, fill: '#70140d' },
			{ type: 'chance' },
			{ type: 'property', title: 'Baltic Avenue', cost: 60, fill: '#70140d' },
			{ type: 'tax', taxType: 'income', title: 'Income Tax', cost: 200 },
			{ type: 'tax', taxType: 'rail', title: 'Reading Railroad', cost: 200 },
			{ type: 'property', title: 'Oriental Avenue', cost: 100, fill: '#4cd5ed' },
			{ type: 'chance' },
			{ type: 'property', title: 'Vermont Avenue', cost: 100, fill: '#4cd5ed' },
			{ type: 'property', title: 'Connecticut Avenue', cost: 120, fill: '#4cd5ed' },
		],
		[
			{ type: 'chance' },
			{ type: 'property', title: 'St. Charles Place', cost: 140, fill: '#dd4ced' },
			{ type: 'tax', taxType: 'electric', title: 'Electric Company', cost: 150 },
			{ type: 'property', title: 'States Avenue', cost: 140, fill: '#dd4ced' },
			{ type: 'property', title: 'Virginia Avenue', cost: 160, fill: '#dd4ced' },
			{ type: 'tax', taxType: 'rail', title: 'Reading Railroad', cost: 200 },
			{ type: 'property', title: 'St. James Place', cost: 180, fill: '#db5d14' },
			{ type: 'chance' },
			{ type: 'property', title: 'Tennessee Avenue', cost: 180, fill: '#db5d14' },
			{ type: 'property', title: 'New York Avenue', cost: 200, fill: '#db5d14' },
		],
		[
			{ type: 'chance' },
			{ type: 'property', title: 'Kentucky Avenue', cost: 220, fill: 'red' },
			{ type: 'chance' },
			{ type: 'property', title: 'Indiana Avenue', cost: 220, fill: 'red' },
			{ type: 'property', title: 'Illinois Avenue', cost: 240, fill: 'red' },
			{ type: 'tax', taxType: 'rail', title: 'B & O. Railroad', cost: 200 },
			{ type: 'property', title: 'Atlantic Avenue', cost: 260, fill: 'yellow' },
			{ type: 'property', title: 'Ventnor Avenue', cost: 260, fill: 'yellow' },
			{ type: 'tax', taxType: 'water', title: 'Water Works', cost: 150 },
			{ type: 'property', title: 'Marvins Gardens', cost: 280, fill: 'yellow' },
		],
		[
			{ type: 'chance' },
			{ type: 'property', title: 'Pacific Avenue', cost: 300, fill: '#1cb82b' },
			{ type: 'property', title: 'North Carolina Avenue', cost: 300, fill: '#1cb82b' },
			{ type: 'chance' },
			{ type: 'property', title: 'Pennsylvania Avenue', cost: 320, fill: '#1cb82b' },
			{ type: 'tax', taxType: 'rail', title: 'Short Line', cost: 200 },
			{ type: 'chance' },
			{ type: 'property', title: 'Park Place', cost: 350, fill: '#1c4fbd' },
			{ type: 'chance' },
			{ type: 'property', title: 'Boardwalk', cost: 400, fill: '#1c4fbd' },
		],
	];

	// Character info (e.g. position)
	const characterRef = useRef(null);
	const [characterPos, setCharacterPos] = useState([0, 0]); // row index, row square index
	const [rollCount, setRollCount] = useState(0);
	const [canRoll, setCanRoll] = useState(true);
	const [characterInfo, setCharacterInfo] = useState({
		money: 200,
	});

	// Game state
	const [curSquare, setCurSquare] = useState(null);

	// FUNCTIONS

	const handleRoll = e => {
		if(!canRoll) return;

		// console.log('Roll die');
		let roll = Math.floor(Math.random() * 6) + 1;
		// let roll = 2; // DEBUG
		console.log(`User rolled a ${roll}`);
		setRollCount(roll);

		let endPos = getNewSquarePos([...characterPos], roll);
		setCharacterPos(endPos);

		// Character movement
		displayCharacterMovement(roll, endPos);

	}

	function getNewSquarePos(currPos, roll) {
		// console.log('currpos', currPos);
		let newPos = [...currPos];
		let newSquarePos = newPos[1] + roll;
		newPos[0] = newSquarePos > 9 ? (newPos[0] + 1) % 4 : newPos[0];
		newPos[1] = newSquarePos % 10;

		return newPos;
	}

	function getCoordsFromPos(pos) {
		let xpos, ypos;

		switch (pos[0]) {
			case 0:
				xpos = (pos[1] + 0.5) * 80;
				ypos = 40;
				break;
			case 1:
				xpos = 840;
				ypos = (pos[1] + 0.5) * 80;
				break;
			case 2:
				xpos = 880 - (pos[1] + 0.5) * 80;
				ypos = 840;
				break;
			case 3:
				xpos = 40;
				ypos = 880 - (pos[1] + 0.5) * 80;
				break;
		}

		return [xpos, ypos];
	}

	function getSquareFromPos(pos) {
		let [row, square] = pos;
		return BOARD[row][square];
	}

	function updateCharacterPos(xpos, ypos) {
		characterRef.current.style.left = `${xpos - 15}px`;
		characterRef.current.style.top = `${ypos - 15}px`;
	}

	function displayCharacterMovement(roll, endPos) {
		if(roll <= 0) return;
		setCanRoll(false);

		let newPos = [...characterPos];

		for (let i = 0; i < roll; i++) {
			setTimeout(() => {
				newPos = getNewSquarePos([...newPos], 1);
				updateCharacterPos(...getCoordsFromPos(newPos));
				if(i >= roll-1) {
					setCanRoll(true);
					executeSquareOutcome(endPos);
				};
			}, 175 * i);
		}
	}
	// useEffect(() => {console.log('canRoll: ', canRoll)}, [canRoll]); // DEBUG CANROLL STATE

	function executeSquareOutcome(endPos){
		let square = getSquareFromPos(endPos);
		console.log(square);
		setCurSquare(square);
	}

	useEffect(() => {
		updateCharacterPos(...getCoordsFromPos([0, 0])) // start from first square (pass GO)
	}, []);

	return (
		<>
			<div className={styles.title}>
				<h1>Monopoly</h1>
			</div>
			<div className={styles.board}>
				{
					BOARD.map((row, rowIndex) => {
						let rowRef = ['top', 'right', 'bottom', 'left'];

						return <div
							key={rowIndex.toString()}
							className={`${styles.row} ${styles[rowRef[rowIndex]]}`}>
							{
								row.map((square, squareIndex) => <BoardSquare
									key={squareIndex.toString()}
									{...square}
								/>)
							}
						</div>
					})
				}

				<div className={styles.character} ref={characterRef}></div>

				<div className={styles.display}>
					<div>You rolled a {rollCount}!</div>
					<div 
						className={`${styles.roll_btn} ${canRoll ? '' : styles.disabled}`} 
						onClick={handleRoll}>
							ROLL!
					</div>
					<div className={styles.char_money}>{characterInfo.money}M</div>
					{
						curSquare?.type === 'go' ?

						<div>Collect 200M</div>

						: curSquare?.type === 'property' ?

						<div>Buy property?</div>

						: curSquare?.type === 'chance' ?

						<div>Take chance card</div>

						: curSquare?.type === 'tax' ?

						<div>Pay tax</div>

						:

						null
					}
				</div>
			</div>
		</>
	);
}
