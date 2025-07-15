'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';
import { fetchSalesByEmployee } from '@/hooks/metrics';

export default function EmployeeComparisonChart() {
    const [labels, setLabels] = useState<string[]>([]);
    const [series, setSeries] = useState<number[]>([]);

    useEffect(() => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);

        const format = (d: Date) => d.toISOString().split('T')[0];

        fetchSalesByEmployee(format(weekAgo), format(today)).then(data => {
            setLabels(data.map((emp: any) => `${emp.firstName}`));
            setSeries(data.map((emp: any) => emp.totalSales));

            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 100);
        });
    }, []);

    const options: ApexOptions = {
        chart: { type: 'donut', foreColor: '#b8b9ba' },
        labels,
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
    };

    return (
        <ChartCard title="Ventas por Empleado en $">
            <Chart options={options} series={series} type="donut" height="100%" />
        </ChartCard>
    );
};