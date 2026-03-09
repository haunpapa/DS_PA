import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("올바른 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(72, "비밀번호는 72자 이하여야 합니다."),
});

export const registerSchema = signInSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(40, "이름은 40자 이하여야 합니다."),
});

export function flattenFieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}
