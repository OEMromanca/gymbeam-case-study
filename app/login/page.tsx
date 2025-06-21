"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Input } from "../components/Input";

const loginSchema = z.object({
  username: z.string().min(1, "Používateľské meno je povinné."),
  password: z.string().min(1, "Heslo je povinné."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/products");
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormInputs) {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/products");
    } else {
      alert("Neplatné prihlasovacie údaje");
    }
  }

  if (status === "authenticated") return;

  return (
    <div className="flex items-center justify-center h-full bg-custom-bg bg-contain bg-center bg-no-repeat">
      <div className="w-[380px] h-[420px] bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30   rounded-2xl shadow-md flex flex-col items-center justify-center px-5">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Prihlásenie
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6"
          noValidate
        >
          <Input
            label="Používateľské meno"
            placeholder="Zadaj meno"
            autoComplete="username"
            register={register("username")}
            error={errors.username?.message}
            disabled={isSubmitting}
          />

          <Input
            label="Heslo"
            placeholder="Zadaj heslo"
            autoComplete="current-password"
            register={register("password")}
            error={errors.password?.message}
            disabled={isSubmitting}
            showPasswordToggle
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium py-2 px-4 rounded-md transition duration-300 shadow"
          >
            {isSubmitting ? "Prihlasujem..." : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    </div>
  );
}
