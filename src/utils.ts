import * as crypto from 'crypto';
import { create } from 'xmlbuilder2';

export function getHashValue(algorithm: string, content: string): string {
	return crypto.createHash(algorithm).update(content).digest('hex');
}

export function getHmacSHA256(content: string, secret: string): string {
	return crypto.createHmac('sha256', secret).update(content).digest('hex');
}

export function getXmlResult(json: any) {
	return create({
		xml: json,
	}).end({ prettyPrint: true });
}