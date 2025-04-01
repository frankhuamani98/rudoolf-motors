import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import FacturasPendientes from '@/Layouts/Partials/Facturacion/FacturasPendientes';

// Definir las props que recibe el componente
interface FacturasPendientesPageProps {
    auth: {
        user: {
            username: string;
            email: string;
        };
    };
}

const FacturasPendientesPage = ({ auth }: FacturasPendientesPageProps) => {
    return (
        <DashboardLayout auth={auth}>
            <FacturasPendientes />
        </DashboardLayout>
    );
};

export default FacturasPendientesPage;