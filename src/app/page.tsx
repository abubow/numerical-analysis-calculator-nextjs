"use client";
import { useEffect, useState } from "react";
import MathJax from "react-mathjax2";

export default function Home() {
	const [numberOfInputs, setNumberOfInputs] = useState(1);
	const [iterations, setIterations] = useState(0);
	const [roots, setRoots] = useState<number[]>([]);
	const [inputs, setInputs] = useState<number[]>([]);
	const [selectedMethod, setSelectedMethod] = useState("Fixed Point");

	const [equation, setEquation] = useState("");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const listOfVarriableNames = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
	const listOfMethods = [
		"Fixed Point",
		"Bisection",
		"Newton Raphson",
		"Secant",
	];

	useEffect(() => {
		if (numberOfInputs < 1) {
			setNumberOfInputs(1);
		}
		if (numberOfInputs > 26) {
			setNumberOfInputs(26);
		}
	}, [numberOfInputs]);

	useEffect(() => {
		let eq = "f(x) = ";
		for (let i = 0; i < numberOfInputs; i++) {
			if (inputs[i] && inputs[i] != 0) {
				eq += `${inputs[i]}`;
				if (i !== numberOfInputs - 1) {
					eq += `${listOfVarriableNames[(i+23)%listOfVarriableNames.length]} ^ ${
						numberOfInputs - i - 1
					} + `;
				}
			}
		}
		// eq += " = 0";
		setEquation(eq);
		if (selectedMethod === "Fixed Point" && iterations > 0) {
			FixedPoint();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numberOfInputs, inputs, listOfVarriableNames, selectedMethod]);

const functionValue = (x: number|undefined) => {
		if (!x){
			return 0
		}
		let sol = 0;
		for (let i = 0; i < numberOfInputs; i++) {
			sol += inputs[i] * Math.pow(x, numberOfInputs - i - 1);
		}
		return sol;
	}

	const FixedPoint = () => {
		setRoots([]);
		let rangeStart = 0;
		let rangeEnd = 1;
		let i = 0;
		while (functionValue(rangeStart) * functionValue(rangeEnd) >= 0) {
			    // keep going until range start and end have values with opposite signs
			    rangeStart -= 1;
			    rangeEnd += 1;
				console.log(rangeStart, rangeEnd)
		}
		while (iterations && i < iterations) {
			let root = (rangeStart + rangeEnd) / 2;
			if (functionValue(root) == 0) {
				setRoots((prevRoots) => [...prevRoots, root]);
				break;
			} else if (functionValue(root) * functionValue(rangeStart) < 0) {
				rangeEnd = root;
			} else {
				rangeStart = root;
			}
			setRoots((prevRoots) => [...prevRoots, root]);
			i++;
		}
	};
	return (
		<MathJax.Context input="ascii">
			<main className="flex min-h-screen flex-col items-center p-24 gap-12">
				<header className="flex items-center w-full justify-between">
					<section className="flex flex-col items-center">
						<h1 className="text-2xl font-bold">
							Numerical Analysis Calculator
						</h1>
						<p className="text-sm">
							A simple calculator for numerical analysis.
						</p>
					</section>
					<MathJax.Node>
						{
							// "Numer" written as numbers
							"\\(\\text{Numer} \\)"
						}
					</MathJax.Node>
				</header>
				<section className="flex items-center justify-center gap-4">
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="method"
								className="mr-2 block text-lg font-medium">
								Method
							</label>
							<select
								id="method"
								className="block w-40 rounded-md text-black py-2 px-3"
								value={selectedMethod}
								onChange={(e) =>
									setSelectedMethod(e.target.value)
								}>
								{listOfMethods.map((method) => (
									<option
										key={method}
										value={method}>
										{method}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="iterations"
								className="mr-2 block text-lg font-medium">
								Iterations:
							</label>
							<input
								type="number"
								id="iterations"
								className="block w-20 rounded-md text-black py-2 px-3"
								value={iterations}
								onChange={(e) =>
									setIterations(parseInt(e.target.value))
								}
							/>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="numberOfInputs"
								className="mr-2 block text-lg font-medium">
								Number of Inputs:
							</label>
							<input
								type="number"
								id="numberOfInputs"
								className="block w-20 rounded-md text-black py-2 px-3"
								value={numberOfInputs}
								onChange={(e) =>
									setNumberOfInputs(parseInt(e.target.value))
								}
							/>
						</div>
					</div>
				</section>
				<section className="flex items-center justify-center">
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="numberOfInputs"
								className="mr-2 block text-lg font-medium">
								Constants:
							</label>
							<section className="flex items-center justify-center flex-wrap">
								{numberOfInputs &&
									Array(numberOfInputs)
										.fill(0)
										.map((_, index) => (
											<div
												key={index}
												className="mx-2">
												<label
													htmlFor="constant"
													className="ml-2 block text-lg font-medium">
													{
														listOfVarriableNames[
															index
														]
													}
												</label>
												<input
													type="number"
													id="constant"
													className="block w-20 rounded-md text-black py-2 px-3 my-2"
													value={inputs[index]}
													onChange={(e) => {
														const newInputs = [
															...inputs,
														];
														newInputs[index] =
															parseFloat(
																e.target.value
															);
														setInputs(newInputs);
													}}
												/>
											</div>
										))}
							</section>
						</div>
					</div>
				</section>
				{/* Equation */}
				<section className="flex items-center justify-center">
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="equation"
								className="mr-2 block text-lg font-medium">
								Equation:
							</label>

							<MathJax.Node>{equation}</MathJax.Node>
						</div>
					</div>
				</section>
				<section className="flex items-center justify-center">
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<label
								htmlFor="roots"
								className="mr-2 block text-lg font-medium">
								Roots:
							</label>
							<MathJax.Node>{roots.join(", ")}</MathJax.Node>
						</div>
					</div>
				</section>
			</main>
		</MathJax.Context>
	);
}
