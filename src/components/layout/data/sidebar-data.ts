import {
  LayoutDashboard,
  HelpCircle,
  Settings,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Star,
  Package,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'brunnoandrade',
    email: 'brunnoandradi@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Geral',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Avaliações',
          url: '/reviews',
          icon: Star,
        },
        {
          title: 'Produtos',
          url: '/products',
          icon: Package,
        },
      ],
    },
    {
      title: 'Outros',
      items: [
        {
          title: 'Configurações',
          url: '/settings',
          icon: Settings,
        },
        {
          title: 'Centro de Ajuda',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
