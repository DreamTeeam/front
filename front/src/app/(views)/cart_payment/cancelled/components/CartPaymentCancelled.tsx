'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { routes } from '@/app/routes';

export default function CartPaymentCancelled() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                
                router.push('http://localhost:4000/');
            }, 10000);
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
                <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800">Pago rechazado</h1>
                <p className="text-gray-600">Tu compra no se completó. Por favor vuelve a intentarlo.</p>
                <button
                    onClick={() => router.push(routes.shop.categories)}
                    className="mt-4 bg-neutral-600 text-white px-6 py-2 rounded-2xl hover:bg-neutral-700 transition-all"
                >
                    Volver A Comprar
                </button>
            </div>
        </div>
    );
};