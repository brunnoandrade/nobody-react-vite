import { ContentSection } from '../components/content-section'
import { GeneralForm } from './general-form'

export function SettingsGeneral() {
  return (
    <ContentSection
      title='Configurações gerais'
      desc='Defina regras padrão que afetam o comportamento das avaliações na sua loja.'
    >
      <GeneralForm />
    </ContentSection>
  )
}
