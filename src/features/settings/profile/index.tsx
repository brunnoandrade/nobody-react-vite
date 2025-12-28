import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  return (
    <ContentSection
      title='Perfil'
      desc='É assim que outras pessoas verão você no site.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
