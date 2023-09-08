import React, { useState } from 'react';
import { View } from 'react-native';
import {
	VictoryChart,
	VictoryPolarAxis,
	VictoryArea,
	VictoryTooltip,
	VictoryVoronoiContainer
} from 'victory-native';

const RadarChart = ({ skills }) => {
	const [clickedIndex, setClickedIndex] = useState(null);

	let data = [
		{ x: 'DB & Data', y: 0, label: '' },
		{ x: 'Company experience', y: 0, label: '' },
		{ x: 'Basics', y: 0, label: '' },
		{ x: 'Algorithms & AI', y: 0, label: '' },
		{ x: 'Adaptation & creativity', y: 0, label: '' },
		{ x: 'Web', y: 0, label: '' },
		{ x: 'Unix', y: 0, label: '' },
		{ x: 'Technology integration', y: 0, label: '' },
		{ x: 'Shell', y: 0, label: '' },
		{ x: 'Security', y: 0, label: '' },
		{ x: 'Ruby', y: 0, label: '' },
		{ x: 'Rigor', y: 0, label: '' },
		{ x: 'Parallel computing', y: 0, label: '' },
		{ x: 'Organization', y: 0, label: '' },
		{ x: 'Object-oriented programming', y: 0, label: '' },
		{ x: 'Network & system administration', y: 0, label: '' },
		{ x: 'Imperative programming', y: 0, label: '' },
		{ x: 'Group & interpersonal', y: 0, label: '' },
		{ x: 'Graphics', y: 0, label: '' },
		{ x: 'Functional programming', y: 0, label: '' },
	];

	skills.map(skill => {
		let number = data.find(skillData => skillData.x === skill.name).y = skill.level;
		skill.level = parseFloat(number.toFixed(2));
		data.find(skillData => skillData.x === skill.name).label = `${skill.name}: ${skill.level}`;
	});

	const tickValues = data.map((point, index) => index);

	const wrapLabel = (text, maxLength) => {
		if (text.length <= maxLength) return text;
		const words = text.split(' ');
		let currentLine = '';
		let result = '';
		for (const word of words) {
			if (currentLine.length + word.length <= maxLength) {
				currentLine += `${word} `;
			} else {
				result += `${currentLine.trim()}\n`;
				currentLine = `${word} `;
			}
		}
		return result + currentLine.trim();
	};

	return (
		<View>
			<VictoryChart
				polar
				containerComponent={<VictoryVoronoiContainer />}
				domain={{ y: [0, 20] }}
				padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
			>
				<VictoryPolarAxis
					dependentAxis
					style={{
						grid: { stroke: 'lightgrey' },
					}}
					domain={{ y: [0, 20] }}
					tickValues={[0, 5, 10, 15, 20]}
					tickFormat={() => ''}
				/>
				<VictoryPolarAxis
					labelPlacement="vertical"
					tickValues={tickValues}
					tickFormat={(data) => wrapLabel(data, 15)}
					style={{
						axis: { stroke: 'none' },
						grid: { stroke: 'lightgrey' },
						tickLabels: { fontSize: 10, padding: 15 },
					}}
				/>
				<VictoryArea
					data={data}
					style={{
						data: { fill: 'rgba(135, 206, 250, 0.9)' },
					}}
					events={[
						{
							target: 'data',
							eventHandlers: {
								onPress: (_, clickedProps) => {
									const { index } = clickedProps;
									setClickedIndex(index);
									return [
										{ target: 'data' },
									];
								},
							},
						},
					]}
					labels={({ datum, index }) =>
						index === clickedIndex ? datum.label : ''
					}
					labelComponent={
						<VictoryTooltip
							style={{
								fill: 'black',
								fontSize: 12,
								padding: 8,
							}}
							renderInPortal={false}
							constrainToVisibleArea
						/>
					}
				/>
			</VictoryChart>
		</View>
	);
};

export default RadarChart;
