import { save } from '@/actions/App/Http/Controllers/V1/Forms/ContactFormController';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm as useRhfForm } from 'react-hook-form';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import * as z from 'zod';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const formSchema = z.object({
    full_name: z.string().min(2, 'El nombre es obligatorio'),
    email: z.email('Email inválido'),
    phone: z.string().min(6, 'Teléfono inválido'),
    message: z.string().max(255).optional(),
});

type ContactFormData = z.infer<typeof formSchema>;

// Asumimos que las props (incluyendo 'flash') son pasadas por tu Layout principal
// o directamente a la página.
export default function ContactForm({ flash }) {
    const [phone, setPhone] = useState('');

    const form = useRhfForm<ContactFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { full_name: '', email: '', phone: '', message: '' },
    });

    const onSubmit = (data: ContactFormData) => {
        router.post(save.url(), data);
        form.reset();
    };

    return (
        <>
            {/* Título de la página (SEO) */}
            <Head title="Contacto" />

            {/* Contenedor principal */}
            <div className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1734640672449-0d65faceb323?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170)]">
                <div className="max-w-lg">
                    {/* Formulario */}
                    <Card className="w-full sm:max-w-md">
                        <CardHeader className='mb-2'>
                            <CardTitle className='text-3xl text-center'>Déjanos tus datos</CardTitle>
                            <CardDescription className='text-center'>
                                ¿Tienes alguna pregunta? Completa el formulario
                                y te responderemos lo antes posible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                id="contact-form"
                                className="space-y-6"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FieldGroup>
                                    <Field orientation="horizontal">
                                        {/* NAME */}
                                        <Controller
                                            name="full_name"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="full_name">
                                                        Nombre
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        id="full_name"
                                                        placeholder="Jhon Doe"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        autoComplete="off"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        ></Controller>

                                        {/* EMAIL */}
                                        <Controller
                                            name="email"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="email">
                                                        Correo Electronico
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        id="email"
                                                        placeholder="Jhon@doe.com"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        autoComplete="off"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        ></Controller>
                                    </Field>

                                    {/* PHONE */}
                                    <Controller
                                        name="phone"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="phone">
                                                    Telefono
                                                </FieldLabel>
                                                <PhoneInput
                                                    {...field}
                                                    value={phone}
                                                    // onChange={(phone) => setPhone(phone)}
                                                    className="w-full"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    ></Controller>

                                    {/* NAME */}
                                    <Controller
                                        name="message"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel htmlFor="name">
                                                    Mensaje (opcional)
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupTextarea
                                                        {...field}
                                                        id="message"
                                                        rows={6}
                                                        className="min-h-24 resize-none"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                    />
                                                    <InputGroupAddon align="block-end">
                                                        <InputGroupText className="tabular-nums">
                                                            {field.value.length}
                                                            /255 characters
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    ></Controller>
                                </FieldGroup>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Field orientation="horizontal">
                                <Button type="submit" form="contact-form">
                                    Enviar
                                </Button>
                            </Field>
                            {/* ✅ Bloque de éxito */}
                            {flash.success && (
                                <div className="group flex min-h-[72px] items-center justify-between gap-4 bg-white px-4 py-2 dark:bg-[#15202b]">
                                <div className="flex w-full items-center gap-4">
                                    <div className="shrink-0">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
                                        <BiCheckCircle size="24" />
                                    </div>
                                    </div>
                                    <div className="flex flex-grow flex-col justify-center">
                                    <p className="line-clamp-1 text-base leading-normal font-medium text-[#222222] dark:text-gray-100">
                                        Operación completada con éxito.
                                    </p>
                                    <p className="line-clamp-2 text-sm leading-normal font-normal text-gray-500 dark:text-gray-400">
                                        {flash.success || "Todo salió bien."}
                                    </p>
                                    </div>
                                </div>
                                </div>
                            )}

                            {/* ❌ Bloque de error */}
                            {flash.error && (
                                <div className="group flex min-h-[72px] items-center justify-between gap-4 bg-white px-4 py-2 dark:bg-[#15202b]">
                                <div className="flex w-full items-center gap-4">
                                    <div className="shrink-0">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                                        <BiErrorCircle size="24" />
                                    </div>
                                    </div>
                                    <div className="flex flex-grow flex-col justify-center">
                                    <p className="line-clamp-1 text-base leading-normal font-medium text-[#222222] dark:text-gray-100">
                                        ❌ {"Ha ocurrido un error."}
                                    </p>
                                    <p className="line-clamp-2 text-sm leading-normal font-normal text-gray-500 dark:text-gray-400">
                                        <span className="block text-xs text-gray-400">
                                            Detalles: {flash.error}
                                        </span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
