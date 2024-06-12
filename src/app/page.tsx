'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LogoMobileTrajeton from '@/assets/logo-mobile-trajeton'

import LogoTrajeton from '@/assets/logo-trajeton'
import { RecoverPassword } from '@/components/ui/recover-password'

const signInFormSchema = z.object({
  email: z.string().email({
    message:
      'E-mail inválido. Insira um endereço de e-mail no formato correto.',
  }),
  password: z
    .string()
    .min(
      8,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    )
    .max(
      32,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    )
    .regex(
      /[A-Z]/,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    )
    .regex(
      /[a-z]/,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    )
    .regex(
      /[0-9]/,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    )
    .regex(
      /[^a-zA-Z0-9]/,
      'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais, e tente novamente.',
    ),
})

type SignInForm = z.infer<typeof signInFormSchema>

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleSignIn(data: SignInForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  return (
    <section className="grid min-h-screen grid-rows-app pt-20 md:grid-cols-2 md:grid-rows-1 md:pt-0">
      <div className="order-2 flex flex-col items-center justify-start md:order-1 md:flex-row md:justify-center">
        <div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="relative w-[450px] space-y-4 px-8"
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <span className="flex text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative space-y-2">
              <Label htmlFor="password">
                Senha<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                />
                <div
                  className="absolute inset-y-0 right-0 top-1/2 flex -translate-y-1/2 transform cursor-pointer items-center pr-3 text-sm leading-5"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} className="text-blue-300" />
                  ) : (
                    <EyeIcon size={20} className="text-blue-300" />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="flex text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button className="border-none bg-none pt-4 text-xs text-blue-500">
                  Esqueci minha senha
                </button>
              </DialogTrigger>

              <RecoverPassword />
            </Dialog>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-xl"
            >
              Enviar
            </Button>
          </form>
          <div className="space-y-3 px-8"></div>
        </div>
      </div>

      <div className="order-1 flex items-center justify-center md:order-2 md:bg-muted">
        <div className="hidden md:block">
          <LogoTrajeton />
        </div>
        <div className="block md:hidden">
          <LogoMobileTrajeton />
        </div>
      </div>
    </section>
  )
}
