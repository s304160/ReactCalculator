import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { InputGroup, Form } from 'react-bootstrap';


function Home() {

	const defaultRow = { number: "", operation: "+", disabled: false };
	const [rows, setRows] = useState([defaultRow]);
	const [result, setResult] = useState(0);


	function deleteRow(index) {
		setRows(
			rows.filter((r, i) => i !== index)
		)
	}

	function updateRow(row, index) {
		setRows(rows.map((r, i) => {
			if (i === index)
				return { number: row.number, operation: row.operation, disabled: row.disabled }
			return r
		}));
	}


	function updateResult() {
		let tempResult = 0;
		rows.map((r, index) => {

			if (r.disabled) return;

			let number = isNaN(r.number) ? 0 : r.number;

			if (r.operation === "+") {
				tempResult += number;
				return;
			}

			tempResult -= number;
		})
		setResult(tempResult)
	}


	useEffect(() => {
		updateResult()
	}, [rows])


	return (
		<Container className='container'>
			<Row><h2>React Calculator</h2></Row>
			<CalculatorTable
				rows={rows}
				deleteRow={deleteRow}
				updateRow={updateRow} />

			<Row className='button-add'>
				<Button
					variant='success' size="lg"
					onClick={() => { setRows([...rows, defaultRow]) }}>
					Add Row
				</Button>
			</Row>

			<Row><h2> Result = {result} </h2></Row>
		</Container>
	);
}



function CalculatorTable({ rows, deleteRow, updateRow }) {

	return (
		<Col className="calculator-table">
			<Row className={['calculator-row', 'shadow-inner'].join(" ")}>
				<Col xs={1}>{/* Index */}</Col>
				<Col xs={5}>Number</Col>
				<Col xs={2}>Operation</Col>
				<Col xs={2}>Delete</Col>
				<Col xs={2}>Disable</Col>
			</Row>
			{
				rows.map((row, index) => {
					return <CalculatorRow
						key={index}
						index={index}
						rows={rows}
						deleteRow={deleteRow}
						updateRow={updateRow} />
				})
			}
		</Col>
	);
}

function CalculatorRow({ index, rows, deleteRow, updateRow }) {

	let row = rows[index];

	const [number, setNumber] = useState(row.number);
	const [operation, setOperation] = useState(row.operation);
	const [disabled, setDisabled] = useState(row.disabled);

	const [numberString, setNumberString] = useState(row.number);

	useEffect(() => {

		updateRow({ number: number, operation: operation, disabled: disabled }, index)

	}, [number, operation, disabled])


	useEffect(() => {
		let row = rows[index];
		setNumberString(row.number);

		setNumber(row.number);
		setOperation(row.operation);
		setDisabled(row.disabled);
	}, [rows.length])


	return (
		<Row className='calculator-row'>

			<Col xs={1}>{index + 1}</Col>

			<Col xs={5}>
				<InputGroup>
					<Form.Control
						type="text"
						value={numberString}
						onChange={e => {
							setNumberString(e.target.value)
							if (e.target.value === "" || isNaN(e.target.value)) {
								setNumber(0);
								return;
							}

							setNumber(parseFloat(e.target.value))
						}}
						disabled={disabled}
						isInvalid={!((numberString === "") || (!isNaN(numberString)))}
						placeholder="0"
					/>
				</InputGroup>
			</Col>


			<Col xs={2}>
				<Form.Select
					value={operation}
					onChange={(e) => setOperation(e.currentTarget.value)}
					disabled={disabled}>
					<option value={"+"}>+</option>
					<option value={"-"}>-</option>
				</Form.Select>
			</Col>
			<Col xs={2}>
				<Button
					variant='danger'
					onClick={() => { deleteRow(index) }}>
					Delete
				</Button>
			</Col>
			<Col xs={2}>
				<Form.Check // prettier-ignore
					type="switch"
					checked={disabled}
					onChange={(e) => { setDisabled(e.currentTarget.checked) }}
				/>
			</Col>
		</Row>
	);

}


export { Home }