'use client';

import { useMembershipTypes } from '@/hooks/useMembershipTypes';
import { SubscriptionPlans } from '@/components/Subscription/SubscriptionPlans';

export default function ClientSubscription() {
    const { types, loading, error } = useMembershipTypes();

    return (
        <SubscriptionPlans
            plans={types}
            title="Elegí el plan ideal para vos"
            error={error}
            loading={loading}
        />
    );
};