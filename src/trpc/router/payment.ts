import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AppRouter, appRouter } from '../';
import { publicProcedure, router } from '../trpc';
import { validator } from '@/lib/validator';

export const payment = router({});
