import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const recoverPasswordSchema = z.object({
  email: z.string().email({
    message:
      'E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.',
  }),
})

type RecoverPasswordForm = z.infer<typeof recoverPasswordSchema>

export function RecoverPassword() {
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoverPasswordForm>({
    resolver: zodResolver(recoverPasswordSchema),
  })

  async function handleRecoverPassword(data: RecoverPasswordForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
  }

  return (
    <DialogContent className="h-screen w-full sm:h-auto sm:w-[420px]">
      <DialogHeader className="space-y-3">
        <div className="flex items-center">
          <ChevronLeft className="mr-2 h-8 w-8 text-slate-700 sm:hidden" />
          <DialogTitle className="text-2xl text-slate-700">
            Recuperar senha
          </DialogTitle>
        </div>
        {!isSuccess && (
          <DialogDescription className="text-start text-sm text-black">
            Para recuperar sua senha, digite o e-mail cadastrado.
          </DialogDescription>
        )}
      </DialogHeader>
      <div>
        {!isSuccess ? (
          <form
            onSubmit={handleSubmit(handleRecoverPassword)}
            action=""
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail<span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button disabled={isSubmitting} className="w-full rounded-xl">
              Enviar
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-black">
              Enviamos um link de recuperação para o seu e-mail cadastrado. Por
              favor, verifique a sua caixa de entrada e a pasta de spam, se
              necessário.
            </p>
            <Button
              className="w-full rounded-xl"
              onClick={() => setIsSuccess(false)}
            >
              Entendido
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  )
}
