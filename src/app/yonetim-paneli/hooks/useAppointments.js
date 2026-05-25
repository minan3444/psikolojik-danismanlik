// ─────────────────────────────────────────────────────────────
//  hooks/useAppointments.js
//  Randevularla ilgili TÜM veri işlemleri burada.
//  Bileşenler sadece döndürülen değerleri kullanır,
//  API çağrısı nasıl çalışıyor bilmek zorunda değildir.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "@/app/actions/admin";
import { filterByStatus } from "../constants";

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null); // işlem yapılan satırın id'si

  // ── İlk yüklemede ve yenileme isteğinde çalışır ──────────────
  const fetchAppointments = async () => {
    setLoading(true);
    const data = await getAllAppointments();
    setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ── Randevu durumunu güncelle (onayla / reddet / sil vb.) ────
  const changeStatus = async (apt, yeniDurum) => {
    if (yeniDurum === "silindi" && !confirm("Arşive taşınacak. Emin misiniz?"))
      return;

    setActionId(apt.id);
    const sonuc = await updateAppointmentStatus(apt, yeniDurum);

    if (sonuc.success) {
      // Sunucuya tekrar gitmeden arayüzü anında güncelle
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === apt.id ? { ...item, status: yeniDurum } : item,
        ),
      );
      await fetchAppointments(); // ardından sunucudan taze veri al
    }

    setActionId(null);
  };

  // ── Filtrelenmiş listeler (her render'da yeniden hesaplanmaz) ─
  const bekleyenler = useMemo(
    () => filterByStatus(appointments, ["beklemede"]),
    [appointments],
  );
  const aktifler = useMemo(
    () => filterByStatus(appointments, ["onaylandı"]),
    [appointments],
  );
  const gecmis = useMemo(
    () => filterByStatus(appointments, ["iptal", "silindi", "bloke"]),
    [appointments],
  );

  return {
    loading,
    actionId,
    bekleyenler,
    aktifler,
    gecmis,
    changeStatus,
    fetchAppointments, // "Yenile" butonu için dışarıya açık
  };
}
