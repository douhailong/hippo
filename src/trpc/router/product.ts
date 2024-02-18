import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { AppRouter, appRouter } from '../';
import { publicProcedure, router } from '../trpc';
import { validator } from '../../lib/validator';
import prisma from '../../lib/prisma';

export const product = router({
  getProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: validator.query
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const products = await prisma.product.findMany({
        where: { saleStatus: 'approved' }
      });
    })
});
