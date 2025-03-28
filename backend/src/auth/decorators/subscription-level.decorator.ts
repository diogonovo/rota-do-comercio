import { SetMetadata } from '@nestjs/common';

export const SUBSCRIPTION_LEVEL_KEY = 'subscription_level';
export const SubscriptionLevel = (level: string) => SetMetadata(SUBSCRIPTION_LEVEL_KEY, level);
