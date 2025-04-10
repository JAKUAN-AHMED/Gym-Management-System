import { z } from "zod";

export const ClassValidation = z.object({
  name: z.string(),
  description:z.string(),
  
});