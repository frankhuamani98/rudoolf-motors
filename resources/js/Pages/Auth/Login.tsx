import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Toaster, toast } from 'sonner';

interface FormData {
    identifier: string;
    password: string;
    [key: string]: string;
}

interface Errors {
    identifier?: string;
    password?: string;
    email?: string;
}

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        identifier: '', // DNI, email o username
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Función para normalizar el identificador (email a minúsculas, otros campos sin cambios)
    const normalizeIdentifier = (value: string): string => {
        // Verifica si el valor podría ser un email
        const isEmail = value.includes('@') || value.includes('.');
        return isEmail ? value.toLowerCase().trim() : value.trim();
    };

    const handleChangeIdentifier = (value: string) => {
        // Normaliza el valor en tiempo real si parece un email
        const normalizedValue = value.includes('@') || value.includes('.') 
            ? value.toLowerCase() 
            : value;
        setData('identifier', normalizedValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validación del campo de identificación
        if (!data.identifier.trim()) {
            toast.error('Por favor, ingrese su DNI, correo electrónico o usuario');
            return;
        }

        // Validación de la contraseña
        if (!data.password) {
            toast.error('Por favor, ingrese su contraseña');
            return;
        }

        // Normalizar el identificador antes de enviar (asegurarse de que los emails estén en minúsculas)
        const normalizedData = {
            ...data,
            identifier: normalizeIdentifier(data.identifier)
        };

        // Envía el formulario usando Inertia
        post('/login', {
            ...normalizedData,
            onSuccess: () => {
                toast.success('Inicio de sesión exitoso!', {
                    description: 'Bienvenido de nuevo!',
                });
                reset();
            },
            onError: (errors: Errors) => {
                if (errors.identifier) {
                    toast.error('Error en el inicio de sesión', {
                        description: errors.identifier,
                    });
                } else if (errors.password) {
                    toast.error('Error en el inicio de sesión', {
                        description: errors.password,
                    });
                } else if (errors.email) {
                    toast.error('Error en el inicio de sesión', {
                        description: errors.email,
                    });
                } else {
                    toast.error('Error en el inicio de sesión', {
                        description: 'Credenciales incorrectas. Por favor, intente nuevamente.',
                    });
                }
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-2">
                        <div className="bg-primary p-2 rounded-full">
                            <User className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingrese su información para iniciar sesión
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Campo: Identificador */}
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                DNI, Correo electrónico o Usuario
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="identifier"
                                    type="text"
                                    placeholder="Ingrese su DNI, correo electrónico o usuario"
                                    className="pl-10"
                                    value={data.identifier}
                                    onChange={(e) => handleChangeIdentifier(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            {errors.identifier && <p className="mt-1 text-sm text-red-500">{errors.identifier}</p>}
                        </div>

                        {/* Campo: Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <Eye className="h-4 w-4" aria-hidden="true" />
                                    )}
                                    <span className="sr-only">{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</span>
                                </Button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {/* Enlace para recuperar acceso */}
                        <div className="text-right">
                            <a
                                href="/forgot-password"
                                className="text-sm text-muted-foreground hover:text-primary hover:underline focus:outline-none focus:underline"
                            >
                                ¿Ya no tienes acceso a tu cuenta?
                            </a>
                        </div>

                        {/* Botón de envío */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Procesando...
                                </span>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                        ¿No tiene una cuenta?{' '}
                        <a
                            href="/register"
                            className="text-primary font-medium hover:underline focus:outline-none focus:underline"
                        >
                            Registrarse
                        </a>
                    </p>
                </CardFooter>
            </Card>
            <Toaster position="top-center" richColors />
        </div>
    );
}