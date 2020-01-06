import { flatten, uniq } from 'lodash';

export const parse = (messages, regex) => {
	const pairs = getPairs(messages, regex);
	console.log("pairs == ", pairs);
	return {
		individuals: getIndividuals(pairs),
		validPairs: parseCommitPairsWithTotalCommits(pairs),
		committers: getAllCommitters(pairs)
	}
};

const getPairs = (messages, regex) => {
	return messages.map((msg) => {
		const pair = [];
		const matches = regex.exec(msg);
		if (matches && matches[1]) pair.push(matches[1]);
		if (matches && matches[2]) pair.push(matches[2]);
		return pair;
	})
};

const parseCommitPairsWithTotalCommits = (pair) => {
	const pairs = validPairs(pair);
	return getCommittersWithCommits(pairs);
};

const getIndividuals = (pairs) => {
	const individuals = pairs.filter(function (pair) {
		return pair.length === 1
	});
	return getCommittersWithCommits(individuals);
};

const validPairs = (pairs) => {
	return pairs.filter(function (pair) {
		return pair.length === 2;
	})
};

const getAllCommitters = (pairs) => {
	const lowerCasedPairs = flatten(pairs).map(function (indivisual) {
		return indivisual.toLowerCase();
	});
	return uniq(lowerCasedPairs);
};

const getCommittersWithCommits = (pairs) => {
	const pairingData = {};
	pairs.forEach(function (pair) {
		if (pairingData[JSON.stringify(pair)])
			pairingData[JSON.stringify(pair)]++;
		else
			pairingData[JSON.stringify(pair)] = 1;
	});
	return Object.keys(pairingData).map(function (pair) {
		return {pair: JSON.parse(pair), commits: pairingData[pair]};
	});
};
