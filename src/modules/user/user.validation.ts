import { z } from "zod";

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userFullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userIdValidationSchema = z.number();

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});

export default userValidationSchema;

export { userIdValidationSchema };
