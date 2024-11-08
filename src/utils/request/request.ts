const lastRequestStartTimeByUrl = new Map<string, number>();

const wait = (ms: number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve(undefined);
		}, ms);
	});
};

/**
 * POST запрос, внутри использует API_URL
 * @param url - URL без '/' в начале
 * @param token - токен
 * @param body - тело запроса
 * @param minDelay - минимальная задержка между запросами с одинаковыми URL-ами
 * @returns
 */
const post = async <TBody = unknown, TResponse = unknown>(
	url: string,
	token: string,
	body?: TBody,
	minDelay?: number,
) => {
	if (minDelay) {
		const lastRequestStartTime = lastRequestStartTimeByUrl.get(url);
		if (lastRequestStartTime) {
			const delay = Date.now() - lastRequestStartTime;
			await wait(Math.max(minDelay - delay, 0));
		}
		lastRequestStartTimeByUrl.set(url, Date.now());
	}

	return fetch(process.env.API_URL + "/" + url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: body ? JSON.stringify(body) : undefined,
		method: "POST",
	}).then(async (response) => {
		const data = await response.json();
		const status = await response.status;
		if (response.ok) {
			return data as TResponse;
		}
		throw new Error("API error", { cause: { data, status } });
	});
};

export const request = {
	post,
};
