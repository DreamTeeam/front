"use client";

import React, { useState } from "react";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { routes } from "@/app/routes";
import Swal from "sweetalert2";

const CreateAudit = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [description, setDescription] = useState("");
  const [total_cash, setTotalCash] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("No se pudo identificar al usuario. Por favor, inicie sesión de nuevo.");
      return;
    }

    if (!description || !total_cash) {
        toast.error("Por favor, completa todos los campos.");
        return;
    }

    try {
      await api.post("/audits", {
        description,
        total_cash: parseFloat(total_cash),
        employeeId: user.userId,
      });

      setDescription("");
      setTotalCash("");
      
      Swal.fire({
        title: "¡Arqueo creado correctamente!",
        text: "¿Desea ir a la sección de CORTES ahora?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Sí, ir a CORTES",
        cancelButtonText: "No, permanecer aquí",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(routes.manager.cashier.cuts); // 👈 Redirige
        }
      });

    } catch (err: any) {
      console.error("Error al crear arqueo:", err);
      if (err.response && err.response.data && Array.isArray(err.response.data.message)) {
        const errorMessages = err.response.data.message.join("\n");
        toast.error(errorMessages);
      } else {
        toast.error("No se pudo crear el arqueo.");
      }
    }
  };

    
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Arqueo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nota o descripción</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            // 2. CORREGIR value y onChange para usar 'description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* 3. AÑADIR EL INPUT PARA totalCash */}
        <div>
          <label className="block text-sm font-medium">Total de Efectivo ($)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="0.00"
            value={total_cash}
            onChange={(e) => setTotalCash(e.target.value)}
            required
          />
        </div>

        <ButtonAccent type="submit" textContent="Guardar Arqueo" />
      </form>
    </div>
  );
};

export default CreateAudit;
