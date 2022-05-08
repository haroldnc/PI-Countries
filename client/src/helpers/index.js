export function getRange(page){
	let start = 0;
	let end = 9;

	if (page > 1){
		start = 10 * page - 11;
		end = start + 10;
	}

	return [start, end];
}

export function getNumPages(numCountries){
	return Math.ceil((numCountries + 1) / 10);
}

export function getListPages(currentPage, numPages){
	const list = [];

	if (currentPage < 6){
		const n = numPages < 6 ? numPages : 5;

		for (let i=1; i<=n; i++){
			list.push({
				page: i,
				active: i === currentPage
			});
		}
	} else {
		for (let i=currentPage-4; i<=currentPage; i++){
			list.push({
				page: i,
				active: i === currentPage
			});
		}
	}

	return list;
}