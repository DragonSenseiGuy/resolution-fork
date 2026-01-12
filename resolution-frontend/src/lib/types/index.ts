export interface Step {
	title: string;
	description: string;
}

export interface Event {
	title: string;
	description: string;
	rotation?: number;
	image?: string;
}

export interface FAQ {
	question: string;
	answer?: string;
}

export type EventCardVariant = 'yellow' | 'pink' | 'blue';

export interface SubmitResolutionRequest {
	email: string;
}

export interface SubmitResolutionResponse {
	success?: boolean;
	error?: string;
}
