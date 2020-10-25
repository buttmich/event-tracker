import { Event } from './event'

export interface Category {
    color: string;
    description: string;
    id: number;
    name: string;
    userId: number;
    events: Event[]
}