'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export interface MembershipType {
    id: string;
    name: string;
    stripe_price_id: string;
}

export function useMembershipTypes() {
    const [types, setTypes] = useState<MembershipType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get('/membership-types', { withCredentials: true })
        .then((res) => setTypes(res.data))
        .catch((err) => {
            console.error(err);
            setError('No se pudieron cargar los tipos de membresía');
        })
        .finally(() => setLoading(false));
    }, []);

    return { types, loading, error };
};