import NoConsultantSelected from '@/components/NoConsultantSelected';
import useConsult from '@/hooks/useConsult';
import { useTranslation } from 'react-i18next';

function CreateNamePage() {
  const { consultant } = useConsult();
  const { t } = useTranslation();

  if (!consultant) return (<NoConsultantSelected />);

  return (
    <div>
      <h1>Create Name</h1>
    </div>
  );
}

export default CreateNamePage;
