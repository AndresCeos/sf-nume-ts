import { useAuth } from '@/context/AuthProvider';

const handleConsultants = (consultants: Api.Consultant[]) => {
  const addConsultant = (newConsultant: Api.Consultant): Api.Consultant[] => [...consultants ?? [], newConsultant];

  const removeConsultant = (consultantId: string): Api.Consultant[] => consultants?.filter((consultant) => consultant?.id !== consultantId) ?? [];

  const updateConsultant = (consultantId: string, newConsultant: Api.Consultant): Api.Consultant[] => consultants?.map((consultant) => {
    if (consultant?.id === consultantId) {
      return newConsultant;
    }
    return consultant;
  }) ?? [];

  return {
    consultants,
    addConsultant,
    removeConsultant,
    updateConsultant,
  };
};

const useConsultants = () => {
  const { user } = useAuth();
  return handleConsultants(user?.consultants ?? []);
};

export default useConsultants;
