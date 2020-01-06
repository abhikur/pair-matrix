import shell from 'shelljs';

export const fetch = (since) => {
	const commitsString = shell.exec("git log --oneline --since='" + since + "'", {silent: true}).stdout;
	const commits = commitsString.split('\n');
	commits.pop();
	return commits;
};