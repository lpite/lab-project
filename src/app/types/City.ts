import zod from 'zod';

export interface City {
  id: string;
  name: string;
  pizzerias_quantity: string;
}

export const cityValidator = zod.object({
  id: zod.string().nonempty(),
  name: zod.string().nonempty(),
  pizzerias_quantity: zod.string().nonempty(),
});
