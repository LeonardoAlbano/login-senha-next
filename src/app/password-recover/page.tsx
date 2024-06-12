'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { LogoMobileMenorTrajeton } from '@/assets/logo-mobile-menor-trajeton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PasswordRecover() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center pb-14">
      <div>
        <LogoMobileMenorTrajeton />
      </div>

      <div className="w-[440px] space-y-6 rounded-3xl bg-blue-100 p-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Redefinir a senha
          </h1>
          <p className="text-sm text-slate-800">
            Redefina sua senha com no mínimo 6 caracteres
          </p>
        </div>
        <form action="" className="space-y-6">
          <div className="relative space-y-2">
            <Label htmlFor="password">
              Senha<span className="text-red-500">*</span>
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Digite uma senha"
            />
            <div
              className="absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon size={20} className="text-blue-300" />
              ) : (
                <EyeIcon size={20} className="text-blue-300" />
              )}
            </div>
          </div>
          <div className="relative space-y-2">
            <Label htmlFor="confirm-password">
              Confirme sua senha<span className="text-red-500">*</span>
            </Label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              placeholder="Repita sua senha"
            />
            <div
              className="absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-sm leading-5"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} className="text-blue-300" />
              ) : (
                <EyeIcon size={20} className="text-blue-300" />
              )}
            </div>
          </div>

          <div className="space-x-2">
            <h1 className="text-md pb-3 font-semibold text-slate-800">
              Crie uma senha segura
            </h1>
            <p className="text-sm text-slate-800">
              &bull; use letras maiúsculas e minúsculas, símbolos e números;
            </p>
            <p className="text-sm text-slate-800">
              &bull; não use informações pessoais como datas de aniversário;
            </p>
            <p className="text-sm text-slate-800">
              &bull; não use uma senha igual a anterior;
            </p>
          </div>
        </form>
      </div>
      <Button className="mt-6 w-[440px] rounded-xl text-2xl font-medium">
        Redefinir senha
      </Button>
    </section>
  )
}
